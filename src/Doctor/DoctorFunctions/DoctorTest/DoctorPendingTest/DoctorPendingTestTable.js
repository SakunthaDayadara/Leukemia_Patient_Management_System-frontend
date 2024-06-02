import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import { useNavigate } from "react-router-dom";

function DoctorPendingTestTable() {
    const [doctorId, setDoctorId] = useState("");
    const [testData, setTestData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctorId = async () => {
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
                setDoctorId(data.user_id);
                fetchRequestedTests(data.user_id);
            } catch (error) {
                console.error('Error fetching doctor ID:', error);
            }
        };

        const fetchRequestedTests = async (doctorId) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tests/doctor_pending_test?doctor_id=${doctorId}`, {
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

        fetchDoctorId();
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
                alert("Test deleted successfully.");
                console.log('Test deleted:', rowData);
            } else {
                console.error('Failed to delete test:', response.statusText);
                alert("Failed to delete test.");
            }
        } catch (error) {
            console.error('Error deleting test:', error);
            alert("Error deleting test.");
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
                        { title: 'Test Notes', field: 'test_notes' },
                        { title: 'Doctor ID', field: 'doctor_id' }
                    ]}
                    data={testData}
                    title="Pending Tests"
                    style={{ width: '100%' }}
                    options={{
                        pageSize: 5,
                        pageSizeOptions: [5, 10, 20],
                    }}
                    actions={[
                        {
                            icon: 'delete',
                            tooltip: 'Delete Test',
                            onClick: (event, rowData) => {
                                handleDelete(rowData);
                                console.log('Delete test:', rowData);
                            }
                        }
                    ]}
                />
            </Paper>
        </React.Fragment>
    );
}

export default DoctorPendingTestTable;
