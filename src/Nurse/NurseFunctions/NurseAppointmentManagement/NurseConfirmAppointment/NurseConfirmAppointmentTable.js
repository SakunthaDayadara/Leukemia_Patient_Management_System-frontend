import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import { useNavigate } from "react-router-dom";

function NurseConfirmAppointmentTable() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await fetch("http://127.0.0.1:3000/appointments/confirm_appointment");
            const data = await response.json();
            setAppointments(data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    const handleDelete = async (rowData) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this appointment?');
        if (!isConfirmed) return;

        try {
            const response = await fetch(`http://127.0.0.1:3000/appointments/delete_by_appointment_id?appointment_id=${rowData.appointment_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                alert('Appointment deleted successfully!');
                fetchAppointments(); // Refresh the list of appointments
            } else {
                console.error('Failed to delete appointment:', response.statusText);
                alert('Failed to delete appointment');
            }
        } catch (error) {
            console.error('Error deleting appointment:', error);
            alert('Error deleting appointment');
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
                        { title: 'Appointment ID', field: 'appointment_id' },
                        { title: 'Appointment Date', field: 'appointment_date' },
                        { title: 'Patient ID', field: 'patient_id' }
                    ]}
                    data={appointments}
                    title="Appointments to Confirm"
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
                                navigate(`/nursedashboard/appointmentmanagement/confirmappointment/${rowData.appointment_id}`);
                                console.log('Edit appointment:', rowData);
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
        </React.Fragment>
    );
}

export default NurseConfirmAppointmentTable;
