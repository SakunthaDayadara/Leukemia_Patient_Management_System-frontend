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
        // Add your confirm logic here
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
                    flexDirection: 'column', // Change to column direction
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
