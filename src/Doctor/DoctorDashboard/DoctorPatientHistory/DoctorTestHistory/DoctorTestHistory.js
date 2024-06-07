import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import MaterialTable from 'material-table';
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {useOutletContext, useParams} from "react-router-dom";

function DoctorTestHistory() {
    const { patient_id } = useOutletContext();
    const [testData, setTestData] = useState([]);
    const [open, setOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState("");



    useEffect(() => {
        if (patient_id) {
            const fetchTest = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tests/test_by_patient_id?patient_id=${patient_id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch test records');
                    }
                    const data = await response.json();
                    console.log('Fetched test data:', data);  // Log fetched data
                    setTestData(data);
                } catch (error) {
                    console.error('Error fetching test records:', error);
                }
            };

            fetchTest();
        }
    }, [patient_id]);

    const handleOpenModal = (url) => {
        setPdfUrl(url);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setPdfUrl("");
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
                                    { title: 'Test ID', field: 'test_id' },
                                    { title: 'Test Type', field: 'test_type' },
                                    { title: 'Test Note', field: 'test_notes' },
                                    { title: 'Test Date', field: 'test_date' },
                                    { title: 'Report Date', field: 'report_date' },
                                    {
                                        title: 'Actions', field: 'actions', render: rowData => (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleOpenModal(rowData.report_url)}
                                                disabled={!rowData.report_url}
                                            >
                                                View Report
                                            </Button>
                                        )
                                    }
                                ]}
                                data={testData}
                                title="Finished Test"
                                style={{ width: '100%' }}
                                options={{
                                    pageSize: 5,
                                    pageSizeOptions: [5, 10, 20],
                                }}
                            />
                        </Paper>


            <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                <DialogTitle>Test Report</DialogTitle>
                <DialogContent>
                    {pdfUrl && (
                        <embed
                            src={pdfUrl}
                            type="application/pdf"
                            width="100%"
                            height="600px"
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default DoctorTestHistory;
