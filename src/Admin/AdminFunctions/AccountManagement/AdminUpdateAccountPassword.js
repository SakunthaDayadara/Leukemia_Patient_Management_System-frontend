import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";

function AdminUpdateAccountPassword() {
    const navigate = useNavigate();
    const { user_id } = useParams();
    const { type } = useParams();
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };


    const handleSubmit = () => {
        if (password !== confirmpassword) {
            alert("Password and Confirm Password do not match");
            return;
        }

        let endpoint = "";
        let requestBody = {};

        if (type === "doctor") {
            endpoint = `${process.env.REACT_APP_BACKEND_URL}/doctors/reset_password`;
            requestBody = { doctor_id: user_id, password: password };
        } else if (type === "nurse") {
            endpoint = `${process.env.REACT_APP_BACKEND_URL}/nurses/reset_password`;
            requestBody = { nurse_id: user_id, password: password };
        }

        const token = localStorage.getItem("token");

        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Password reset successfully");
                    navigate(`/admindashboard/accountmanagement/updateaccount`);
                } else {
                    throw new Error("Network response was not ok");
                }
            })
            .catch((error) => {
                console.error("Error resetting password:", error);
                alert("Error resetting password");
            });
    };


    return (
        <React.Fragment>

            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                autoComplete="current-password"
                value={confirmpassword}
                onChange={handleConfirmPasswordChange}
            />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                >Submit</Button>





        </React.Fragment>
    );
}

export default AdminUpdateAccountPassword;
