import React, { useState } from "react";
import { Avatar, Card, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './Register.css'
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    // Function to check if all the fields are filled
    const checkFieldsFilled = () => {
        return firstName.trim() !== "" &&
            lastName.trim() !== "" &&
            email.trim() !== "" &&
            password.trim() !== "";
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "firstName") {
            setFirstName(value);
        } else if (name === "lastName") {
            setLastName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
        setIsButtonDisabled(!checkFieldsFilled());
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card variant="outlined" style={{ backgroundColor: "#202020", width: 400, padding: 20, marginTop: 200 }}>
                <center>
                    <Avatar sx={{ m: 1, bgcolor: '#6051db' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" style={{ color: "white" }}>
                        Sign up
                    </Typography>
                </center>
                <br />
                <div style={{ display: "flex", gap: "16px" }}>
                    <TextField
                        fullWidth={true}
                        label="First Name"
                        variant="outlined"
                        required={true}
                        name="firstName"
                        value={firstName}
                        onChange={handleInputChange}
                        style={{ backgroundColor: "#2b2b2b" }}
                        InputLabelProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        InputProps={{
                            style: {
                                borderColor: "#6051db",
                                color: "white"
                            },
                        }}
                    />
                    <TextField
                        fullWidth={true}
                        label="Last Name"
                        variant="outlined"
                        required={true}
                        name="lastName"
                        value={lastName}
                        onChange={handleInputChange}
                        style={{ backgroundColor: "#2b2b2b" }}
                        InputLabelProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        InputProps={{
                            style: {
                                borderColor: "#6051db",
                                color: "white"
                            },
                        }}
                    />
                </div>
                <br />
                <TextField
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                    required={true}
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#2b2b2b" }}
                    InputLabelProps={{
                        style: {
                            color: "white",
                        },
                    }}
                    InputProps={{
                        style: {
                            borderColor: "#6051db",
                            color: "white"
                        },
                    }}
                />
                <br /><br />
                <TextField
                    fullWidth={true}
                    label="Password"
                    variant="outlined"
                    required={true}
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#2b2b2b", borderColor: "#6051db" }}
                    InputLabelProps={{
                        style: {
                            color: "white",
                        },
                    }}
                    InputProps={{
                        style: {
                            borderColor: "#6051db",
                            color: "white"
                        },
                    }}
                />
                <br /><br />

                <button className="btn" onClick={() => {
                    {
                        if (isButtonDisabled) {
                            alert("Fill all the required fields");
                        } else {
                            fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/signup`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({firstName: firstName, lastName: lastName, username: email, password: password,})
                            }).then((response) => {
                                response.json().then((data) => {
                                    localStorage.setItem("token", data.token);
                                    console.log(data);
                                    alert("Admin created succesfully")
                                })
                            })
                            navigate("/");
                        }
                    }
                }}> Signup</button>

            </Card>
        </div>
    );
}

export default Register;