import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bar from "./Components/Bar.jsx";
import Landing from "./Components/Landing.jsx";
import Signup from "./Components/Signup.jsx"
import Login from "./Components/Login.jsx";
import ShowCourses from "./Components/ShowCourses.jsx";
import PurchasedCourses from "./Components/PurchasedCourses.jsx";
import './App.css'


function App() {

  return (
    // <div>
    //     <div style={{width: 200, height: 100, backgroundColor: "#d9d5d6", border: "10px solid #f08731" }}></div>
    // </div>
    <Router>
        <Bar></Bar>
        <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/ShowCourses" element={<ShowCourses />}></Route>
            <Route path="/PurchasedCourses" element={<PurchasedCourses/>}></Route>
        </Routes>
    </Router>
  )
}

export default App
