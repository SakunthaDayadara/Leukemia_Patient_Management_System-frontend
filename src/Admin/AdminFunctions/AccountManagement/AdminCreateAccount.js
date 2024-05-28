import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function AdminCreateAccount() {
    const [ward_num, setWardNum] = useState("");
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleWardNumChange = (event) => {
        setWardNum(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        const token = localStorage.getItem("token");
        const data = {
            name: name,
            username: username,
            password: password
        };

        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };

        let url = "";
        let payload = {};

        if (type === "doctor") {
            url = `${process.env.REACT_APP_BACKEND_URL}/doctors`;
            payload = { doctor: data };
        } else if (type === "nurse") {
            url = `${process.env.REACT_APP_BACKEND_URL}/nurses`;
            payload = { nurse: { ...data, ward_num: ward_num } };
        }

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                setType("");
                setName("");
                setUsername("");
                setPassword("");
                setWardNum("");

                // Show success alert
                alert("Submission successful");


                console.log("API Response:", response);
            })
            .catch(error => {
                // Handle error
                console.error("API Error:", error);
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
                    height: 440,
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
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={name}
                    onChange={handleNameChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={handleUsernameChange}
                />
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
                <FormControl fullWidth>
                    <InputLabel>Ward Number</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="ward_num"
                        label="Ward Number"
                        value={ward_num}
                        onChange={handleWardNumChange}
                    >
                        <MenuItem value={""}>None</MenuItem>
                        <MenuItem value={"wd10"}>Ward 10</MenuItem>
                        <MenuItem value={"wd11"}>Ward 11</MenuItem>
                        <MenuItem value={"wd15"}>Ward 15</MenuItem>
                        <MenuItem value={"wd16"}>Ward 16</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                >Submit</Button>
            </Paper>
        </React.Fragment>
    );
}

export default AdminCreateAccount;
