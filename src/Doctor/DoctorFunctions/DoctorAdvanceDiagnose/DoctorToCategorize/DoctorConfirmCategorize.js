import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Button, TextField } from "@mui/material";

function DoctorConfirmCategorize() {
    const { patient_id } = useParams();
    const [leukemiaCategory, setLeukemiaCategory] = useState("");
    const [doctorNotes, setDoctorNotes] = useState("");

    const navigate = useNavigate();

    const handleLeukemiaCategoryChange = (event) => {
        setLeukemiaCategory(event.target.value);
    };

    const handleDoctorNotesChange = (event) => {
        setDoctorNotes(event.target.value);
    };

    const handleConfirm = async () => {
        // Add your confirm logic here
    };

    const handleBack = () => {
        navigate("/doctordashboard/advancediagnose");
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

                <TextField
                    label="Doctor Notes"
                    multiline
                    rows={4}
                    value={doctorNotes}
                    onChange={handleDoctorNotesChange}
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2 }}
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

export default DoctorConfirmCategorize;
