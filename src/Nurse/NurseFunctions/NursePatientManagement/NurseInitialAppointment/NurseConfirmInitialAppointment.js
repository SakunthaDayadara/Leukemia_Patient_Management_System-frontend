import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Button, Checkbox, FormControlLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function NurseConfirmInitialAppointment() {
    const { patient_id } = useParams();
    const [blood_type, setBlood_type] = useState(""); // State to hold the selected blood type
    const [selectedDate, setSelectedDate] = useState(new Date()); // Initial selected date
    const [fullBloodCountSubmitted, setFullBloodCountSubmitted] = useState(false); // State for full blood count test checkbox
    const [bloodPictureSubmitted, setBloodPictureSubmitted] = useState(false); // State for blood picture test checkbox
    const navigate = useNavigate();

    const handleBloodTypeChange = (event) => {
        setBlood_type(event.target.value); // Update the blood type state when the value changes
    };

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate); // Update selected date when the value changes
    };

    const handleFullBloodCountChange = (event) => {
        setFullBloodCountSubmitted(event.target.checked); // Update full blood count state when the checkbox value changes
    };

    const handleBloodPictureChange = (event) => {
        setBloodPictureSubmitted(event.target.checked); // Update blood picture state when the checkbox value changes
    };

    const handleConfirm = async () => {
        if (!fullBloodCountSubmitted || !bloodPictureSubmitted) {
            alert("Please complete the test submissions first.");
            return;
        }

        const token = localStorage.getItem('token');

        try {
            const response1 = await fetch("${process.env.REACT_APP_BACKEND_URL}/patients/make_test_done", {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patient_id: patient_id,
                    blood_type: blood_type
                })
            });

            if (!response1.ok) {
                throw new Error('Failed to update patient tests');
            }

            const response2 = await fetch("${process.env.REACT_APP_BACKEND_URL}/appointments/nurse_make_test_done", {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patient_id: patient_id,
                    bmt_date: dayjs(selectedDate).format('YYYY-MM-DD')
                })
            });

            if (!response2.ok) {
                throw new Error('Failed to update appointment tests');
            }

            alert("Tests successfully submitted and appointment updated.");
            navigate("/nursedashboard/patientmanagement");
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting the tests. Please try again.');
        }
    };

    const handleBack = () => {
        navigate("/nursedashboard/patientmanagement");
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
                        labelId="blood-type-label"
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

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={fullBloodCountSubmitted}
                                onChange={handleFullBloodCountChange}
                                inputProps={{ 'aria-label': 'Full Blood Count Test Submitted' }}
                            />
                        }
                        label="Full Blood Count Test Submitted"
                        sx={{ mt: 2 }}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={bloodPictureSubmitted}
                                onChange={handleBloodPictureChange}
                                inputProps={{ 'aria-label': 'Blood Picture Test Submitted' }}
                            />
                        }
                        label="Blood Picture Test Submitted"
                        sx={{ mt: 1 }}
                    />
                </FormControl>

                <InputLabel
                    htmlFor="bmt_date"
                    style={{ marginTop: '8px' }}
                >
                    Bone Marrow Test Date
                </InputLabel>
                <DatePicker
                    required
                    fullWidth
                    id="bmt_date"
                    label="Bone Marrow Test Date"
                    value={dayjs(selectedDate)}
                    onChange={handleDateChange}
                    sx={{ width: '100%', marginTop: '8px' }} // Set custom width and margin-top
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '16px' }}>
                    <Button variant="contained" color="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleBack}>
                        Back
                    </Button>
                </Box>
            </Paper>
        </React.Fragment>
    );
}

export default NurseConfirmInitialAppointment;
