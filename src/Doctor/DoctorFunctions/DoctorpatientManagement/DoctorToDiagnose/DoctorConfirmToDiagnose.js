import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Button, Modal, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function DoctorConfirmToDiagnose() {
    const { patient_id } = useParams();
    const [diagnoseState, setDiagnoseState] = useState("");
    const [appointmentData, setAppointmentData] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [reportUrl, setReportUrl] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/appointments/find_by_patient_id?patient_id=${patient_id}`)
            .then(response => response.json())
            .then(data => {
                setAppointmentData(data[0]);
            })
            .catch(error => {
                console.error('Error fetching appointment data:', error);
            });
    }, [patient_id]);

    const handleDiagnoseStateChange = (event) => {
        setDiagnoseState(event.target.value); // Update the diagnose state when the value changes
    };

    const handleConfirm = async () => {
        const response = await fetch('${process.env.REACT_APP_BACKEND_URL}/patients/doctor_make_diagnose', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                patient_id: patient_id,
                current_diagnose: diagnoseState,
            }),
        });

        if (response.ok) {
            alert('Diagnose updated successfully');
            navigate("/doctordashboard/patientmanagement");
        } else {
            alert('Failed to update diagnose');
        }
    };

    const handleBack = () => {
        navigate("/doctordashboard/patientmanagement");
    };

    const handleOpenModal = (url) => {
        setReportUrl(url);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setReportUrl("");
    };

    return (
        <React.Fragment>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column', // Change to column direction
                    alignItems: 'center',
                    height: '100%',
                }}
            >

                {appointmentData && (
                    <Box sx={{ mt: 2, width: '100%' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenModal(appointmentData.bmt_report)}
                            sx={{ mb: 1, width: '100%' }}
                        >
                            Bone Marrow Test Report
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenModal(appointmentData.fbc_report)}
                            sx={{ mb: 1, width: '100%' }}
                        >
                            Full Blood Count Report
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenModal(appointmentData.bp_report)}
                            sx={{ width: '100%' }}
                        >
                            Blood Picture Report
                        </Button>
                    </Box>
                )}

                <InputLabel sx={{ mt: 5 }}>
                    Give Initial Diagnose
                </InputLabel>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Diagnose State</InputLabel>
                    <Select
                        labelId="diagnose-state-label"
                        id="diagnose-state"
                        label="Diagnose State"
                        value={diagnoseState}
                        onChange={handleDiagnoseStateChange}
                    >
                        <MenuItem value={"cancer_patient"}>Cancer patient</MenuItem>
                        <MenuItem value={"non_cancer_patient"}>Non Cancer patient</MenuItem>
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

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        mt: 3,
                    }}
                >
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <iframe
                        src={reportUrl}
                        title="Report"
                        width="100%"
                        height="600px"
                    />
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default DoctorConfirmToDiagnose;
