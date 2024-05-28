import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import {Link, Outlet, useNavigate} from "react-router-dom";


function NurseToAdmitTable() {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetchPatients();
    }, []); // Fetch patients when component mounts

    const fetchPatients = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patients/to_admit_table`);
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    const handleDelete = async (rowData) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this patient?');
        if (!isConfirmed) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patients/delete_by_patient_id?patient_id=${rowData.patient_id}`, {
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
                                navigate(`/nursedashboard/patientmanagement/toadmit/${rowData.patient_id}`);
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


        </React.Fragment>
    );
}

export default NurseToAdmitTable;
