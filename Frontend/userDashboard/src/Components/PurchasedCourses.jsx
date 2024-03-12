import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Card, Typography} from "@mui/material";

const PurchasedCourses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            // Navigate to the login page if the user is not logged in
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/users/purchasedCourses`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => {
            if (!response.ok) {
                console.error("Request failed with status:", response.status);
                throw new Error("Failed to fetch data");
            }
            return response.json();
        }).then((data) => {
            setCourses(data.purchasedCourses);
        }).catch((error) => {
            console.error("Error:", error);
        });

    }, []);

    return (
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {courses.map((course) => {
                return (
                    // eslint-disable-next-line react/jsx-key
                    <Course course={course}></Course>
                )
            })}
        </div>
    )
}

// eslint-disable-next-line react/prop-types
export const Course = ({course}) => {
    const navigate = useNavigate();
    return (
        <div style={{margin: 20}}>
            <Card
                variant="outlined"
                style={{ backgroundColor: "white", width: 300, padding: 20, marginTop: 50, height: 360}}
            >
                {/* eslint-disable-next-line react/prop-types */}
                <Typography textAlign={"center"} variant="h5" style={{color: "#6051db"}}>{course.title}</Typography>
                {/* eslint-disable-next-line react/prop-types */}
                <Typography textAlign={"center"} variant="subtitle1" style={{color: "black", height: "70px"}}>{course.description}</Typography>
                <center>
                    {/* eslint-disable-next-line react/prop-types */}
                    <img src={course.imageLink}  style={{width: 300, height: 200}} ></img>
                </center>
                <div style={{display: "flex", justifyContent: "center", marginTop: 20, gap: "16px"}}>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Button
                        size="large"
                        variant="outlined"
                        color="inherit"
                        sx={{
                            color: "black",
                        }}
                        // onClick={}
                    >
                        View
                    </Button>

                </div>
            </Card>
        </div>
    )
}

export default PurchasedCourses;