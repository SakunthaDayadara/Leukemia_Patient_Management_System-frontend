import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import Button from "@mui/material/Button";

function DoctorPatientHistory() {
    const { patient_id } = useParams();



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
                                justifyContent: 'space-between', // Ensures the buttons are spaced out
                                height: 60,
                            }}
                        >
                            <Box sx={{ display: 'flex' }}>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    to={`/doctordashboard/patienthistory/${patient_id}`}
                                    sx={{ mr: 2 }}
                                >
                                    Tests
                                </Button>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    to={`/doctordashboard/patienthistory/${patient_id}/treatmenthistory`}
                                    sx={{ mr: 2 }}
                                >
                                    Treatment
                                </Button>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    to={`/doctordashboard/patienthistory/${patient_id}/clinichistory`}
                                    sx={{ mr: 2 }}
                                >
                                    Clinics
                                </Button>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    to={`/doctordashboard/patienthistory/${patient_id}/referralhistory`}
                                    sx={{ mr: 2 }}
                                >
                                    Referral
                                </Button>
                            </Box>
                            <Button
                                variant="contained"
                                color="error" // This will make the button red
                                component={Link}
                                to="/doctordashboard"
                                sx={{ ml: 'auto' }} // Align to the right
                            >
                                Back
                            </Button>
                        </Paper>

                        <Outlet context={{ patient_id }} />

                    </Grid>

                </Container>

            </Box>
        </React.Fragment>
    );
}

export default DoctorPatientHistory;
