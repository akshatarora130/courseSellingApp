const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
require('dotenv').config();


app.use(express.json());
app.use(cors())

const secretKey = 'SECr3t';

const userSchema= new mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  username: {type: String},
  password: {type: String},
  purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
})

const adminSchema = new mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  username: {type: String},
  password: {type: String},
})

const courseSchema = new mongoose.Schema({
  title: {type: String},
  description: {type: String},
  price: {type: Number},
  imageLink: {type: String},
  published: {type: Boolean}
})

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema) 

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err ,user) => {
      if(err){
        res.status(403).send();
      }
      req.user = user;
      next();
    })
  }
  else{
    res.status(401).send("authHeader Not found");
  }
}

mongoose.connect(process.env["MONGODB_URL"], { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log("Database connected");
})

// Admin routes
app.post('/admin/signup', async(req, res) => {
  // logic to sign up admin
  const {firstName, lastName, username, password} = req.body;
  const admin = await Admin.findOne({username});
  if(admin){
    res.status(403).json({
      message: "Username already exists"
    });
  }
  else{
    const newAdmin = new Admin(req.body);
    await newAdmin.save();
    const token = jwt.sign({username, role: admin}, secretKey);
    res.json({
      message: "Admin created successfully",
      token
    })
  }
});

app.post('/admin/login', async(req, res) => {
  // logic to log in admin
  const {username, password} = req.headers;
  const admin = await Admin.findOne({username, password});
  if(admin){
    const token = jwt.sign({username, password}, secretKey);
    res.json({
      message: "Logged in successfully",
      token
    })
  }
  else{
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.get('/admin/me', authenticateJwt , async(req, res) => {
  const admin = await Admin.findById(req.user._id);
  if(!admin){
    res.status(401).json({message: "Admin doesn't exist"});
  }
  else{
    res.json({admin: admin})
  }
})

app.post('/admin/courses', authenticateJwt, async (req, res) => {
  // logic to create a course
  const course = new Course(req.body);
  await course.save();
  res.json({
    message: "course created Successfully",
    courseId: course.id
  })
});

app.put('/admin/courses/:courseId', authenticateJwt, async(req, res) => {
  // logic to edit a course
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new: true});
  if(course){
    res.json({
      message: "course updated successfully"
    })
  }
  else{
    res.status(403).json({
      message: "Course not found"
    })
  }
});

app.get('/admin/courses', authenticateJwt, async(req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
  res.json({courses: courses});
});

app.get('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if(!course){
    res.status(401).json({
      message: "course Not found"
    })
  }
  else{
    res.json({
      course: course
    })
  }
})

app.delete('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findByIdAndDelete(courseId)
  if(course){
    res.json({
      message: "Course deleted successsfully"
    })
  }
  else{
    res.status(401).json({
      message: "course not found"
    })
  }
})

// User routes
app.post('/users/signup', async(req, res) => {
  // logic to sign up user
  const {firstName, lastName, username, password} = req.body;
  const user = await User.findOne({username});
  if(user){
    res.status(403).json({
      message: "user already Exists"
    })
  }
  else{
    const newuser = new User(req.body);
    await newuser.save();
    const token = jwt.sign({username, role: "user"}, secretKey, {expiresIn: '1h'});
    res.json({
      message: "User created successfully",
      token
    })
  }
});

app.post('/users/login', async(req, res) => {
  // logic to log in user
  const {username, password} = req.headers;
  const user = await User.findOne({username, password});
  if(user){
    const token = jwt.sign({username, role: "user"}, secretKey, {expiresIn: '1h'});
    res.json({
      message: "Logged in successfully",
      token
    })
  }
  else{
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.get('/users/courses', authenticateJwt, async(req, res) => {
  // logic to list all courses
  const courses = await Course.find({published: true});
  res.json({courses});
});

app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
  // logic to purchase a course
  const course = await Course.findById(req.params.courseId);
  if(course){
    const user = await User.findOne({username: req.user.username});
    if(user){
      user.purchasedCourses.push(course);
      await user.save();
      res.json({
        message: "Course purchased successfully"
      })
    }
    else{
      res.status(403).json({
        message: "User not found"
      })
    }
  }
  else{
    res.status(403).json({
      message: "course not found"
    })
  }
});

app.get('/users/purchasedCourses', authenticateJwt, async(req, res) => {
  // logic to view purchased courses
  const user = await User.findOne({username: req.user.username}).populate('purchasedCourses');
  if(user){
    res.json({
      purchasedCourses: user.purchasedCourses || []
    });
  }
  else{
    res.status(403).json({ message: 'User not found' });
  }
});

app.listen(process.env["PORT"], () => {
  console.log('Server is listening on port 3000');
});
