import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import EditProfileModal from './EditProfileModal';


function PatientDashpage() {
    const [patientId, setPatientId] = useState("");
    const [patientDetails, setPatientDetails] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [testDetails, setTestDetails] = useState(null);
    const [clinicDetails, setClinicDetails] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [rescheduleDate, setRescheduleDate] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [updatedPatientDetails, setUpdatedPatientDetails] = useState(null);


    const handleEditProfile = () => {
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    };

    const handleSaveProfile = (updatedDetails) => {
        setUpdatedPatientDetails(updatedDetails);
        // Update patient details in the backend here
        console.log('Updated details:', updatedDetails);
        setOpenEditModal(false);
        fetchPatientDetails(patientId);
    };



    useEffect(() => {
        const fetchPatientId = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No authorization token found');
                return;
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patients/auto_login`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setPatientId(data.user_id);
            } catch (error) {
                console.error('Error fetching Patient ID:', error);
            }
        };

        fetchPatientId();
    }, []);

    const fetchAppointmentDetails = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/appointments/last_appointment_by_patient_id?patient_id=${id}`);
            const data = await response.json();
            setAppointmentDetails(data);
        } catch (error) {
            console.error('Error fetching appointment details:', error);
        }
    };

    const fetchTestDetails = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tests/last_test_by_patient_id?patient_id=${id}`);
            const data = await response.json();
            setTestDetails(data);
        } catch (error) {
            console.error('Error fetching test details:', error);
        }
    };

    const fetchClinicDetails = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clinics/last_clinic_by_patient_id?patient_id=${id}`);
            const data = await response.json();
            setClinicDetails(data);
        } catch (error) {
            console.error('Error fetching clinic details:', error);
        }
    };

    const fetchPatientDetails = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patients/find_by_patient_id?patient_id=${id}`);
            const data = await response.json();
            setPatientDetails(data);
        } catch (error) {
            console.error('Error fetching patient details:', error);
        }
    };

    useEffect(() => {


        if (patientId) {
            fetchPatientDetails(patientId);
            fetchAppointmentDetails(patientId);
            fetchTestDetails(patientId);
            fetchClinicDetails(patientId);
        }
    }, [patientId]);

    const handleRequestReschedule = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setRescheduleDate(null);
    };

    const handleConfirmReschedule = async () => {
        if (!rescheduleDate) {
            alert("Please select a date to reschedule.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/appointments/make_reschedule`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patient_id: patientId,
                    appointment_date: rescheduleDate.format('YYYY-MM-DD')
                })
            });

            if (response.ok) {
                alert("Appointment rescheduled successfully.");
                handleCloseModal();
                fetchAppointmentDetails(patientId);
            } else {
                alert("Failed to reschedule appointment.");
            }
        } catch (error) {
            console.error('Error rescheduling appointment:', error);
        }
    };

    const renderAppointmentDetails = () => {
        if (!appointmentDetails) return (
            <Card sx={{ width: '100%' }}>
                <CardHeader
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    title={
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <PendingActionsIcon color="warning" fontSize="large" />;
                        </Box>
                    }
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" sx={{ fontSize: '1.2rem' }}>
                        Your appointment is ongoing.
                    </Typography>
                </CardContent>
            </Card>
        );

        const { appointment_status, appointment_id, appointment_date } = appointmentDetails;

        let statusIcon;
        let statusMessage;
        let actionButton;

        switch (appointment_status) {
            case 'done':
                statusIcon = <EventAvailableIcon color="success" fontSize="large" />;
                statusMessage = (
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>Your appointment is already over!</Typography>
                    </Box>
                );
                break;
            case 'to reschedule':
                statusIcon = <PendingActionsIcon color="warning" fontSize="large" />;
                statusMessage = (
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>Waiting for confirmation on reschedule</Typography>
                    </Box>
                );
                break;
            case 'pending':
                statusIcon = <PendingActionsIcon color="warning" fontSize="large" />;
                statusMessage = (
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>Waiting on confirmation on appointment</Typography>
                    </Box>
                );
                break;
            case 'confirmed':
                statusIcon = <ScheduleIcon color="primary" fontSize="large" />;
                statusMessage = (
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>Appointment Date: {appointment_date}</Typography>
                    </Box>
                );
                actionButton = (
                    <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleRequestReschedule}>
                        Request to Reschedule
                    </Button>
                );
                break;
            default:
                return (
                    <Card sx={{ width: '100%' }}>
                        <CardHeader
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            title={
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                    <PendingActionsIcon color="warning" fontSize="large" />;
                                </Box>
                            }
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p" sx={{ fontSize: '1.2rem' }}>
                                Your appointment is ongoing.
                            </Typography>
                        </CardContent>
                    </Card>
                );
        }

        return (
            <Card sx={{ width: '100%' }}>
                <CardHeader
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    title={
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            {statusIcon}
                        </Box>
                    }
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {statusMessage}
                    </Typography>
                    {actionButton}
                </CardContent>
            </Card>
        );
    };

    const renderTestDetails = () => {
        if (!testDetails) return (
            <Card sx={{ width: '100%' }}>
                <CardHeader
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    title={
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <EventBusyIcon color="error" fontSize="large" />;
                        </Box>
                    }
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        No tests conducted yet.
                    </Typography>
                </CardContent>
            </Card>
        );

        const { test_status, test_type, test_date } = testDetails;

        let statusIcon;
        let statusMessage;

        switch (test_status) {
            case 'requested':
                statusIcon = <PendingActionsIcon color="warning" fontSize="large" />;
                statusMessage = (
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>Test have been requested. Waiting to schedule.</Typography>
                    </Box>
                );
                break;
            case 'scheduled':
                statusIcon = <ScheduleIcon color="primary" fontSize="large" />;
                statusMessage = (
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>Test Type: {test_type}</Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>Test Date: {test_date}</Typography>
                    </Box>
                );
                break;
            case 'finished':
                statusIcon = <EventAvailableIcon color="success" fontSize="large" />;
                statusMessage = (
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>Your last test is completed.</Typography>
                    </Box>
                );
                break;
            default:
                statusIcon = <EventBusyIcon color="error" fontSize="large" />;
                statusMessage = (
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>No tests conducted yet.</Typography>
                    </Box>
                );
                break;
        }

        return (
            <Card sx={{ width: '100%' }}>
                <CardHeader
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    title={
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            {statusIcon}
                        </Box>
                    }
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {statusMessage}
                    </Typography>
                </CardContent>
            </Card>
        );
    };

    const renderClinicDetails = () => {
        if (!clinicDetails) return (
            <Card sx={{ width: '100%' }}>
                <CardHeader
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    title={
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <EventBusyIcon color="error" fontSize="large" />;
                        </Box>
                    }
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        No clinics yet.
                    </Typography>
                </CardContent>
            </Card>
        );

        const { clinic_status, clinic_type, clinic_date } = clinicDetails;

        let statusIcon;
        let statusMessage;

        switch (clinic_status) {
            case 'scheduled':
                statusIcon = <ScheduleIcon color="primary" fontSize="large" />;
                statusMessage = (
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>Clinic Type: {clinic_type}</Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>Clinic Date: {clinic_date}</Typography>
                    </Box>
                );
                break;
            case 'ongoing':
                statusIcon = <PendingActionsIcon color="warning" fontSize="large" />;
                statusMessage = (
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>Your Clinic is ongoing now.</Typography>
                    </Box>
                );
                break;
            case 'completed':
                statusIcon = <EventAvailableIcon color="success" fontSize="large" />;
                statusMessage = (
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>Your last clinic is completed.</Typography>
                    </Box>
                );
                break;
            default:
                statusIcon = <EventBusyIcon color="error" fontSize="large" />;
                statusMessage = (
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>No clinics scheduled yet.</Typography>
                    </Box>
                );
                break;
        }

        return (
            <Card sx={{ width: '100%' }}>
                <CardHeader
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    title={
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            {statusIcon}
                        </Box>
                    }
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {statusMessage}
                    </Typography>
                </CardContent>
            </Card>
        );
    };

    const shouldDisableDate = (date) => {
        const day = dayjs(date).day();
        const today = dayjs().startOf('day');
        return !(day === 1 || day === 2 || day === 4) || dayjs(date).isBefore(today);
    };

    return (
        <React.Fragment>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper
                                aria-label={'patient-details'}
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    height: 60,
                                }}
                            >
                                <Typography variant="body1">
                                    Patient ID: {patientDetails?.patient_id}
                                </Typography>
                                <Box display="flex" justifyContent="flex-end" alignItems="center">
                                    <Typography variant="body1" sx={{ mr: 3 }}>
                                        Name: {patientDetails?.first_name} {patientDetails?.last_name}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mr: 2 }}>
                                        NIC: {patientDetails?.nic}
                                    </Typography>
                                    <Button variant="contained" onClick={handleEditProfile}>
                                        Edit Profile
                                    </Button>

                                    <EditProfileModal
                                        open={openEditModal}
                                        onClose={handleCloseEditModal}
                                        patientDetails={patientDetails}
                                        onSave={handleSaveProfile}
                                        patientId={patientId}
                                    />
                                </Box>
                            </Paper>
                            <Paper
                                aria-label={'patient-appointment'}
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 220,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {renderAppointmentDetails()}
                            </Paper>
                            <Paper
                                aria-label={'patient-test'}
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 180,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {renderTestDetails()}
                            </Paper>
                            <Paper
                                aria-label={'patient-clinic'}
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 180,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {renderClinicDetails()}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="reschedule-modal-title"
                aria-describedby="reschedule-modal-description"
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
                    <Typography id="reschedule-modal-title" variant="h6" component="h2">
                        Reschedule Appointment
                    </Typography>
                    <Typography id="reschedule-modal-description" sx={{ mt: 2 }}>
                        Current Appointment: {appointmentDetails?.appointment_date}
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            sx={{ mt: 2 }}
                            label="Reschedule Date"
                            value={rescheduleDate}
                            shouldDisableDate={shouldDisableDate}
                            onChange={(newValue) => setRescheduleDate(newValue)}
                            renderInput={(params) => <TextField {...params} sx={{ mt: 2, width: '100%' }} />}
                        />
                    </LocalizationProvider>
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

export default PatientDashpage;
