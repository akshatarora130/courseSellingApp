import React from "react";
import {Avatar, Button, Card, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined.js";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/users/Login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                username: email,
                password: password
            },
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    localStorage.setItem("token", data.token);
                    // console.log(data);
                    navigate("/");
                });
            } else {
                console.error("Login failed");
                alert("Login failed")
            }
        }).catch((error) => {
            console.error("Error during login:", error);
        });
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
                variant="outlined"
                style={{ backgroundColor: "white", width: 400, padding: 20, marginTop: 200 }}
            >
                <center>
                    <Avatar sx={{ m: 1, bgcolor: "#6051db" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" style={{ color: "white" }}>
                        Login
                    </Typography>
                </center>
                <br />
                <TextField
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                    required={true}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    InputLabelProps={{
                        style: {
                            color: "black",
                        },
                    }}
                />
                <br />
                <br />
                <TextField
                    fullWidth={true}
                    label="Password"
                    variant="outlined"
                    required={true}
                    type={"password"}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    InputLabelProps={{
                        style: {
                            color: "black",
                        },
                    }}
                />
                <br />
                <br />

                <Button
                    size="large"
                    variant="outlined"
                    color="inherit"
                    sx={{
                        color: "black",
                    }}
                    onClick={handleLogin}>
                    Login
                </Button>
            </Card>
        </div>
    );
}

export default Login;
