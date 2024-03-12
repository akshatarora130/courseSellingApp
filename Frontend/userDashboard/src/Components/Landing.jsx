import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

    return(
        <div style={{display: "flex", gap: "50px",justifyContent: "center"}}>
            <div style={{marginTop: "100px"}}>
                <img src="https://i.ibb.co/JKFnF4b/My-project.png" alt="My-project" border="0"/>
            </div>
            <div>
                <Typography variant="h3" className="title" style={{marginTop: "300px", color: "white"}}>Welcome to Courses World</Typography>
                <Button
                    size="large"
                    variant="outlined"
                    color="inherit"
                    sx={{
                        color: "white",
                        marginTop: "20px",
                        marginLeft: "410px"
                    }}
                    onClick={() => navigate("/ShowCourses")}
                >
                    View Courses
                </Button>
            </div>
        </div>
    )
}

export default Landing;