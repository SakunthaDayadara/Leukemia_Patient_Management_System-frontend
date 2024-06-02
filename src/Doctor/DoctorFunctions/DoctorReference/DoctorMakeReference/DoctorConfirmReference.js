import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Button, TextField } from "@mui/material";

function DoctorConfirmReference() {
    const { patient_id } = useParams();
    const [doctors, setDoctors] = useState([]);
    const [referenceNotes, setReferenceNotes] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/doctors`);
                const data = await response.json();
                setDoctors(data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        const fetchStaffAutoLogin = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No authorization token found');
                return;
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/staffautologin`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setDoctorId(data.user_id);
            } catch (error) {
                console.error('Error fetching staff auto login:', error);
            }
        };

        fetchDoctors();
        fetchStaffAutoLogin();
    }, []);

    const handleDoctorChange = (event) => {
        setSelectedDoctor(event.target.value);
    };

    const handleReferenceNotesChange = (event) => {
        setReferenceNotes(event.target.value);
    };

    const handleConfirm = async () => {
        if (!selectedDoctor) {
            alert("Please select a referred doctor.");
            return;
        }

        const referenceData = {
            reference: {
                reference_note: referenceNotes || "Follow up required for advanced diagnosis.",
                referred_doctor_id: selectedDoctor,
                doctor_id: doctorId,
                patient_id: patient_id
            }
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/references`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(referenceData)
            });

            if (response.ok) {
                alert("Reference successfully created.");
                navigate("/doctordashboard/referral");
            } else {
                const errorData = await response.json();
                alert(`Failed to create reference: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error creating reference:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleBack = () => {
        navigate("/doctordashboard/referral");
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
                    <InputLabel>Referred Doctor</InputLabel>
                    <Select
                        value={selectedDoctor}
                        onChange={handleDoctorChange}
                        label="Referred Doctor"
                    >
                        {doctors.map((doctor) => (
                            <MenuItem key={doctor.doctor_id} value={doctor.doctor_id}>
                                {doctor.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Doctor Notes"
                    multiline
                    rows={4}
                    value={referenceNotes}
                    onChange={handleReferenceNotesChange}
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

export default DoctorConfirmReference;
