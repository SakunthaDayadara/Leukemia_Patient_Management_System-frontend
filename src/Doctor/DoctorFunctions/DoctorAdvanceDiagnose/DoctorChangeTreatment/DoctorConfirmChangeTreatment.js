import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Button, Typography } from "@mui/material";

function DoctorConfirmChangeTreatment() {
    const { patient_id } = useParams();
    const [treatmentPlan, setTreatmentPlan] = useState("");
    const navigate = useNavigate();

    const handleTreatmentPlanChange = (event) => {
        setTreatmentPlan(event.target.value);
    };

    const handleConfirm = async () => {
        if (!treatmentPlan) {
            alert('Please select a treatment plan');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/treatment_plans/doctor_change_treatment_type`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patient_id: patient_id,
                    treatment_type: treatmentPlan
                })
            });

            if (response.ok) {
                alert('Treatment plan updated successfully');
                navigate("/doctordashboard/advancediagnose/changetreatment");
            } else {
                const errorData = await response.json();
                alert(`Error updating treatment plan: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error updating treatment plan:", error);
            alert('Error updating treatment plan');
        }
    };

    const handleBack = () => {
        navigate("/doctordashboard/advancediagnose/changetreatment");
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
                <Typography variant="h6">Change Treatment Plan</Typography>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Treatment Plan</InputLabel>
                    <Select
                        value={treatmentPlan}
                        onChange={handleTreatmentPlanChange}
                        label="Treatment Plan"
                    >
                        <MenuItem value="Chemotherapy">Chemotherapy</MenuItem>
                        <MenuItem value="Targeted Therapy">Targeted Therapy</MenuItem>
                        <MenuItem value="Radiation Therapy">Radiation Therapy</MenuItem>
                        <MenuItem value="Stem Cell Transplant">Stem Cell Transplant</MenuItem>
                        <MenuItem value="Immunotherapy">Immunotherapy</MenuItem>
                        <MenuItem value="Watchful Waiting">Watchful Waiting</MenuItem>
                        <MenuItem value="Interferon Therapy">Interferon Therapy</MenuItem>
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

export default DoctorConfirmChangeTreatment;
