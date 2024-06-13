import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import { useNavigate } from "react-router-dom";
import { Modal, Box, Typography, Button } from "@mui/material";

function NurseScheduledClinicTable() {
    const [nurseId, setNurseId] = useState("");
    const [clinicData, setClinicData] = useState([]);
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
            } catch (error) {
                console.error('Error fetching nurse ID:', error);
            }
        };

        fetchNurseId();
    }, []);

    useEffect(() => {
        if (nurseId) {
            const fetchClinics = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clinics/nurse_schedule_clinic_table`);
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
        }
    }, [nurseId]);

    const handleDelete = async (rowData) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Clinic Schedule?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clinics/${rowData.clinic_id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                alert("Clinic deleted successfully.");
                setClinicData(prevData => prevData.filter(clinic => clinic.clinic_id !== rowData.clinic_id));
            } else {
                console.error('Failed to delete appointment:', response.statusText);
                alert("Failed to delete clinic.");
            }
        } catch (error) {
            console.error('Error deleting clinic:', error);
            alert("Error deleting appointment.");
        }
    };

    const handleEdit = (rowData) => {
        setSelectedClinic(rowData);
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clinics/nurse_make_clinic_ongoing`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ clinic_id: selectedClinic.clinic_id, nurse_id: nurseId })
            });
            if (response.ok) {
                alert("Clinic status updated successfully.");
                setIsModalOpen(false);
                // Reload the clinic data
                const fetchClinics = async () => {
                    try {
                        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clinics/nurse_schedule_clinic_table`);
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
            } else {
                console.error('Failed to update clinic status:', response.statusText);
                alert("Failed to update clinic status.");
            }
        } catch (error) {
            console.error('Error updating clinic status:', error);
            alert("Error updating clinic status.");
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
                        { title: 'Clinic Date', field: 'clinic_date' },
                        { title: 'Clinic Type', field: 'clinic_type' },
                        { title: 'Doctor ID', field: 'doctor_id' },
                    ]}
                    data={clinicData}
                    title="Scheduled Clinics"
                    style={{ width: '100%' }}
                    options={{
                        pageSize: 5,
                        pageSizeOptions: [5, 10, 20],
                    }}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Clinic',
                            onClick: (event, rowData) => {
                                handleEdit(rowData);
                                console.log('Edit clinic:', rowData);
                            }
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete Clinic Schedule',
                            onClick: (event, rowData) => {
                                handleDelete(rowData);
                            }
                        }
                    ]}
                />
            </Paper>
            {selectedClinic && (
                <Modal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit Clinic
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Patient ID: {selectedClinic.patient_id}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Doctor ID: {selectedClinic.doctor_id}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Clinic Date: {selectedClinic.clinic_date}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Clinic Type: {selectedClinic.clinic_type}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                            <Button variant="contained" color="primary" onClick={handleConfirm}>
                                Confirm
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => setIsModalOpen(false)}>
                                Back
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            )}
        </React.Fragment>
    );
}

export default NurseScheduledClinicTable;
