import  { useEffect, useState } from "react";
import {AppBar, Button, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography,} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Bar = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            setLoggedIn(true);
        }
    }, [token]);

    // useEffect(() => {
    //     fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/me`, {
    //         method: "GET",
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem("token")
    //         }
    //     }).then((response) => {
    //         response.json().then((data) => {
    //             setEmail(data.admin.username);
    //             if(email){
    //                 setLoggedIn(true);
    //             }
    //         })
    //     })
    // },[])


    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const handleAddCourses = () => {
        navigate("/createCourse");
        handleDrawerClose();
    };

    const handleShowCourses = () => {
        navigate("/courses");
        handleDrawerClose();
    };

    return (
        <div>
            <AppBar
                position="fixed"
                style={{ backgroundColor: "black", height: "60px", width: "100%" }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                ml: 2,
                                mt: 1,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "#6051db",
                                textDecoration: "none",
                            }}
                        >
                            courses world
                        </Typography>
                    </div>
                    <div>
                        {isLoggedIn ? (
                            <>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    sx={{ marginRight: "5px" }}
                                    onClick={() => {
                                        navigate("/");
                                        localStorage.setItem("token", "");
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                {!localStorage.getItem("token") && (
                                    <>
                                        <Button
                                            variant="outlined"
                                            color="inherit"
                                            sx={{ marginRight: "5px" }}
                                            onClick={() => navigate("/login")}
                                        >
                                            Login
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="inherit"
                                            onClick={() => navigate("/register")}
                                        >
                                            Signup
                                        </Button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerClose}
                PaperProps={{
                    sx: { width: "240px", backgroundColor: "#212121", color: "white" },
                }}
            >
                <List sx={{ mt: "60px" }}>
                    <>
                        <ListItem button onClick={handleAddCourses}>
                            <ListItemText primary="Add Course" />
                        </ListItem>
                        <ListItem button onClick={handleShowCourses}>
                            <ListItemText primary="Show Courses"/>
                        </ListItem>
                    </>
                </List>
            </Drawer>
        </div>
    );
};

export default Bar;
