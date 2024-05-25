import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useAuth from "../../Hooks/useAuth";




const defaultTheme = createTheme();

export default function PatientRegister() {
    const { setAuth } = useAuth();

    const [gender, setGender] = useState("");// State to hold the selected gender
    const navigate = useNavigate();
    const handleGenderChange = (event) => {
        setGender(event.target.value);// Update the gender state when the value changes

    };

    const [selectedDate, setSelectedDate] = useState("2000-01-01"); // Initial selected date

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value); // Update selected date when the value changes
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const patientData = {
            patient: {
                dob: selectedDate,
                nic: formData.get('nic'),
                address: formData.get('address'),
                gender: gender,
                username: formData.get('username'),
                password: formData.get('password'),
                first_name: formData.get('firstName'),
                last_name: formData.get('lastName'),
                telephone: formData.get('telephone')
            }
        };

        try {
            console.log(patientData);
            const response = await fetch('${process.env.REACT_APP_BACKEND_URL}/patients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(patientData)
            });

            if (response.ok) {
                alert('Patient registered successfully. Please make an Appointment.');
                // Prepare login data
                const loginData = {
                    username: formData.get('username'),
                    password: formData.get('password')
                };

                // Perform login request
                const loginResponse = await fetch('${process.env.REACT_APP_BACKEND_URL}/patients/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                });

                if (loginResponse.ok) {
                    const loginResult = await loginResponse.json();
                    // Assuming the token is in loginResult.token
                    localStorage.setItem('token', loginResult.token);
                    setAuth({ isAuthenticated: true, role: loginResult.role, token: loginResult.token });
                    navigate(`/patientappointment/${loginResult.patient_id}`); // Redirect upon successful login
                } else {
                    console.error('Failed to login:', loginResponse.statusText);
                }
            } else {
                console.error('Failed to submit form:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel >Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="gender"
                                        label="Gender"
                                        value={gender}
                                        onChange={handleGenderChange}
                                    >
                                        <MenuItem value={"male"}>Male</MenuItem>
                                        <MenuItem value={"female"}>Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="dob"
                                    label="Date of Birth"
                                    type="date"
                                    value={selectedDate} // Set the value to the selected date
                                    onChange={handleDateChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="nic"
                                    label="NIC"
                                    id="nic"
                                    autoComplete="nic"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="address"
                                    label="Address"
                                    id="address"
                                    autoComplete="address"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="telephone"
                                    label="Telephone"
                                    id="telephone"
                                    autoComplete="telephone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/patientlogin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}