import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Button, Typography } from "@mui/material";

function DoctorConfirmChangeCategory() {
    const { patient_id } = useParams();
    const [leukemiaCategory, setLeukemiaCategory] = useState("");
    const navigate = useNavigate();

    const handleLeukemiaCategoryChange = (event) => {
        setLeukemiaCategory(event.target.value);
    };

    const handleConfirm = async () => {
        if (!leukemiaCategory) {
            alert('Please select a leukemia category');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/diagnoses/doctor_change_category`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patient_id: patient_id,
                    category: leukemiaCategory
                })
            });

            if (response.ok) {
                alert('Leukemia category updated successfully');
                navigate("/doctordashboard/advancediagnose/changecategory");
            } else {
                const errorData = await response.json();
                alert(`Error updating category: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error updating category:", error);
            alert('Error updating category');
        }
    };

    const handleBack = () => {
        navigate("/doctordashboard/advancediagnose/changecategory");
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
                <Typography variant="h6">Change Leukemia Category</Typography>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Leukemia Category</InputLabel>
                    <Select
                        value={leukemiaCategory}
                        onChange={handleLeukemiaCategoryChange}
                        label="Leukemia Category"
                    >
                        <MenuItem value="ALL">ALL (Acute Lymphoblastic Leukemia)</MenuItem>
                        <MenuItem value="AML">AML (Acute Myeloid Leukemia)</MenuItem>
                        <MenuItem value="CLL">CLL (Chronic Lymphocytic Leukemia)</MenuItem>
                        <MenuItem value="CML">CML (Chronic Myeloid Leukemia)</MenuItem>
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

export default DoctorConfirmChangeCategory;
