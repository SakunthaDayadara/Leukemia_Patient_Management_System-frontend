import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import { useNavigate } from "react-router-dom";
import { Modal, Box, Button, Typography, TextField } from "@mui/material";

function NursePendingTreatmentTable() {
    const navigate = useNavigate();
    const [nurseId, setNurseId] = useState("");
    const [treatments, setTreatments] = useState([]);
    const [selectedTreatment, setSelectedTreatment] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

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

                const treatmentResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/treatment_records/find_by_nurse_id?nurse_id=${data.user_id}`);
                const treatmentData = await treatmentResponse.json();
                setTreatments(treatmentData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchNurseId();
    }, []);

    const handleEditClick = (rowData) => {
        setSelectedTreatment(rowData);
        setModalOpen(true);
    };

    const handleConfirm = async () => {
        if (!selectedTreatment) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/treatment_records/nurse_confirm_treatment_record`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ treatment_record_id: selectedTreatment.treatment_record_id })
            });

            if (response.ok) {
                alert('Treatment confirmed successfully');
                setModalOpen(false);
                // Refresh the treatments list
                const treatmentResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/treatment_records/find_by_nurse_id?nurse_id=${nurseId}`);
                const treatmentData = await treatmentResponse.json();
                setTreatments(treatmentData);
            } else {
                alert('Error confirming treatment');
            }
        } catch (error) {
            console.error('Error confirming treatment:', error);
            alert('Error confirming treatment');
        }
    };

    const handleBack = () => {
        setModalOpen(false);
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
                        { title: 'Treatment Date', field: 'treatment_date' },
                        { title: 'Treatment Notes', field: 'treatment_notes' },
                        { title: 'Last Treatment Date', field: 'last_treatment_date' }
                    ]}
                    data={treatments}
                    title="Treatments"
                    style={{ width: '100%' }}
                    options={{
                        pageSize: 5,
                        pageSizeOptions: [5, 10, 20],
                    }}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Treatment',
                            onClick: (event, rowData) => {
                                handleEditClick(rowData);
                            }
                        }
                    ]}
                />
            </Paper>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirm Treatment
                    </Typography>
                    {selectedTreatment && (
                        <div>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Patient ID: {selectedTreatment.patient_id}
                            </Typography>
                            <TextField
                                label="Treatment Notes"
                                multiline
                                rows={4}
                                value={selectedTreatment.treatment_notes}
                                variant="outlined"
                                fullWidth
                                sx={{ mt: 2 }}
                                disabled
                            />
                        </div>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleConfirm}>
                            Confirm
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleBack}>
                            Back
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default NursePendingTreatmentTable;
