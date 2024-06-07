import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

function NurseDischargePatient() {
    const { patient_id } = useParams();
    const [accommodationType, setAccommodationType] = useState(""); // State to hold the selected accommodation type
    const navigate = useNavigate();

    const handleAccommodationTypeChange = (event) => {
        setAccommodationType(event.target.value); // Update the accommodation type state when the value changes
    };

    const handleConfirm = async () => {
        if (!accommodationType) {
            alert("Please select an accommodation type.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patients/discharge_patient`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patient_id: patient_id,
                    accommodation_type: accommodationType
                })
            });

            if (!response.ok) {
                throw new Error('Failed to discharge patient.');
            }

            const bedResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/beds/discharge_patient_by_patient_id`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patient_id: patient_id
                })
            });

            if (!bedResponse.ok) {
                throw new Error('Failed to update bed status.');
            }

            alert('Patient discharged successfully.');
            navigate("/nursedashboard/patientmanagement/admitted");
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleBack = () => {
        navigate("/nursedashboard/patientmanagement/admitted");
    };

    return (
        <React.Fragment>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <FormControl fullWidth>
                    <InputLabel>Accommodation Type</InputLabel>
                    <Select
                        labelId="accommodation-type-label"
                        id="accommodation-type"
                        label="Accommodation Type"
                        value={accommodationType}
                        onChange={handleAccommodationTypeChange}
                    >
                        <MenuItem value={"Personal residence"}>Personal residence</MenuItem>
                        <MenuItem value={"Patient care home"}>Patient care home</MenuItem>
                    </Select>
                </FormControl>

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

export default NurseDischargePatient;
