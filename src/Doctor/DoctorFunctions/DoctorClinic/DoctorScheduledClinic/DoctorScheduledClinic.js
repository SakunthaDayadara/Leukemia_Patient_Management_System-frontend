import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import { useNavigate } from "react-router-dom";

function DoctorScheduledClinic() {
    const [doctorId, setDoctorId] = useState("");
    const [clinicData, setClinicData] = useState([]);
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
            } catch (error) {
                console.error('Error fetching doctor ID:', error);
            }
        };

        fetchDoctorId();
    }, []);

    useEffect(() => {
        if (doctorId) {
            const fetchClinics = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:3000/clinics/doctor_schedule_clinic_table?doctor_id=${doctorId}`);
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
    }, [doctorId]);

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
            console.error('Error deleting appointment:', error);
            alert("Error deleting clinic.");
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
                        { title: 'Last Clinic Date', field: 'last_clinic_date' },
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

export default DoctorScheduledClinic;
