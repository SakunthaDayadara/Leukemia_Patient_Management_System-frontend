import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';

function DoctorPauseTreatmentTable() {
    const [patients, setPatients] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        fetchPatients();
    }, []); // Fetch patients when component mounts

    const fetchPatients = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patients/doctor_change_category_treatment_table`);
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    const handleEditClick = (patient) => {
        setSelectedPatient(patient);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPatient(null);
    };

    const handleConfirm = async () => {
        try {
            const patientId = selectedPatient.patient_id;
            const response1 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patients/doctor_make_treatment_pause`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ patient_id: patientId })
            });

            const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/treatment_plans/doctor_pause_treatment`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ patient_id: patientId })
            });

            if (response1.ok && response2.ok) {
                alert('Treatment status updated successfully');
                handleClose();
                fetchPatients(); // Refresh the patients data
            } else {
                alert('Error updating treatment status');
            }
        } catch (error) {
            console.error("Error updating treatment status:", error);
            alert('Error updating treatment status');
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
                        { title: 'Username', field: 'username' },
                        { title: 'NIC', field: 'nic' },
                        { title: 'Date of Birth', field: 'dob' },
                        { title: 'Gender', field: 'gender' },
                        { title: 'Address', field: 'address' },
                    ]}
                    data={patients}
                    title="Patients"
                    style={{ width: '100%' }}
                    options={{
                        pageSize: 5,
                        pageSizeOptions: [5, 10, 20],
                    }}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Patient',
                            onClick: (event, rowData) => handleEditClick(rowData)
                        }
                    ]}
                />
            </Paper>
            <Modal
                open={open}
                onClose={handleClose}
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
                    p: 4
                }}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Confirm Treatment Pause
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        Patient ID: {selectedPatient?.patient_id}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Treatment Status: Ongoing
                    </Typography>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="secondary" onClick={handleClose}>
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleConfirm}>
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default DoctorPauseTreatmentTable;
