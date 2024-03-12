import React, { useState } from "react";
import {Avatar, Button, Card, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";

const Signup = () => {
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
            <Card variant="outlined" style={{ backgroundColor: "white", width: 400, padding: 20, marginTop: 200 }}>
                <center>
                    <Avatar sx={{ m: 1, bgcolor: '#6051db' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" style={{ color: "black" }}>
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
                        InputLabelProps={{
                            style: {
                                color: "black",
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
                        InputLabelProps={{
                            style: {
                                color: "black",
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
                    InputLabelProps={{
                        style: {
                            color: "black",
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
                    InputLabelProps={{
                        style: {
                            color: "black",
                        },
                    }}
                />
                <br /><br />

                <Button
                    size="large"
                    variant="outlined"
                    color="inherit"
                    sx={{
                        color: "black",
                    }}
                    onClick={() => {
                    {
                        if (isButtonDisabled) {
                            alert("Fill all the required fields");
                        } else {
                            fetch(`${import.meta.env.VITE_BACKEND_URL}/users/signup`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({firstName: firstName, lastName: lastName, username: email, password: password,})
                            }).then((response) => {
                                response.json().then((data) => {
                                    localStorage.setItem("token", data.token);
                                    alert("User created succesfully")
                                })
                            })
                            navigate("/");
                        }
                    }
                }}> Signup</Button>

            </Card>
        </div>
    );
}

export default Signup;