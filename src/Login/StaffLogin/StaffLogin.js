import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import {Alert, AlertTitle} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Container from "@mui/material/Container";
import useAuth from "../../Hooks/useAuth";





const defaultTheme = createTheme();

export default function StaffLogin() {
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
                username: data.get('username'),
                password: data.get('password'),
            });
            const response = await fetch('http://${process.env.REACT_APP_BACKEND_URL}/stafflogin', {
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
            const { role } = responseData;
            setAuth({ isAuthenticated: true, role: responseData.role, token: responseData.token });
            // Determine which dashboard route to navigate based on role
            if (role === 'admin') {
                navigate("/admindashboard");
            } else if (role === 'doctor') {
                navigate("/doctordashboard");
            } else if (role === 'nurse') {
                navigate("/nursedashboard");
            }else {
                // Handle other roles or scenarios
            }

        } catch (error) {
            setError(error.message);
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

                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Verify your Account"}
                                </Link>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}
