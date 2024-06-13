import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function NurseConfirmNewRecord() {
    const { patient_id } = useParams();
    const [selectedDate, setSelectedDate] = useState(new Date()); // Initial selected date
    const [treatmentNotes, setTreatmentNotes] = useState(""); // State for treatment notes
    const [nurseId, setNurseId] = useState("");
    const [treatmentId, setTreatmentId] = useState("");

    const navigate = useNavigate();

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

                const treatmentResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/treatment_plans/find_by_patient_id?patient_id=${patient_id}`);
                const treatmentData = await treatmentResponse.json();
                setTreatmentId(treatmentData.treatment_id);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchNurseId();
    }, [patient_id]);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate); // Update selected date when the value changes
    };

    const handleNotesChange = (event) => {
        setTreatmentNotes(event.target.value); // Update treatment notes when the value changes
    };

    const handleConfirm = async () => {
        if (!selectedDate) {
            alert('Please select a treatment date.');
            return;
        }

        const updatedTreatmentNote = treatmentNotes.trim() || "No Special Notes";

        const treatmentRecord = {
            treatment_date: dayjs(selectedDate).format('YYYY-MM-DD'),
            treatment_notes: updatedTreatmentNote,
            nurse_id: nurseId,
            patient_id: patient_id,
            treatment_id: treatmentId
        };

        try {
            console.log('Creating treatment record:', treatmentRecord);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/treatment_records`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ treatment_record: treatmentRecord })
            });

            if (response.ok) {
                alert('Treatment record successfully created.');
                navigate("/nursedashboard/treatment");
            } else {
                alert('Failed to create treatment record.');
            }
        } catch (error) {
            console.error('Error creating treatment record:', error);
            alert('An error occurred while creating the treatment record.');
        }
    };

    const handleBack = () => {
        navigate("/nursedashboard/treatment");
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
                <InputLabel
                    htmlFor="treatment_date"
                    style={{ marginTop: '8px' }}
                >
                    Treatment Date
                </InputLabel>
                <DatePicker
                    required
                    fullWidth
                    id="treatment_date"
                    label="Treatment Date"
                    value={dayjs(selectedDate)}
                    onChange={handleDateChange}
                    sx={{ width: '100%', marginTop: '8px' }} // Set custom width and margin-top
                />

                <TextField
                    label="Treatment Notes"
                    multiline
                    rows={4}
                    value={treatmentNotes}
                    onChange={handleNotesChange}
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

export default NurseConfirmNewRecord;
