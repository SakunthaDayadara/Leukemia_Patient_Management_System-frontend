import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useNavigate, useParams} from "react-router-dom";
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";

function NurseConfirmInitialAppointment() {
    const { patient_id } = useParams();
    const [blood_type, setBlood_type] = useState("");// State to hold the selected gender
    const navigate = useNavigate();


    const handleBloodTypeChange = (event) => {
        setBlood_type(event.target.value);// Update the gender state when the value changes

    };

    const [selectedDate, setSelectedDate] = useState(new Date()); // Initial selected date


    const handleDateChange = (event) => {
        setSelectedDate(event.target.value); // Update selected date when the value changes
    };




    return (
        <React.Fragment>

            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column', // Change to column direction
                    alignItems: 'center',
                    height: '100%',
                }}
            >

                <FormControl fullWidth>
                    <InputLabel>Blood Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="blood-type"
                        label="Blood Type"
                        value={blood_type}
                        onChange={handleBloodTypeChange}
                    >
                        <MenuItem value={"A+"}>A+</MenuItem>
                        <MenuItem value={"A-"}>A-</MenuItem>
                        <MenuItem value={"B+"}>B+</MenuItem>
                        <MenuItem value={"B-"}>B-</MenuItem>
                        <MenuItem value={"AB+"}>AB+</MenuItem>
                        <MenuItem value={"AB-"}>AB-</MenuItem>
                        <MenuItem value={"O+"}>O+</MenuItem>
                        <MenuItem value={"O-"}>O-</MenuItem>
                    </Select>
                </FormControl>



                <InputLabel
                    htmlFor="file-upload"
                    style={{ marginTop: '8px' }}
                >Bone Marrow Test Date</InputLabel>
                <DatePicker
                    required
                    fullWidth
                    id="bmt_date"
                    label="Bone Marrow Test Date"
                    value={dayjs(selectedDate)}
                    onChange={handleDateChange}
                    sx={{ width: '100%', marginTop: '8px' }} // Set custom width and margin-top
                />




            </Paper>

        </React.Fragment>
    );
}

export default NurseConfirmInitialAppointment
;
