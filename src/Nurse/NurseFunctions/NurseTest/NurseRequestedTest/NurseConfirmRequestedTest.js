import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import { InputLabel, TextField, Button, Box, MenuItem, FormControl, Select } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function NurseConfirmRequestedTest() {
    const { test_id } = useParams();
    const navigate = useNavigate();
    const [testDate, setTestDate] = useState(null);
    const [testPlace, setTestPlace] = useState("");
    const [nurseId, setNurseId] = useState("");

    useEffect(() => {
        const fetchNurseId = async () => {
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
                setNurseId(data.user_id);
            } catch (error) {
                console.error('Error fetching nurse ID:', error);
            }
        };

        fetchNurseId();
    }, []);

    const handleConfirm = async () => {
        if (!testDate || !testPlace) {
            alert("Please select both test date and test place.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tests/nurse_make_test_scheduled`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    test_id: test_id,
                    nurse_id: nurseId,
                    test_date: testDate.toISOString(),
                    test_place: testPlace
                })
            });

            if (response.ok) {
                alert("Test scheduled successfully.");
                navigate("/nursedashboard/test");
            } else {
                alert("Failed to schedule the test.");
            }
        } catch (error) {
            console.error('Error scheduling test:', error);
            alert("Failed to schedule the test.");
        }
    };

    const handleBack = () => {
        navigate("/nursedashboard/test");
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <InputLabel
                        htmlFor="bmt_date"
                        style={{ marginTop: '8px' }}
                    >
                        Select Test Date
                    </InputLabel>
                    <DatePicker
                        required
                        fullWidth
                        id="bmt_date"
                        label="Select Test Date"
                        value={testDate}
                        disablePast
                        onChange={(newValue) => setTestDate(newValue)}
                        sx={{ width: '100%', marginTop: '8px' }} // Set custom width and margin-top
                    />
                </LocalizationProvider>

                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="test-place-label">Test Place</InputLabel>
                    <Select
                        labelId="test-place-label"
                        id="test-place"
                        value={testPlace}
                        label="Test Place"
                        onChange={(event) => setTestPlace(event.target.value)}
                    >
                        <MenuItem value="Pathology Lab">Pathology Lab</MenuItem>
                        <MenuItem value="Hematology Lab">Hematology Lab</MenuItem>
                        <MenuItem value="Microbiology Lab">Microbiology Lab</MenuItem>
                        <MenuItem value="Immunology Lab">Immunology Lab</MenuItem>
                        <MenuItem value="Razavi Complex">Razavi Complex</MenuItem>
                        <MenuItem value="Private Testing">Private Testing</MenuItem>
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

export default NurseConfirmRequestedTest;
