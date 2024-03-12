import React from "react";
import { Avatar, Card, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined.js";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/Login`, {
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
                        console.log(data);
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
                style={{ backgroundColor: "#202020", width: 400, padding: 20, marginTop: 200 }}
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
                    style={{ backgroundColor: "#2b2b2b" }}
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
                    style={{ backgroundColor: "#2b2b2b", borderColor: "#6051db" }}
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
                <br />
                <br />

                <button className={"btn"} onClick={handleLogin}>
                    Login
                </button>
            </Card>
        </div>
    );
}

export default Login;
