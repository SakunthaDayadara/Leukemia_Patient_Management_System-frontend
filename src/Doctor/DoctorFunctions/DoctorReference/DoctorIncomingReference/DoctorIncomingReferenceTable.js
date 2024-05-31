import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import {Link, Outlet, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

function DoctorMakeReferenceTable() {
    const navigate = useNavigate();
    const [doctorId, setDoctorId] = useState("");
    const [references, setReferences] = useState([]);

    useEffect(() => {
        const fetchDoctorId = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No authorization token found');
                return;
            }

            try {
                const response = await fetch("http://127.0.0.1:3000/staffautologin", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setDoctorId(data.user_id);

                const referencesResponse = await fetch(`http://127.0.0.1:3000/references/doctor_incoming_references?referred_doctor_id=${data.user_id}`);
                const referencesData = await referencesResponse.json();
                setReferences(referencesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDoctorId();
    }, []);

    return (
        <React.Fragment>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column', // Change to column direction
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <MaterialTable
                    columns={[
                        { title: 'Reference ID', field: 'reference_id' },
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
                                navigate(`/doctordashboard/referral/incomingreferral/${rowData.reference_id}`);
                                console.log('Edit ref:', rowData);
                            }
                        }
                    ]}
                />
            </Paper>
        </React.Fragment>
    );
}

export default DoctorMakeReferenceTable;
