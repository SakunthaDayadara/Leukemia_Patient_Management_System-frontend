import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";

function DoctorScheduledClinic() {
    const [doctorId, setDoctorId] = useState("");
    const [clinicData, setClinicData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [newClinicDate, setNewClinicDate] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctorId = async () => {
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
                console.error('Error fetching doctor ID:', error);
            }
        };

        fetchDoctorId();
    }, []);

    useEffect(() => {
        if (doctorId) {
            const fetchClinics = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:3000/clinics/doctor_schedule_clinic_table?doctor_id=${doctorId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch clinic schedule');
                    }
                    const data = await response.json();
                    setClinicData(data);
                } catch (error) {
                    console.error('Error fetching clinic schedule:', error);
                }
            };

            fetchClinics();
        }
    }, [doctorId]);

    const handleDelete = async (rowData) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Clinic Schedule?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clinics/${rowData.clinic_id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                alert("Clinic deleted successfully.");
                setClinicData(prevData => prevData.filter(clinic => clinic.clinic_id !== rowData.clinic_id));
            } else {
                console.error('Failed to delete appointment:', response.statusText);
                alert("Failed to delete clinic.");
            }
        } catch (error) {
            console.error('Error deleting appointment:', error);
            alert("Error deleting clinic.");
        }
    };

    const handleEdit = (rowData) => {
        setSelectedClinic(rowData);
        setNewClinicDate(dayjs(rowData.clinic_date));
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedClinic(null);
        setNewClinicDate(null);
    };

    const handleConfirm = async () => {
        if (!newClinicDate) {
            alert("Please select a new clinic date.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clinics/doctor_reschedule_clinic`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    clinic_id: selectedClinic.clinic_id,
                    clinic_date: newClinicDate.format('YYYY-MM-DD')
                })
            });

            if (response.ok) {
                alert("Clinic rescheduled successfully.");
                setClinicData(prevData => prevData.map(clinic =>
                    clinic.clinic_id === selectedClinic.clinic_id ? { ...clinic, clinic_date: newClinicDate.format('YYYY-MM-DD') } : clinic
                ));
                handleCloseModal();
            } else {
                console.error('Failed to reschedule clinic:', response.statusText);
                alert("Failed to reschedule clinic.");
            }
        } catch (error) {
            console.error('Error rescheduling clinic:', error);
            alert("Error rescheduling clinic.");
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
                        { title: 'Patient ID', field: 'patient_id' },
                        { title: 'Clinic Date', field: 'clinic_date' },
                        { title: 'Clinic Type', field: 'clinic_type' },
                        { title: 'Last Clinic Date', field: 'last_clinic_date' },
                    ]}
                    data={clinicData}
                    title="Scheduled Clinics"
                    style={{ width: '100%' }}
                    options={{
                        pageSize: 5,
                        pageSizeOptions: [5, 10, 20],
                    }}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Clinic',
                            onClick: (event, rowData) => {
                                handleEdit(rowData);
                            }
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete Clinic Schedule',
                            onClick: (event, rowData) => {
                                handleDelete(rowData);
                            }
                        }
                    ]}
                />
            </Paper>

            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
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
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Reschedule Clinic
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Clinic ID: {selectedClinic?.clinic_id}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                        Patient ID: {selectedClinic?.patient_id}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                        Clinic Type: {selectedClinic?.clinic_type}
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            openTo="day"
                            value={newClinicDate}
                            disablePast
                            onChange={(newValue) => setNewClinicDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button variant="contained" color="primary" onClick={handleConfirm}>
                            Confirm
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                            Back
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default DoctorScheduledClinic;
