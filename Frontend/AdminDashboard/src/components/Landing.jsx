import React from "react";
import {Button, Typography} from "@mui/material";
// import "./Landing.css"
import {useNavigate} from "react-router-dom";


const Landing = () => {
    const navigate = useNavigate();

    return (
        <div style={{display: "flex", gap: "50px",justifyContent: "left", marginTop: "50px"}}>
            <div style={{marginTop: "30px"}}>
                <img className="img-content" src="https://i.ibb.co/X7869H7/home.png" alt="home" border="0" style={{marginTop: "100px"}}/>
            </div>
            <div style={{marginLeft: "200px"}}>
                <Typography variant="h3" className="title" style={{marginTop: "300px", color: "white"}}>ADMIN Dashboard</Typography>
                <div style={{display: "flex" , justifyContent: "center", gap: "16px"}}>
                    <Button
                        size="large"
                        variant="outlined"
                        color="inherit"
                        sx={{
                            color: "white",
                            marginTop: "20px"
                        }}
                        onClick={() => navigate("/courses")}
                    >
                        View Courses
                    </Button>
                    <Button
                        size="large"
                        variant="outlined"
                        color="inherit"
                        sx={{
                            color: "white",
                            marginTop: "20px"
                        }}
                        onClick={() => navigate("/CreateCourse")}
                    >
                        Create Course
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Landing;