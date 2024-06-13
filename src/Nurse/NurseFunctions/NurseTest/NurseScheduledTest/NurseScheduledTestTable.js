import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import { useNavigate } from "react-router-dom";

function NurseScheduledTestTable() {
    const [nurseId, setNurseId] = useState("");
    const [testData, setTestData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNurseId = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No authorization token found');
                return;
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/staffautologin`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setNurseId(data.user_id);
                fetchRequestedTests(data.user_id);
            } catch (error) {
                console.error('Error fetching nurse ID:', error);
            }
        };

        const fetchRequestedTests = async (nurseId) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tests/scheduled_tests`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setTestData(data);
            } catch (error) {
                console.error('Error fetching requested tests:', error);
            }
        };

        fetchNurseId();
    }, []);

    const handleDelete = async (rowData) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Test?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tests/${rowData.test_id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                setTestData((prevData) => prevData.filter((test) => test.test_id !== rowData.test_id));
                alert("Appointment deleted successfully.");
                console.log('Appointment deleted:', rowData);
            } else {
                console.error('Failed to delete appointment:', response.statusText);
                alert("Failed to delete appointment.");
            }
        } catch (error) {
            console.error('Error deleting appointment:', error);
            alert("Error deleting appointment.");
        }
    };

    return (
        <React.Fragment>
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
                        { title: 'Patient ID', field: 'patient_id' },
                        { title: 'Test Type', field: 'test_type' },
                        { title: 'Test Date', field: 'test_date' },
                        { title: 'Test Notes', field: 'test_notes' },
                        { title: 'Doctor ID', field: 'doctor_id' }
                    ]}
                    data={testData}
                    title="Tests to be Finished"
                    style={{ width: '100%' }}
                    options={{
                        pageSize: 5,
                        pageSizeOptions: [5, 10, 20],
                    }}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Appointment',
                            onClick: (event, rowData) => {
                                navigate(`/nursedashboard/test/scheduledtest/${rowData.test_id}`);
                                console.log('Edit appointment:', rowData);
                            }
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete Appointment',
                            onClick: (event, rowData) => {
                                handleDelete(rowData);
                                console.log('Delete appointment:', rowData);
                            }
                        }
                    ]}
                />
            </Paper>
        </React.Fragment>
    );
}

export default NurseScheduledTestTable;
