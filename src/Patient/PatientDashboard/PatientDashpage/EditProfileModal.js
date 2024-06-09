import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EditProfileModal = ({ open, onClose, patientDetails, onSave, patientId }) => {
    const [firstName, setFirstName] = useState(patientDetails?.first_name || '');
    const [lastName, setLastName] = useState(patientDetails?.last_name || '');
    const [address, setAddress] = useState(patientDetails?.address || '');
    const [nic, setNic] = useState(patientDetails?.nic || '');
    const [telephone, setTelephone] = useState(patientDetails?.telephone || '');

    const handleSave = async () => {
        // Replace empty values with existing values from patientDetails
        const updatedFirstName = firstName || patientDetails.first_name;
        const updatedLastName = lastName || patientDetails.last_name;
        const updatedAddress = address || patientDetails.address;
        const updatedNic = nic || patientDetails.nic;
        const updatedTelephone = telephone || patientDetails.telephone;

        // Fetch existing patients to check for NIC or telephone conflicts
        try {
            const response = await fetch('http://127.0.0.1:3000/patients');
            const existingPatients = await response.json();

            // Check for NIC or telephone conflicts
            const nicConflict = existingPatients.some(patient => patient.nic === updatedNic && patient.patient_id !== patientId);
            const telephoneConflict = existingPatients.some(patient => patient.telephone === updatedTelephone && patient.patient_id !== patientId);

            if (nicConflict || telephoneConflict) {
                alert('NIC or telephone number already exists.');
                return;
            }

            // If no conflicts, send a PATCH request to update patient details
            const updateResponse = await fetch('http://127.0.0.1:3000/patients/update_patient', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patient_id: patientId,
                    first_name: updatedFirstName,
                    last_name: updatedLastName,
                    address: updatedAddress,
                    nic: updatedNic,
                    telephone: updatedTelephone,
                }),
            });

            if (updateResponse.ok) {
                alert('Profile updated successfully.');
                onSave({
                    firstName: updatedFirstName,
                    lastName: updatedLastName,
                    address: updatedAddress,
                    nic: updatedNic,
                    telephone: updatedTelephone,
                    patientId,
                });
                onClose();
            } else {
                alert('Failed to update profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="edit-profile-modal-title"
            aria-describedby="edit-profile-modal-description"
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
                <Typography id="edit-profile-modal-title" variant="h6" component="h2">
                    Edit Profile
                </Typography>
                <TextField
                    sx={{ mt: 2, width: '100%' }}
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    sx={{ mt: 2, width: '100%' }}
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    sx={{ mt: 2, width: '100%' }}
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <TextField
                    sx={{ mt: 2, width: '100%' }}
                    label="NIC"
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                />
                <TextField
                    sx={{ mt: 2, width: '100%' }}
                    label="Telephone"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditProfileModal;
