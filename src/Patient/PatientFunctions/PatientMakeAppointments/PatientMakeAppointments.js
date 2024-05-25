import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import './NurseMakeAppointments.css';

const defaultTheme = createTheme();

export default function PatientMakeAppointments() {
    const { patient_id } = useParams();
    const [selectedDate, setSelectedDate] = useState(null);
    const [gender, setGender] = useState('');
    const [appointments, setAppointments] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch patient gender
        const fetchPatientData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patients/find_by_patient_id?patient_id=${patient_id}`);
                const data = await response.json();
                setGender(data.gender);
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };

        fetchPatientData();
    }, [patient_id]);

    const handleDateChange = async (date) => {
        setSelectedDate(date);
        if (gender) {
            try {
                const formattedDate = dayjs(date).format('YYYY-MM-DD');
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/appointments/find_by_date_and_patient_gender?date=${formattedDate}&gender=${gender}`);
                const data = await response.json();
                setAppointments((prevAppointments) => ({
                    ...prevAppointments,
                    [formattedDate]: data
                }));

                if (data.length >= 10) {
                    alert('Maximum appointment number is already full');
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedDate) {
            alert("Please select a date");
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert("No authorization token found. Please log in again.");
            navigate('/patientlogin');
            return;
        }

        const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
        const dayAppointments = appointments[formattedDate] || [];

        if (dayAppointments.length >= 10) {
            alert('Maximum appointment number is already full for this day. Please select another date.');
            return;
        }

        const appointmentData = {
            appointment: {
                appointment_date: formattedDate,
                patient_id: patient_id
            }
        };

        try {
            const response = await fetch('${process.env.REACT_APP_BACKEND_URL}/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(appointmentData)
            });

            if (response.ok) {
                alert('Appointment successfully made.');
                navigate(`/patientdashboard`);
            } else {
                console.error('Failed to make appointment:', response.statusText);
                alert('Failed to make appointment.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    // Function to disable dates that are not Monday, Tuesday, or Thursday
    const shouldDisableDate = (date) => {
        const day = dayjs(date).day();
        // Allow only Monday (1), Tuesday (2), or Thursday (4)
        return !(day === 1 || day === 2 || day === 4);
    };

    // Function to determine if a date should be marked red or green
    const getDayClassName = (date) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        const dayAppointments = appointments[formattedDate] || [];
        if (dayAppointments.length >= 10) {
            return 'red-day';
        } else if (dayAppointments.length > 0) {
            return 'green-day';
        }
        return '';
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Make an Appointment
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <DateCalendar
                                    onChange={handleDateChange}
                                    shouldDisableDate={shouldDisableDate}
                                    renderDay={(day, _value, DayComponentProps) => {
                                        const dayClassName = getDayClassName(day);
                                        const selectedDate = dayjs(selectedDate).format('YYYY-MM-DD');
                                        const isCurrentDate = dayjs(day).format('YYYY-MM-DD') === selectedDate;
                                        const className = `${dayClassName} MuiPickersDay-${isCurrentDate ? 'red' : 'green'}`;
                                        return (
                                            <div className={className}>
                                                <PickersDay {...DayComponentProps} />
                                            </div>
                                        );
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
