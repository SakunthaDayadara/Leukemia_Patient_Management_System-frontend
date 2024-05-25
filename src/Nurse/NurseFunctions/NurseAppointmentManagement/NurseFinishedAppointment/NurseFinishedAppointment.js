import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import { useNavigate } from "react-router-dom";

function NurseFinishedAppointment() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await fetch("${process.env.REACT_APP_BACKEND_URL}/appointments/finished_appointment");
            const data = await response.json();
            setAppointments(data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
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
                    title="Ongoing Appointments"
                    style={{ width: '100%' }}
                    options={{
                        pageSize: 5,
                        pageSizeOptions: [5, 10, 20],
                    }}

                />
            </Paper>
        </React.Fragment>
    );
}

export default NurseFinishedAppointment;
