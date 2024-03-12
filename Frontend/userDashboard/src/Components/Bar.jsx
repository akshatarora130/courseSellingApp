import {AppBar, Button, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Bar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            setLoggedIn(true);
        }
    }, [token]);

    const handleLogout = () => {
        setLoggedIn(false);
        localStorage.setItem("token", "")
        navigate("/");
    }

    return(
        <div>
            <AppBar
                position={"fixed"}
                style={{backgroundColor: "white", height: "60px", width: "100%"}}>
                <Toolbar sx = {{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <IconButton
                            size = "large"
                            edge = "start"
                            // color = ""
                            aria-label="menu"
                            onClick={() => {setDrawerOpen(true)}}
                        >
                            <MenuIcon color="filled"/>
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                ml: 2,
                                mt: 0,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "YourChosenFont, sans-serif", // Replace with your chosen font
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "black",
                                textDecoration: "none",
                            }}
                        >
                            COURSE WORLD
                        </Typography>
                    </div>
                    <div>
                        {isLoggedIn ? (
                            <div style={{display: "flex", gap: "16px"}}>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    sx={{
                                        color: "black",
                                    }}
                                    onClick={() => {navigate("/PurchasedCourses")}}
                                >
                                    Purchased Courses
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    sx={{
                                        color: "black",
                                    }}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>

                            </div>
                        ) : (
                            <>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    sx={{
                                        marginRight: "5px",
                                        color: "black", // Set the text color to black
                                    }}
                                    onClick={() => navigate("/Login")}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    sx={{
                                        color: "black",
                                    }}
                                    onClick={() => navigate("/Signup")}
                                >
                                    Signup
                                </Button>
                            </>
                        )}
                    </div>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: { width: "240px", backgroundColor: "#f08731", color: "white" },
                }}
            >
                <List sx={{marginTop: "70px"}}>
                    <ListItem button onClick={() => {navigate("/")}}>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button onClick={() => {navigate("/ShowCourses")}}>
                        <ListItemText primary="Show courses"/>
                    </ListItem>
                    <ListItem button onClick={() => {navigate("/PurchasedCourses.jsx")}}>
                        <ListItemText primary="Purchased Courses"/>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
}

export default Bar;