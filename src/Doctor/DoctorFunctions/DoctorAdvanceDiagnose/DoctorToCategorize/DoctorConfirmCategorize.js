import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Button, TextField } from "@mui/material";

function DoctorConfirmCategorize() {
    const { patient_id } = useParams();
    const [leukemiaCategory, setLeukemiaCategory] = useState("");
    const [doctorNotes, setDoctorNotes] = useState("");
    const [treatmentPlan, setTreatmentPlan] = useState("");
    const [doctorId, setDoctorId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_BACKEND_URL}/staffautologin`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setDoctorId(data.user_id);
            })
            .catch(error => {
                console.error('Error fetching doctor ID:', error);
            });
    }, []);

    const handleLeukemiaCategoryChange = (event) => {
        setLeukemiaCategory(event.target.value);
    };

    const handleDoctorNotesChange = (event) => {
        setDoctorNotes(event.target.value);
    };

    const handleTreatmentPlanChange = (event) => {
        setTreatmentPlan(event.target.value);
    };

    const handleConfirm = async () => {
        if (!leukemiaCategory || !treatmentPlan) {
            alert("Please select both leukemia category and treatment plan.");
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const categorizeResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patients/doctor_make_categorize`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ patient_id })
            });

            if (!categorizeResponse.ok) {
                throw new Error('Categorize request failed');
            }

            const diagnoseResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/diagnoses`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    diagnosis: {
                        category: leukemiaCategory,
                        doctor_notes: doctorNotes,
                        doctor_id: doctorId,
                        patient_id: patient_id
                    }
                })
            });

            if (!diagnoseResponse.ok) {
                throw new Error('Diagnose request failed');
            }

            const diagnoseData = await diagnoseResponse.json();
            const diagnoseId = diagnoseData.diagnose_id;

            const treatmentPlanResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/treatment_plans`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    treatment_plan: {
                        treatment_type: treatmentPlan,
                        treatment_status: "ongoing",
                        doctor_id: doctorId,
                        patient_id: patient_id,
                        diagnose_id: diagnoseId
                    }
                })
            });

            if (!treatmentPlanResponse.ok) {
                throw new Error('Treatment plan request failed');
            }

            alert("Patient categorized and treatment plan assigned successfully.");
            navigate("/doctordashboard/advancediagnose");

        } catch (error) {
            console.error('Error during confirmation process:', error);
            alert('An error occurred. Please try again.');
        }
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

export default DoctorConfirmCategorize;
