import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import {useNavigate} from "react-router-dom";

function NursePatientManagement() {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetchPatients();
    }, []); // Fetch patients when component mounts

    const fetchPatients = async () => {
        try {
            const response = await fetch("http://127.0.0.1:3000/patients/temporary_patients");
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    const handleDelete = async (rowData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://127.0.0.1:3000/patients/delete_by_patient_id?patient_id=${rowData.patient_id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                // If successful, log the deletion and update the table
                console.log(`Successfully deleted patient with ID: ${rowData.patient_id}`);
                alert('Patient deleted successfully!');
                fetchPatients()
            } else {
                console.error('Failed to delete patient:', response.statusText);
                alert('Failed to delete patient');
            }
        } catch (error) {
            console.error('Error deleting patient:', error);
            alert('Error deleting patient');
        }
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
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column', // Change to column direction
                                alignItems: 'center',
                                height: '100%',
                            }}
                        >
                            <MaterialTable
                                columns={[
                                    { title: 'Patient ID', field: 'patient_id' },
                                    { title: 'Username', field: 'username' },
                                    { title: 'NIC', field: 'nic' },
                                    { title: 'Date of Birth', field: 'dob' },
                                    { title: 'Gender', field: 'gender' },
                                    { title: 'Address', field: 'address' },

                                ]}
                                data={patients}
                                title="Patients"
                                style={{ width: '100%' }}
                                components={{
                                   // Pagination: () => null, // Remove the pagination component
                                }}
                                options={{
                                    pageSize: 5,
                                    pageSizeOptions: [5, 10, 20],
                                }}

                                actions={[
                                    {
                                        icon: 'edit',
                                        tooltip: 'Edit Patient',
                                        onClick: (event, rowData) => {
                                            navigate(`/nursedashboard/confirmpatient/${rowData.patient_id}`);
                                            console.log('Edit patient:', rowData);
                                        }
                                    },
                                    {
                                        icon: 'delete',
                                        tooltip: 'Delete Patient',
                                        onClick: (event, rowData) => {
                                            handleDelete(rowData);
                                            console.log('Delete patient:', rowData);
                                        }
                                    }
                                ]}
                            />
                        </Paper>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
}

export default NursePatientManagement;
