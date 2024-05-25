import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Link, Outlet, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

function NurseAppointmentManagement() {



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
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: 60,
                            }}
                        >
                            <Button variant="contained" component={Link} to="/nursedashboard/appointmentmanagement" sx={{ mr: 2 }}>
                                Confirm Appointments
                            </Button>
                            <Button variant="contained" component={Link} to="/nursedashboard/appointmentmanagement/rescheduleappointment" sx={{ mr: 2 }}>
                                Reschedule Appointments
                            </Button>
                            <Button variant="contained" component={Link} to="/nursedashboard/appointmentmanagement/ongoingappointment" sx={{ mr: 2 }}>
                                Ongoing Appointments
                            </Button>
                            <Button variant="contained" component={Link} to="/nursedashboard/appointmentmanagement/finishedappointment" >
                                Finished Appointments
                            </Button>
                        </Paper>

                        <Outlet />

                    </Grid>

                </Container>

            </Box>
        </React.Fragment>
    );
}

export default NurseAppointmentManagement;
