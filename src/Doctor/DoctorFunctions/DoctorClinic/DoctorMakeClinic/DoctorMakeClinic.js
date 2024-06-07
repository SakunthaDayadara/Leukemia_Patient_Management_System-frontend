import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Button, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function DoctorMakeClinic() {
    const [doctorId, setDoctorId] = useState("");
    const [patientDetails, setPatientDetails] = useState(null);
    const [patientKey, setPatientKey] = useState("");
    const [clinicType, setClinicType] = useState("");
    const [imagingsType, setImagingsType] = useState("");
    const [otherClinicType, setOtherClinicType] = useState("");
    const [clinicDate, setClinicDate] = useState(null);
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

    const handleClinicTypeChange = (event) => {
        setClinicType(event.target.value);
        setImagingsType("");
        setOtherClinicType("");
    };

    const handleImagingsTypeChange = (event) => {
        setImagingsType(event.target.value);
    };

    const handleConfirm = async () => {
        if (!clinicDate || !clinicType || (clinicType === "Other" && !otherClinicType) || (clinicType === "Diagnostic Imaging" && !imagingsType) || !patientDetails) {
            alert("Please fill in all required fields and select a patient.");
            return;
        }

        const clinicTypeValue = clinicType === "Other" ? otherClinicType : clinicType === "Diagnostic Imaging" ? imagingsType : clinicType;

        const clinicData = {
            clinic: {
                clinic_date: dayjs(clinicDate).format('YYYY-MM-DD'),
                clinic_type: clinicTypeValue,
                doctor_id: doctorId,
                patient_id: patientDetails.patient_id
            }
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clinics`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(clinicData)
            });

            if (response.ok) {
                alert("Clinic created successfully.");
                setOtherClinicType("");
                setPatientKey("")
                setClinicDate(null);
                setClinicType("");
                setImagingsType("");
                setPatientDetails(null);

            } else {
                alert("Failed to create clinic.");
            }


        } catch (error) {
            console.error('Error creating clinic:', error);
            alert("Failed to create clinic.");
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
                    <InputLabel id="clinic-type-label">Clinic Type</InputLabel>
                    <Select
                        labelId="clinic-type-label"
                        id="clinic-type"
                        value={clinicType}
                        label="Clinic Type"
                        onChange={handleClinicTypeChange}
                    >
                        <MenuItem value="Hematology Clinic">Hematology Clinic</MenuItem>
                        <MenuItem value="Oncology Clinic">Oncology Clinic</MenuItem>
                        <MenuItem value="Radiation Oncology Clinic">Radiation Oncology Clinic</MenuItem>
                        <MenuItem value="Chemotherapy">Chemotherapy</MenuItem>
                        <MenuItem value="Palliative Care Clinic">Palliative Care Clinic</MenuItem>
                        <MenuItem value="Diagnostic Imaging">Diagnostic Imaging</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>

                {clinicType === "Diagnostic Imaging" && (
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="imagings-type-label">Imaging Type</InputLabel>
                        <Select
                            labelId="imagings-type-label"
                            id="imagings-type"
                            value={imagingsType}
                            label="Imaging Type"
                            onChange={handleImagingsTypeChange}
                        >
                            <MenuItem value="Diagnostic Imaging-X-ray">X-ray</MenuItem>
                            <MenuItem value="Diagnostic Imaging-CT scan">CT scan</MenuItem>
                            <MenuItem value="Diagnostic Imaging-MRI">MRI</MenuItem>
                            <MenuItem value="Diagnostic Imaging-ultrasound">Ultrasound</MenuItem>
                            <MenuItem value="Diagnostic Imaging-PET scan">PET scan</MenuItem>
                        </Select>
                    </FormControl>
                )}

                {clinicType === "Other" && (
                    <TextField
                        label="Specify the Clinic Type"
                        value={otherClinicType}
                        onChange={(e) => setOtherClinicType(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                )}

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <InputLabel
                        htmlFor="clinic_date"
                        style={{ marginTop: '8px' }}
                    >
                        Select Clinic Date
                    </InputLabel>
                    <DatePicker
                        required
                        fullWidth
                        id="clinic_date"
                        label="Select Clinic Date"
                        value={clinicDate}
                        disablePast
                        onChange={(newValue) => setClinicDate(newValue)}
                        sx={{ width: '100%', marginTop: '8px' }}
                    />

                </LocalizationProvider>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '16px' }}>
                    <Button variant="contained" color="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Box>
            </Paper>
        </React.Fragment>
    );
}

export default DoctorMakeClinic;
