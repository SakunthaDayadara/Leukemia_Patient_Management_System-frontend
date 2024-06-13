import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import { useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function AdminDoctorsTablee() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3000/doctors');
                if (!response.ok) {
                    throw new Error('Failed to fetch doctors');
                }
                const data = await response.json();
                setDoctors(data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

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
                                    { title: 'Doctor ID', field: 'doctor_id' },
                                    { title: 'Name', field: 'name' },
                                    { title: 'Username', field: 'username' },
                                ]}
                                data={doctors}
                                title="Doctors"
                                style={{ width: '100%' }}
                                options={{
                                    pageSize: 5,
                                    pageSizeOptions: [5, 10, 20],
                                }}
                                actions={[]}
                            />
                        </Paper>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
}

export default AdminDoctorsTablee;
