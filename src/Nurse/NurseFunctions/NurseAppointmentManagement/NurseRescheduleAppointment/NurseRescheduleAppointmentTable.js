import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

function NurseRescheduleAppointmentTable() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/appointments/make_reschedule_table`);
            const data = await response.json();
            setAppointments(data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    const handleDelete = async (rowData) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this appointment?');
        if (!isConfirmed) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/appointments/delete_by_appointment_id?appointment_id=${rowData.appointment_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                alert('Appointment deleted successfully!');
                fetchAppointments(); // Refresh the list of appointments
            } else {
                console.error('Failed to delete appointment:', response.statusText);
                alert('Failed to delete appointment');
            }
        } catch (error) {
            console.error('Error deleting appointment:', error);
            alert('Error deleting appointment');
        }
    };

    const handleEdit = (rowData) => {
        setSelectedAppointment(rowData);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedAppointment(null);
    };

    const handleConfirmReschedule = async () => {
        if (!selectedAppointment) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/appointments/make_reschedule_done`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    appointment_id: selectedAppointment.appointment_id
                })
            });

            if (response.ok) {
                alert("Appointment rescheduled successfully.");
                handleCloseModal();
                fetchAppointments(); // Refresh the list of appointments
            } else {
                console.error('Failed to reschedule appointment:', response.statusText);
                alert('Failed to reschedule appointment');
            }
        } catch (error) {
            console.error('Error rescheduling appointment:', error);
            alert('Error rescheduling appointment');
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
                <MaterialTable
                    columns={[
                        { title: 'Appointment ID', field: 'appointment_id' },
                        { title: 'Appointment Date', field: 'appointment_date' },
                        { title: 'Patient ID', field: 'patient_id' }
                    ]}
                    data={appointments}
                    title="Appointments to Confirm Reschedule"
                    style={{ width: '100%' }}
                    options={{
                        pageSize: 5,
                        pageSizeOptions: [5, 10, 20],
                    }}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Appointment',
                            onClick: (event, rowData) => {
                                handleEdit(rowData);
                            }
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete Appointment',
                            onClick: (event, rowData) => {
                                handleDelete(rowData);
                            }
                        }
                    ]}
                />
            </Paper>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="edit-modal-title"
                aria-describedby="edit-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="edit-modal-title" variant="h6" component="h2">
                        Reschedule Appointment
                    </Typography>
                    {selectedAppointment && (
                        <Box>
                            <TextField
                                label="Appointment ID"
                                value={selectedAppointment.appointment_id}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                label="Appointment Date"
                                value={selectedAppointment.appointment_date}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                label="Patient ID"
                                value={selectedAppointment.patient_id}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Box>
                    )}
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="secondary" onClick={handleCloseModal}>
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleConfirmReschedule}>
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default NurseRescheduleAppointmentTable;
