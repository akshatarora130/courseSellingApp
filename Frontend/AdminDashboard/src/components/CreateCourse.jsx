import React, {useEffect, useState} from "react";
import {Card, MenuItem, Select, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";


function CreateCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [price, setPrice] = useState("");
    const [published, setPublished] = useState(false);
    const [areAllFieldsFilled, setAreAllFieldsFilled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            // Navigate to the login page if the user is not logged in
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        setAreAllFieldsFilled(
            title.trim() !== "" &&
            description.trim() !== "" &&
            imageLink.trim() !== "" &&
            price.trim() !== ""
        );
    }, [title, description, imageLink, price]);


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
                <button className={"btn"} onClick={() => {
                    if(areAllFieldsFilled){
                    fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/courses`, {
                        method: "POST",
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
                        alert("Course Created successfully")
                        navigate("/courses")
                    })
                }
                    else{
                        alert("Fill all the fields")
                    }
                }}
                >
                    Add Course
                </button>
            </Card>
        </div>
    )
}
export default CreateCourse;