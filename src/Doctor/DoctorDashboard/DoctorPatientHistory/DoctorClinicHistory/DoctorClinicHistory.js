import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import {useNavigate, useOutletContext} from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function DoctorClinicHistory() {
    const { patient_id } = useOutletContext();
    const [clinicData, setClinicData] = useState([]);




    useEffect(() => {
        if (patient_id) {
            const fetchClinics = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clinics/clinic_by_patient_id?patient_id=${patient_id}`);
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
            console.log(clinicData);
        }
    }, [patient_id]);



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
                                    { title: 'Clinic Date', field: 'clinic_date' },
                                    { title: 'Clinic Type', field: 'clinic_type' },
                                    { title: 'Doctor ID', field: 'doctor_id' },
                                    { title: 'Clinic Note', field: 'clinic_notes' },
                                ]}
                                data={clinicData}
                                title="Finished Clinics"
                                style={{ width: '100%' }}
                                options={{
                                    pageSize: 5,
                                    pageSizeOptions: [5, 10, 20],
                                }}
                                actions={[

                                ]}
                            />
                        </Paper>

        </React.Fragment>
    );
}

export default DoctorClinicHistory;
