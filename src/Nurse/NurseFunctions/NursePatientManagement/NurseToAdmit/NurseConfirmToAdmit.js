import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Button, TextField } from "@mui/material";

function NurseConfirmToAdmit() {
    const { patient_id } = useParams();
    const [patientData, setPatientData] = useState(null);
    const [wards, setWards] = useState([]);
    const [beds, setBeds] = useState([]);
    const [selectedWard, setSelectedWard] = useState("");
    const [selectedBed, setSelectedBed] = useState("");
    const [bhtNumber, setBhtNumber] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/patients/find_by_patient_id?patient_id=${patient_id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setPatientData(data);
                return fetch(`http://127.0.0.1:3000/wards/get_wards_by_gender?patient_gender=${data.gender}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            })
            .then(response => response.json())
            .then(data => {
                setWards(data);
            })
            .catch(error => {
                console.error('Error fetching patient or ward data:', error);
            });
    }, [patient_id]);

    const handleWardChange = (event) => {
        const wardNum = event.target.value;
        setSelectedWard(wardNum);
        setSelectedBed(""); // Reset selected bed when ward changes
        fetch(`http://127.0.0.1:3000/beds/get_available_beds_by_ward?ward_num=${wardNum}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setBeds(data);
            })
            .catch(error => {
                console.error('Error fetching beds:', error);
            });
    };

    const handleBedChange = (event) => {
        setSelectedBed(event.target.value);
    };

    const handleBhtNumberChange = (event) => {
        setBhtNumber(event.target.value);
    };

    const handleConfirm = async () => {
        try {
            // First PATCH request to admit patient
            const patientAdmitRequest = {
                patient_id: patientData.patient_id,
                bht_number: bhtNumber
            };
            await fetch(`http://127.0.0.1:3000/patients/nurse_admit_patient`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(patientAdmitRequest)
            });

            // Second PATCH request to update bed occupancy
            const bedAdmitRequest = {
                bed_id: selectedBed,
                patient_id: patientData.patient_id
            };
            await fetch(`http://127.0.0.1:3000/beds/admit_patient`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(bedAdmitRequest)
            });

            // Third PATCH request for nurse to make diagnose
            const nurseDiagnoseRequest = {
                patient_id: patientData.patient_id
            };
            await fetch(`http://127.0.0.1:3000/appointments/make_appointment_done`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(nurseDiagnoseRequest)
            });

            // Alert user and navigate after successful requests
            alert('Patient admitted and diagnosed successfully!');
            navigate("/nursedashboard/patientmanagement/toadmit");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBack = () => {
        navigate("/nursedashboard/patientmanagement/toadmit");
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
                    htmlFor="ward-select"
                    sx={{ mt: 3 }}
                >
                    Choose Ward
                </InputLabel>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Ward</InputLabel>
                    <Select
                        id="ward-select"
                        value={selectedWard}
                        onChange={handleWardChange}
                        label="Ward"
                    >
                        {wards.map((ward) => (
                            <MenuItem key={ward.ward_num} value={ward.ward_num}>
                                {ward.ward_num}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <InputLabel
                    htmlFor="bed-select"
                    sx={{ mt: 3 }}
                >
                    Choose Bed
                </InputLabel>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Bed</InputLabel>
                    <Select
                        id="bed-select"
                        value={selectedBed}
                        onChange={handleBedChange}
                        label="Bed"
                        disabled={!selectedWard} // Disable bed selector if no ward is selected
                    >
                        {beds.map((bed) => (
                            <MenuItem key={bed.bed_id} value={bed.bed_id}>
                                {bed.bed_id}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    id="bht-number"
                    label="Bed Head Number (BHT Number)"
                    value={bhtNumber}
                    onChange={handleBhtNumberChange}
                    fullWidth
                    sx={{ mt: 3 }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '32px' }}>
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

export default NurseConfirmToAdmit;
