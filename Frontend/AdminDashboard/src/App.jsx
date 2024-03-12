import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import EditCourse from "./components/EditCourse";
import Bar from './components/Bar.jsx'
import './Styles.css'


function App() {
    return (
        <Router>
            <Bar></Bar>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/createCourse" element={<CreateCourse />} />
                <Route path="/courses" element={<ShowCourses />} />
                <Route path="/courses/:courseId" element={<EditCourse /> }/>
            </Routes>
        </Router>
    );
}

export default App;