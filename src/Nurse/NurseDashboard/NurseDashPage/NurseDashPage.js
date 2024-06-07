import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button, TextField, Typography, Card, CardContent, Modal, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function NurseDashPage() {
    const [patientKey, setPatientKey] = useState("");
    const [patientDetails, setPatientDetails] = useState(null);
    const [nurseId, setNurseId] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [selectedDateAppointments, setSelectedDateAppointments] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://127.0.0.1:3000/staffautologin', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (data.user_id) {
                    setNurseId(data.user_id);
                    fetchAppointments(data.user_id);
                } else {
                    alert('Failed to get user data.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchAppointments = async (nurseId) => {
            try {
                const response = await fetch(`http://127.0.0.1:3000/appointments/nurse_unfinished_appointments`);
                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchUserData();
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
            const response = await fetch(`http://127.0.0.1:3000/patients/find_by_patient_id_or_nic?key=${patientKey}`);
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

    const handleHistory = () => {
        navigate(`/nursedashboard/patienthistory/${patientDetails.patient_id}`);
    };

    function handleDateClick(date) {
        const appointmentsForDate = appointments.filter(appointment => dayjs(appointment.appointment_date).isSame(date, 'day'));
        setSelectedDate(date);
        setSelectedDateAppointments(appointmentsForDate);
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedDate(null);
        setSelectedDateAppointments([]);
    };

    const renderDay = (day, selectedDate, pickersDayProps) => {
        const isAppointmentDay = appointments.some(appointment => dayjs(appointment.appointment_date).isSame(day, 'day'));
        return (
            <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={isAppointmentDay ? '•' : undefined}
                color="secondary"
            >
                <Box
                    component="div"
                    sx={{
                        ...pickersDayProps.sx,
                        ...(isAppointmentDay && {
                            backgroundColor: 'lightgreen', // Highlight available dates
                            borderRadius: '50%',
                            color: '#000'
                        })
                    }}
                    {...pickersDayProps}
                >
                    {pickersDayProps.children}
                </Box>
            </Badge>
        );
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
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    height: '100%',
                                }}
                            >
                                <Typography id="modal-title" variant="h6" component="h2">
                                    Patient History
                                </Typography>

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
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleHistory}
                                            sx={{ mt: 1 }}>
                                            Patient History
                                        </Button>
                                    </>
                                )}

                                <Typography id="modal-title" variant="h6" component="h2" sx={{ mt: 4 }}>
                                    Ongoing/Scheduled Appointments
                                </Typography>

                                <Box sx={{ mt: 2 }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <StaticDatePicker
                                            displayStaticWrapperAs="desktop"
                                            openTo="day"
                                            value={selectedDate}
                                            onChange={(newValue) => handleDateClick(newValue)}
                                            renderInput={(params) => <TextField {...params} />}
                                            renderDay={renderDay}
                                            shouldDisableDate={(date) => !appointments.some(appointment => dayjs(appointment.appointment_date).isSame(date, 'day'))}
                                        />
                                    </LocalizationProvider>
                                </Box>

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
                                            Appointments for {selectedDate ? dayjs(selectedDate).format('MMMM D, YYYY') : ''}
                                        </Typography>
                                        <Box sx={{ mt: 2 }}>
                                            {selectedDateAppointments.map(appointment => (
                                                <Card key={appointment.appointment_id} sx={{ mb: 2 }}>
                                                    <CardContent>
                                                        <Typography variant="h6">
                                                            Patient: {appointment.patient_id}
                                                        </Typography>
                                                        <Typography>
                                                            Status: {appointment.appointment_status}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </Box>
                                        <Button onClick={handleCloseModal} sx={{ mt: 2 }} variant="contained" color="primary">
                                            Close
                                        </Button>
                                    </Box>
                                </Modal>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
}

export default NurseDashPage;
