import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import { InputLabel, TextField, Button, Box, InputAdornment } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../Util/firebase-config";

function NurseConfirmScheduledTest() {
    const { test_id } = useParams();
    const [pdfUpload, setPdfUpload] = useState(null);
    const [url, setUrl] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [reportDate, setReportDate] = useState(null);
    const [testDetails, setTestDetails] = useState({});
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setPdfUpload(event.target.files[0]);
    };

    const handleUpload = () => {
        if (pdfUpload == null) return;

        const pdfRef = ref(storage, `TestReports/${testDetails.patient_id}/${testDetails.test_type}/${test_id}Report`);
        uploadBytes(pdfRef, pdfUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setUrl(url);
                setUploadSuccess(true);
                alert("Test Report Upload Complete");
            });
        });
    };

    useEffect(() => {


        const fetchTestDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tests/find_by_test_id?test_id=${test_id}`);
                const data = await response.json();
                setTestDetails(data);
            } catch (error) {
                console.error('Error fetching test details:', error);
            }
        };


        fetchTestDetails();
    }, [test_id]);

    const handleConfirm = async () => {
        if (!reportDate || !url) {
            alert("Please select a report date and upload the report.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tests/nurse_make_test_finished`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    test_id: test_id,
                    report_date: reportDate.toISOString(),
                    report_url: url
                })
            });

            if (response.ok) {
                alert("Test report confirmed successfully.");
                navigate("/nursedashboard/test/scheduledtest");
            } else {
                alert("Failed to confirm the test report.");
            }
        } catch (error) {
            console.error('Error confirming test report:', error);
            alert("Failed to confirm the test report.");
        }
    };

    const handleBack = () => {
        navigate("/nursedashboard/test/scheduledtest");
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
                <InputLabel htmlFor="file-upload" style={{ marginTop: '8px' }}>
                    Upload Test Report
                </InputLabel>
                <TextField
                    fullWidth
                    disabled
                    value={pdfUpload ? pdfUpload.name : ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Button component="label">
                                    Choose File
                                    <input type="file" accept=".pdf" onChange={handleFileChange} hidden />
                                </Button>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    variant="contained"
                                    onClick={handleUpload}
                                    color={uploadSuccess ? "success" : "primary"}
                                >
                                    {uploadSuccess ? "Uploaded" : "Upload"}
                                </Button>
                            </InputAdornment>
                        )
                    }}
                    style={{ marginTop: '8px' }}
                />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <InputLabel
                        htmlFor="report_date"
                        style={{ marginTop: '8px' }}
                    >
                        Select Report Date
                    </InputLabel>
                    <DatePicker
                        required
                        fullWidth
                        id="report_date"
                        label="Select Report Date"
                        value={reportDate}
                        onChange={(newValue) => setReportDate(newValue)}
                        sx={{ width: '100%', marginTop: '8px' }} // Set custom width and margin-top
                    />
                </LocalizationProvider>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '16px' }}>
                    <Button variant="contained" color="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleBack}>
                        Back
                    </Button>
                </Box>
            </Paper>
        </React.Fragment>
    );
}

export default NurseConfirmScheduledTest;
