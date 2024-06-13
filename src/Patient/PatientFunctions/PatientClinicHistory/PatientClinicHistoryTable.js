import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import { useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function PatientClinicHistoryTable() {
    const [patientId, setPatientId] = useState("");
    const [clinicData, setClinicData] = useState([]);


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

    useEffect(() => {
        if (patientId) {
            const fetchClinics = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clinics/clinic_by_patient_id?patient_id=${patientId}`);
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
            console.log(clinicData);
        }
    }, [patientId]);



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
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        height: '100%',
                                    }}
                                >
                                    <MaterialTable
                                        columns={[
                                            { title: 'Clinic Date', field: 'clinic_date' },
                                            { title: 'Clinic Type', field: 'clinic_type' },
                                            { title: 'Doctor ID', field: 'doctor_id' },
                                            { title: 'Clinic Note', field: 'clinic_notes' },
                                        ]}
                                        data={clinicData}
                                        title="Finished Clinics"
                                        style={{ width: '100%' }}
                                        options={{
                                            pageSize: 5,
                                            pageSizeOptions: [5, 10, 20],
                                        }}
                                        actions={[

                                        ]}
                                    />
                                </Paper>
                            </Grid>

                        </Container>

                </Box>
            </React.Fragment>
    );
}

export default PatientClinicHistoryTable;
