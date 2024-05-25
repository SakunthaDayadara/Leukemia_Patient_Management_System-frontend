import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Modal, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";

function NurseConfirmAppointment() {
    const { appointment_id } = useParams();
    const [appointment, setAppointment] = useState(null);
    const [nurseid, setNurseid] = useState(null);
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointment();
        fetchNurse();
    }, [appointment_id]);

    const fetchAppointment = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/appointments/find_by_appointment_id?appointment_id=${appointment_id}`);
            const data = await response.json();
            setAppointment(data);
        } catch (error) {
            console.error("Error fetching appointment:", error);
        }
    };

    const fetchNurse = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }

            // Fetch user data using token
            const autoLoginResponse = await fetch('http://127.0.0.1:3000/staffautologin', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!autoLoginResponse.ok) {
                throw new Error('Failed to fetch user data');
            }
            const autoLoginData = await autoLoginResponse.json();
            setNurseid(autoLoginData.user_id);
        } catch (error) {
                console.error("Error fetching appointment:", error);
        }
    };

    const handleClose = () => {
        setOpen(false);
        navigate('/nursedashboard/appointmentmanagement');
    };

    const handleConfirm = async () => {
        try {
            // First PATCH request to confirm the appointment
            const responseConfirm = await fetch(`http://127.0.0.1:3000/appointments/nurse_confirm_appointment`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    appointment_id: appointment_id,
                    nurse_id: nurseid
                })
            });
            console.log(nurseid);

            if (!responseConfirm.ok) {
                throw new Error('Failed to confirm appointment');
            }

            // Second PATCH request to make the appointment for the patient
            const responseMakeAppointment = await fetch(`http://127.0.0.1:3000/patients/make_appointment`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patient_id: appointment.patient_id
                })
            });

            if (!responseMakeAppointment.ok) {
                throw new Error('Failed to make appointment for patient');
            }

            alert('Appointment confirmed successfully!');
            handleClose();
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4
                }}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Confirm Appointment
                    </Typography>
                    {appointment && (
                        <Box>
                            <Typography id="modal-description" sx={{ mt: 2 }}>
                                Appointment ID: {appointment.appointment_id}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                Appointment Date: {appointment.appointment_date}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                Patient ID: {appointment.patient_id}
                            </Typography>
                        </Box>
                    )}
                    <Button
                        onClick={handleConfirm}
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        color="secondary"
                        sx={{ mt: 2, ml: 2 }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default NurseConfirmAppointment;
