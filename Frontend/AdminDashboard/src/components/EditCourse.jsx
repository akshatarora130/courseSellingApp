import {useNavigate, useParams} from "react-router-dom";
import {Card, Grid, MenuItem, Select, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";


const EditCourse = () => {
    let {courseId} = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/courses/${courseId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => {
            response.json().then((data) => {
                setCourse(data.course);
                console.log(data.course)
            })
        })
    }, []);

    if(!course){
        return (
            <div style={{color: "white", marginTop: "1000px"}}>
                loading.....
            </div>
        )
    }

    return (
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <UpdateCard course={course} setCourse={setCourse} />
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <Course course={course} />
            </Grid>
        </Grid>
    )
}


const UpdateCard = (props) => {
    // eslint-disable-next-line react/prop-types
    const course = props.course;
    // eslint-disable-next-line react/prop-types
    const [title, setTitle] = useState(course.title);
    // eslint-disable-next-line react/prop-types
    const [description, setDescription] = useState(course.description);
    // eslint-disable-next-line react/prop-types
    const [imageLink, setImageLink] = useState(course.imageLink);
    // eslint-disable-next-line react/prop-types
    const [price, setPrice] = useState(course.price);
    // eslint-disable-next-line react/prop-types
    const [published, setPublished] = useState(course.published);
    const navigate = useNavigate();


    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card
                variant="outlined"
                style={{ backgroundColor: "#202020", width: 400, padding: 20, marginTop: 200 }}
            >
                <center>
                    <Typography component="h1" variant="h5" style={{ color: "white" }}>
                        Course
                    </Typography>
                </center>
                <br/>
                <TextField
                    fullWidth={true}
                    label="Title"
                    variant="outlined"
                    value={title}
                    required={true}
                    style={{ backgroundColor: "#2b2b2b" }}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    InputLabelProps={{
                        style: {
                            color: "white",
                        },
                    }}
                    InputProps={{
                        style: {
                            borderColor: "#6051db",
                            color: "white",
                        },
                    }}
                />
                <br/><br/>
                <TextField
                    fullWidth={true}
                    label="Description"
                    variant="outlined"
                    required={true}
                    value={description}
                    style={{ backgroundColor: "#2b2b2b" }}
                    onChange={(e) => setDescription(e.target.value)}
                    InputLabelProps={{
                        style: {
                            color: "white",
                        },
                    }}
                    InputProps={{
                        style: {
                            borderColor: "#6051db",
                            color: "white",
                        },
                    }}
                />
                <br/><br/>
                <TextField
                    fullWidth={true}
                    label="image-Link"
                    variant="outlined"
                    required={true}
                    value={imageLink}
                    style={{ backgroundColor: "#2b2b2b" }}
                    onChange={(e) => {setImageLink(e.target.value)}}
                    InputLabelProps={{
                        style: {
                            color: "white",
                        },
                    }}
                    InputProps={{
                        style: {
                            borderColor: "#6051db",
                            color: "white",
                        },
                    }}
                />
                <br/><br/>
                <div style={{display: "flex", gap: "16px"}}>
                    <TextField
                        fullWidth={true}
                        label="Price"
                        variant="outlined"
                        required={true}
                        value={price}
                        style={{ backgroundColor: "#2b2b2b" }}
                        onChange={(e) => setPrice(e.target.value)}
                        InputLabelProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        InputProps={{
                            style: {
                                borderColor: "#6051db",
                                color: "white",
                            },
                        }}
                    />
                    <br/><br/>
                    <Select
                        label="Published"
                        variant="outlined"
                        value={published}
                        required={true}
                        onChange={(e) => setPublished(e.target.value)}
                        style={{ backgroundColor: "#2b2b2b" }}
                        renderValue={(selected) => (
                            <Typography style={{ color: "white" }}>
                                {selected === "true" ? "Published" : "Not Published"}
                            </Typography>
                        )}
                        inputProps={{
                            style: {
                                borderColor: "#6051db",
                                color: "white",
                            },
                        }}
                    >
                        <MenuItem value="true">Published</MenuItem>
                        <MenuItem value="false">Not Published</MenuItem>
                    </Select>
                </div>
                <br/><br/>
                <div style={{display: "flex", gap: "16px"}}>
                <button className={"btn"} onClick={() => {
                    // eslint-disable-next-line react/prop-types
                    props.setCourse({title: title, description: description, imageLink: imageLink, price: price, published: published})
                    // eslint-disable-next-line react/prop-types
                    fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/courses/"${course._id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        },
                        body: JSON.stringify({title: title, description: description, imageLink: imageLink, price: price, published: published})
                    }).then((response) => {
                        if(!response.ok){
                            throw new Error("Failed to create course")
                        }
                        return response.json()
                    }).then(() => {
                        alert("Course Updated successfully")

                        // navigate("/courses")
                    })
                }}
                >
                    Change details
                </button>
                <button className="btn" onClick={() => {navigate("/courses")}}>View Courses</button>
                </div>
            </Card>
        </div>
    )
}

const Course = (props) => {
    // eslint-disable-next-line react/prop-types
    const course = props.course;
    const navigate = useNavigate();
    return (
        <div style={{margin: 20}}>
            <Card
                variant="outlined"
                style={{ backgroundColor: "#202020", width: 300, padding: 20, marginTop: 50, height: 350}}
            >
                {/* eslint-disable-next-line react/prop-types */}
                <Typography textAlign={"center"} variant="h5" style={{color: "#6051db"}}>{course.title}</Typography>
                {/* eslint-disable-next-line react/prop-types */}
                <Typography textAlign={"center"} variant="subtitle1" style={{color: "white"}}>{course.description}</Typography>
                <center>
                    {/* eslint-disable-next-line react/prop-types */}
                    <img src={course.imageLink}  style={{width: 300, height: 200}} ></img>
                </center>
                <div style={{display: "flex", gap: "16px", marginTop: 20}}>
                    {/* eslint-disable-next-line react/prop-types */}
                    <button className={"btn"} onClick={ () => {
                        // eslint-disable-next-line react/prop-types
                        fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/courses/${course._id}`, {
                            method: "DELETE",
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            },
                        }).then((response) => {
                            response.json().then(() => {
                                // alert("Course delted successfully");
                                navigate('/courses')
                            })
                        })
                    }
                    }>
                        Delete
                    </button>
                </div>
            </Card>
        </div>
    )
}

export default EditCourse;