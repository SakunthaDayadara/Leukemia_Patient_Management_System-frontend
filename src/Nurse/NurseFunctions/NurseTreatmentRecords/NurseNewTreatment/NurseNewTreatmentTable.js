import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import {Link, Outlet, useNavigate} from "react-router-dom";


function NurseNewTreatmentTable() {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetchPatients();
    }, []); // Fetch patients when component mounts

    const fetchPatients = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patients/nurse_new_treatment_table`);
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };




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
                        { title: 'Patient ID', field: 'patient_id' },
                        { title: 'Username', field: 'username' },
                        { title: 'NIC', field: 'nic' },
                        { title: 'Date of Birth', field: 'dob' },
                        { title: 'Gender', field: 'gender' },
                        { title: 'Address', field: 'address' },

                    ]}
                    data={patients}
                    title="Patients"
                    style={{ width: '100%' }}
                    components={{
                        // Pagination: () => null, // Remove the pagination component
                    }}
                    options={{
                        pageSize: 5,
                        pageSizeOptions: [5, 10, 20],
                    }}

                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Patient',
                            onClick: (event, rowData) => {
                                navigate(`/nursedashboard/treatment/newtreatment/${rowData.patient_id}`);
                                console.log('Edit patient:', rowData);
                            }
                        }
                    ]}
                />
            </Paper>


        </React.Fragment>
    );
}

export default NurseNewTreatmentTable;
