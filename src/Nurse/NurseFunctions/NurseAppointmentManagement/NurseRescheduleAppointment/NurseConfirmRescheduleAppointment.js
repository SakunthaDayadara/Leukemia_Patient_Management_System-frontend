import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Modal, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";

function NurseConfirmRescheduleAppointment() {
    const { appointment_id } = useParams();
    const [appointment, setAppointment] = useState(null);
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointment();
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

    const handleClose = () => {
        setOpen(false);
        navigate('/nursedashboard/appointmentmanagement/rescheduleappointment');
    };

    const handleConfirm = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/appointments/make_reschedule_done`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    appointment_id: appointment_id
                })
            });
            if (response.ok) {
                alert('Appointment confirmed successfully!');
                handleClose();
            } else {
                console.error('Failed to confirm appointment:', response.statusText);
                alert('Failed to confirm appointment');
            }
        } catch (error) {
            console.error('Error confirming appointment:', error);
            alert('Error confirming appointment');
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

export default NurseConfirmRescheduleAppointment;
