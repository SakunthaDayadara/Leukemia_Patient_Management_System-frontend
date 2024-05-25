import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useContext, useState} from "react";
import {Alert, AlertTitle} from "@mui/material";
import {useNavigate} from "react-router-dom";

import useAuth from "../../Hooks/useAuth";



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function PatientLogin() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {
            username: data.get('username'),
            password: data.get('password'),
        };

        try {
            console.log({
                email: data.get('email'),
                password: data.get('password'),
            });
            const response = await fetch('http://${process.env.REACT_APP_BACKEND_URL}/patients/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to login');
            }

            const responseData = await response.json();
            localStorage.setItem('token', responseData.token);
            setAuth({ isAuthenticated: true, role: responseData.role, token: responseData.token });
            // Navigate to the dashboard component or perform any other action after successful login
            // For example:
            navigate("/patientdashboard");

        } catch (error) {
            setError(error.message);
        }
    };




    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="User Name"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            {error && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    <AlertTitle>{error}</AlertTitle>
                                </Alert>
                            )}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/patientregister" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
