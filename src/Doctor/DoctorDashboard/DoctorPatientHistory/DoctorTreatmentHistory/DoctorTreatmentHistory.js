import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import {useNavigate, useOutletContext} from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function DoctorTreatmentHistory() {
    const { patient_id } = useOutletContext();
    const [treatmentData, setTreatmentData] = useState([]);



    useEffect(() => {
        if (patient_id) {
            const fetchTest = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/treatment_records/treatment_records_by_patient_id?patient_id=${patient_id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch treatment records');
                    }
                    const data = await response.json();
                    setTreatmentData(data);
                } catch (error) {
                    console.error('Error fetching treatment records:', error);
                }
            };

            fetchTest();
            console.log(treatmentData);
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
                                    { title: 'Treatment ID', field: 'treatment_record_id' },
                                    { title: 'Treatment Date', field: 'treatment_date' },
                                    { title: 'Treatment Note', field: 'treatment_notes' },
                                    { title: 'Nurse ID', field: 'nurse_id' },
                                ]}
                                data={treatmentData}
                                title="Finished Treatments"
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

export default DoctorTreatmentHistory;
