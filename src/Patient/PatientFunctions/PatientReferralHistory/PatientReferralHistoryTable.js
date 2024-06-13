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
    const [references, setReferences] = useState([]);

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
        const fetchReferences = async () => {
            if (!patientId) return;

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/references/find_by_patient_id?patient_id=${patientId}`);
                const data = await response.json();
                setReferences(data);
            } catch (error) {
                console.error('Error fetching patient references:', error);
            }
        };

        fetchReferences();
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
                                    { title: 'Referred By', field: 'doctor_id' },
                                    { title: 'Reference Note', field: 'reference_note' },
                                    { title: 'Referred To', field: 'referred_doctor_id' },
                                    { title: 'Referred Doctor Note', field: 'referred_doctor_notes' },
                                ]}
                                data={references}
                                title="Finished Referrals"
                                style={{ width: '100%' }}
                                options={{
                                    pageSize: 5,
                                    pageSizeOptions: [5, 10, 20],
                                }}
                            />
                        </Paper>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
}

export default PatientClinicHistoryTable;
