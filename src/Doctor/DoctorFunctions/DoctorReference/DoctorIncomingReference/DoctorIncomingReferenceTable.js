import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function DoctorMakeReferenceTable() {
    const navigate = useNavigate();
    const [doctorId, setDoctorId] = useState("");
    const [references, setReferences] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedReference, setSelectedReference] = useState(null);
    const [referredDoctorNotes, setReferredDoctorNotes] = useState("");

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

                const referencesResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/references/doctor_incoming_references?referred_doctor_id=${data.user_id}`);
                const referencesData = await referencesResponse.json();
                setReferences(referencesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDoctorId();
    }, []);

    const handleEditClick = (rowData) => {
        setSelectedReference(rowData);
        setReferredDoctorNotes("");
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedReference(null);
    };

    const handleConfirmClick = async () => {
        if (!referredDoctorNotes) {
            alert("Referred doctor notes cannot be empty.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/references/doctor_make_reference_done`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reference_id: selectedReference.reference_id,
                    referred_doctor_notes: referredDoctorNotes,
                }),
            });

            if (response.ok) {
                alert("Reference updated successfully.");
                handleCloseModal();
                // Optionally, refresh the data
                const referencesResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/references/doctor_incoming_references?referred_doctor_id=${doctorId}`);
                const referencesData = await referencesResponse.json();
                setReferences(referencesData);
            } else {
                alert("Failed to update the reference.");
            }
        } catch (error) {
            console.error('Error updating reference:', error);
            alert("Error updating reference.");
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
                        { title: 'Referral ID', field: 'reference_id' },
                        { title: 'Reference Note', field: 'reference_note' },
                        { title: 'Patient ID', field: 'patient_id' },
                    ]}
                    data={references}
                    title="Incoming Referral"
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
                                handleEditClick(rowData);
                            }
                        }
                    ]}
                />
            </Paper>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px',
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2">
                        Edit Referral
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        Referral ID: {selectedReference?.reference_id}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Patient ID: {selectedReference?.patient_id}
                    </Typography>
                    <TextField
                        label="Referred Doctor Notes"
                        variant="outlined"
                        fullWidth
                        value={referredDoctorNotes}
                        onChange={(e) => setReferredDoctorNotes(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="primary" onClick={handleConfirmClick}>
                            Confirm
                        </Button>
                        <Button variant="outlined" onClick={handleCloseModal}>
                            Back
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default DoctorMakeReferenceTable;
