import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Button, TextField, Typography } from "@mui/material";

function DoctorRequestTest() {
    const [doctorId, setDoctorId] = useState("");
    const [testType, setTestType] = useState("");
    const [cultureType, setCultureType] = useState("");
    const [otherTestType, setOtherTestType] = useState("");
    const [testNotes, setTestNotes] = useState("");
    const [patientKey, setPatientKey] = useState("");
    const [patientDetails, setPatientDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
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

        fetchStaffAutoLogin();
    }, []);

    const handleConfirm = async () => {
        if (!patientDetails) {
            alert("Please select a patient.");
            return;
        }

        if (!testType) {
            alert("Please select a test type.");
            return;
        }

        let finalTestType = testType;
        if (testType === "Cultures") {
            finalTestType = cultureType;
        } else if (testType === "Other") {
            finalTestType = otherTestType;
        }

        let finalTestNotes = testNotes.trim() ? testNotes : "No Special Notes";

        console.log("Final Test Type:", finalTestType);
        console.log("Final Test Notes:", finalTestNotes);



        try {
            console.log(testNotes);
            const response = await fetch('http://127.0.0.1:3000/tests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    test: {
                        patient_id: patientDetails.patient_id,
                        doctor_id: doctorId,
                        test_type: finalTestType,
                        test_notes: finalTestNotes
                    }
                })
            });

            if (response.ok) {
                alert("Test requested successfully.");
                setTestType("");
                setCultureType("");
                setOtherTestType("");
                setTestNotes("");
                setPatientKey("");
                setPatientDetails(null);
            } else {
                alert("Failed to request test.");
            }
        } catch (error) {
            console.error('Error requesting test:', error);
            alert("Failed to request test.");
        }
    };



    const handleTestNotesChange = (event) => {
        setTestNotes(event.target.value);
    };

    const handleTestTypeChange = (event) => {
        setTestType(event.target.value);
        setCultureType("");  // Reset culture type when the test type changes
        setOtherTestType("");  // Reset other test type when the test type changes
    };

    const handlePatientKeyChange = (event) => {
        setPatientKey(event.target.value);
    };

    const handleFindPatient = async () => {
        if (!patientKey.trim()) {
            alert("Please enter a valid patient ID or NIC.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patients/find_by_patient_id_or_nic?key=${patientKey}`);
            if (!response.ok) {
                throw new Error("Failed to find patient");
            }

            const data = await response.json();
            if (data && Object.keys(data).length > 0) {
                setPatientDetails(data);
                alert("Patient found!");
            } else {
                alert("Patient not found.");
            }
        } catch (error) {
            console.error('Error fetching patient details:', error);
            alert("Failed to find patient.");
        }
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
                <TextField
                    label="Select patient by Patient ID or NIC"
                    value={patientKey}
                    onChange={handlePatientKeyChange}
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2 }}
                    InputProps={{
                        endAdornment: (
                            <Button variant="contained" color="primary" onClick={handleFindPatient}>
                                Find
                            </Button>
                        )
                    }}
                />

                {patientDetails && (
                    <>
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Name: {patientDetails.first_name} {patientDetails.last_name}
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 1 }}>
                            NIC: {patientDetails.nic}
                        </Typography>
                    </>
                )}

                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="test-type-label">Test Type</InputLabel>
                    <Select
                        labelId="test-type-label"
                        id="test-type"
                        value={testType}
                        label="Test Type"
                        onChange={handleTestTypeChange}
                    >
                        <MenuItem value="Full Blood Count">Full Blood Count</MenuItem>
                        <MenuItem value="Blood Picture">Blood Picture</MenuItem>
                        <MenuItem value="Peripheral Blood Smear">Peripheral Blood Smear</MenuItem>
                        <MenuItem value="Bone Marrow Aspiration and Biopsy">Bone Marrow Aspiration and Biopsy</MenuItem>
                        <MenuItem value="X-ray">X-ray</MenuItem>
                        <MenuItem value="Magnetic Resonance Imaging">Magnetic Resonance Imaging</MenuItem>
                        <MenuItem value="Ultrasound">Ultrasound</MenuItem>
                        <MenuItem value="Echocardiogram">Echocardiogram</MenuItem>
                        <MenuItem value="Cultures">Cultures</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>

                {testType === "Cultures" && (
                    <TextField
                        label="Specify the Culture Type"
                        value={cultureType}
                        onChange={(e) => setCultureType(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                )}

                {testType === "Other" && (
                    <TextField
                        label="Specify the Test Type"
                        value={otherTestType}
                        onChange={(e) => setOtherTestType(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                )}

                <TextField
                    label="Test Notes"
                    multiline
                    rows={4}
                    value={testNotes}
                    onChange={handleTestNotesChange}
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2 }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '16px' }}>
                    <Button variant="contained" color="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Box>
            </Paper>
        </React.Fragment>
    );
}

export default DoctorRequestTest;
