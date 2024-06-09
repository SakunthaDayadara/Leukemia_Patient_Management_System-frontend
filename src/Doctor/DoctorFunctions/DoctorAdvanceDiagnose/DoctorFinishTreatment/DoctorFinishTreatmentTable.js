import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import { Link, Outlet, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

function DoctorFinishTreatmentTable() {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
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

    const handleEdit = (rowData) => {
        setSelectedPatient(rowData);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedPatient(null);
    };

    const handleConfirm = async () => {
        if (!selectedPatient) return;

        const confirmFinish = window.confirm("Are you sure you want to finish treatment for this patient?");
        if (!confirmFinish) return;

        try {
            const response1 = await fetch(`http://127.0.0.1:3000/patients/doctor_finish_treatment`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ patient_id: selectedPatient.patient_id })
            });

            if (!response1.ok) {
                throw new Error('Failed to finish patient treatment');
            }

            const response2 = await fetch(`http://127.0.0.1:3000/treatment_plans/doctor_finish_treatment`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ patient_id: selectedPatient.patient_id })
            });

            if (!response2.ok) {
                throw new Error('Failed to finish treatment plan');
            }

            alert("Treatment finished successfully.");
            handleCloseModal();
            fetchPatients(); // Refresh the patient list
        } catch (error) {
            console.error('Error finishing treatment:', error);
            alert("Failed to finish treatment.");
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
                            onClick: (event, rowData) => {
                                handleEdit(rowData);
                                console.log('Edit patient:', rowData);
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
                        Finish Treatment
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Patient ID: {selectedPatient?.patient_id}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                        NIC: {selectedPatient?.nic}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                        Name: {selectedPatient?.first_name} {selectedPatient?.last_name}
                    </Typography>
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

export default DoctorFinishTreatmentTable;
