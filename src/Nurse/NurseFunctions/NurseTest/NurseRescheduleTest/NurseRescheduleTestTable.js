import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";

function NurseRescheduleTestTable() {
    const [nurseId, setNurseId] = useState("");
    const [testData, setTestData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [newTestDate, setNewTestDate] = useState(null);
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

    const handleEdit = (rowData) => {
        setSelectedTest(rowData);
        setNewTestDate(dayjs(rowData.test_date));
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedTest(null);
        setNewTestDate(null);
    };

    const handleConfirm = async () => {
        if (!newTestDate) {
            alert("Please select a new test date.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tests/nurse_reschedule_test`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    test_id: selectedTest.test_id,
                    test_date: newTestDate.format('YYYY-MM-DD')
                })
            });

            if (response.ok) {
                alert("Test rescheduled successfully.");
                setTestData(prevData => prevData.map(test =>
                    test.test_id === selectedTest.test_id ? { ...test, test_date: newTestDate.format('YYYY-MM-DD') } : test
                ));
                handleCloseModal();
            } else {
                console.error('Failed to reschedule test:', response.statusText);
                alert("Failed to reschedule test.");
            }
        } catch (error) {
            console.error('Error rescheduling test:', error);
            alert("Error rescheduling test.");
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
                    title="Tests to Reschedule"
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
                                handleEdit(rowData);
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

            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Reschedule Test
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Test ID: {selectedTest?.test_id}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                        Patient ID: {selectedTest?.patient_id}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                        Test Type: {selectedTest?.test_type}
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            openTo="day"
                            value={newTestDate}
                            disablePast
                            onChange={(newValue) => setNewTestDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button variant="contained" color="primary" onClick={handleConfirm}>
                            Confirm
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                            Back
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default NurseRescheduleTestTable;
