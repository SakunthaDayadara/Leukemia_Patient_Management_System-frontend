import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {Outlet, useNavigate} from "react-router-dom";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";

function AdminUpdateAccount() {
    const navigate = useNavigate();
    const [type, setType] = useState("");
    const [user_id, setUserID] = useState("");

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleUserIDChange = (event) => {
        setUserID(event.target.value);
    };

    const handleSubmit = () => {
        // Define the endpoint based on the selected type
        let endpoint = "";
        if (type === "doctor") {
            endpoint = `${process.env.REACT_APP_BACKEND_URL}/doctors/find_by_doctor_id?doctor_id=${user_id}`;
        } else if (type === "nurse") {
            endpoint = `${process.env.REACT_APP_BACKEND_URL}/nurses/find_by_nurse_id?nurse_id=${user_id}`;
        }

        // Retrieve token from local storage
        const token = localStorage.getItem("token");

        // Make GET request with Authorization token
        fetch(endpoint, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Parse response JSON
                } else {
                    throw new Error("Network response was not ok");
                }
            })
            .then(data => {
                // Extract username from response data
                const username = data.username;

                navigate(`/admindashboard/accountmanagement/updateaccount/${type}/${user_id}`);
                alert(`Account Found for ${username}`);
            })
            .catch(error => {
                console.error("Error fetching account data:", error);
                alert("Error fetching account data");
            });
    };



    return (
        <React.Fragment>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: 460,
                }}
            >
                <FormControl fullWidth>
                    <InputLabel>Staff Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="type"
                        label="Staff Type"
                        value={type}
                        onChange={handleTypeChange}
                    >
                        <MenuItem value={"doctor"}>Doctor</MenuItem>
                        <MenuItem value={"nurse"}>Nurse</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="user_id"
                    label="Doctor ID/Nurse ID"
                    name="user_id"
                    autoComplete="user_id"
                    autoFocus
                    value={user_id}
                    onChange={handleUserIDChange}
                />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                >Search</Button>

                <Outlet />

            </Paper>

        </React.Fragment>
    );
}

export default AdminUpdateAccount;
