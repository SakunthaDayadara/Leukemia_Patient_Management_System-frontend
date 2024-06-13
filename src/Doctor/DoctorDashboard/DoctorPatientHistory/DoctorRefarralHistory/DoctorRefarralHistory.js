import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import {useNavigate, useOutletContext} from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function DoctorRefarralHistory() {
    const { patient_id } = useOutletContext();
    const [references, setReferences] = useState([]);



    useEffect(() => {
        const fetchReferences = async () => {
            if (!patient_id) return;

            try {
                const response = await fetch(`http://127.0.0.1:3000/references/find_by_patient_id?patient_id=${patient_id}`);
                const data = await response.json();
                setReferences(data);
            } catch (error) {
                console.error('Error fetching patient references:', error);
            }
        };

        fetchReferences();
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
                                    { title: 'Referred By', field: 'doctor_id' },
                                    { title: 'Reference Note', field: 'reference_note' },
                                    { title: 'Referred To', field: 'referred_doctor_id' },
                                    { title: 'Referred Doctor Note', field: 'referred_doctor_notes' },
                                ]}
                                data={references}
                                title="Finished Referrals"
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

export default DoctorRefarralHistory;
