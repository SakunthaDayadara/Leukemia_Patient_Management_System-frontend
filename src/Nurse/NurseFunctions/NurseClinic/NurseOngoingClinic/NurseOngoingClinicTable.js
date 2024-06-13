import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import { useNavigate } from "react-router-dom";
import { Modal, Box, Typography, Button } from "@mui/material";

function NurseScheduledClinicTable() {
    const [nurseId, setNurseId] = useState("");
    const [clinicData, setClinicData] = useState([]);
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
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clinics/nurse_on_going_clinic_table`);
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
                            icon: 'delete',
                            tooltip: 'Delete Clinic Schedule',
                            onClick: (event, rowData) => {
                                handleDelete(rowData);
                            }
                        }
                    ]}
                />
            </Paper>

        </React.Fragment>
    );
}

export default NurseScheduledClinicTable;
