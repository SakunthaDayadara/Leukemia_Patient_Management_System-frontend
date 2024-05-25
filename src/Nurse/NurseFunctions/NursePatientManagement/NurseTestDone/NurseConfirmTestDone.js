import React, { useState } from 'react';
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import { InputAdornment, InputLabel, TextField, Button, Box } from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../Util/firebase-config";

function NurseConfirmTestDone() {
    const { patient_id } = useParams();
    const navigate = useNavigate();
    const [pdfUploadFBC, setPdfUploadFBC] = useState(null);
    const [pdfUploadBP, setPdfUploadBP] = useState(null);
    const [pdfUploadBMT, setPdfUploadBMT] = useState(null);
    const [fbcUrl, setFbcUrl] = useState("");
    const [bpUrl, setBpUrl] = useState("");
    const [bmtUrl, setBmtUrl] = useState("");
    const [uploadSuccessFBC, setUploadSuccessFBC] = useState(false);
    const [uploadSuccessBP, setUploadSuccessBP] = useState(false);
    const [uploadSuccessBMT, setUploadSuccessBMT] = useState(false);

    const handleFileChangeFBC = (event) => {
        setPdfUploadFBC(event.target.files[0]);
    };

    const handleFileChangeBP = (event) => {
        setPdfUploadBP(event.target.files[0]);
    };

    const handleFileChangeBMT = (event) => {
        setPdfUploadBMT(event.target.files[0]);
    };

    const handleUploadFBC = () => {
        if (pdfUploadFBC == null) return;

        const pdfRef = ref(storage, `InitialTestReports/FullBloodCount/${patient_id}/${patient_id}FBC`);
        uploadBytes(pdfRef, pdfUploadFBC).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setFbcUrl(url);
                setUploadSuccessFBC(true);
                alert("Full Blood Count Report Upload Complete");
            });
        });
    };

    const handleUploadBP = () => {
        if (pdfUploadBP == null) return;

        const pdfRef = ref(storage, `InitialTestReports/BloodPicture/${patient_id}/${patient_id}BP`);
        uploadBytes(pdfRef, pdfUploadBP).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setBpUrl(url);
                setUploadSuccessBP(true);
                alert("Blood Picture Report Upload Complete");
            });
        });
    };

    const handleUploadBMT = () => {
        if (pdfUploadBMT == null) return;

        const pdfRef = ref(storage, `InitialTestReports/BoneMarrowTest/${patient_id}/${patient_id}BMT`);
        uploadBytes(pdfRef, pdfUploadBMT).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setBmtUrl(url);
                setUploadSuccessBMT(true);
                alert("Bone Marrow Test Report Upload Complete");
            });
        });
    };

    const handleConfirm = async () => {
        if (!fbcUrl || !bpUrl || !bmtUrl) {
            alert("Please upload all test results before confirming.");
            return;
        }

        const token = localStorage.getItem('token');
        console.log({ patient_id, bmtUrl, fbcUrl, bpUrl });
        try {
            const response1 = await fetch("http://127.0.0.1:3000/patients/make_to_diagnose", {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ patient_id })
            });

            if (!response1.ok) {
                throw new Error('Failed to update patient to diagnose');
            }

            const response2 = await fetch("http://127.0.0.1:3000/appointments/nurse_make_to_diagnose", {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patient_id,
                    bmt_report: bmtUrl,
                    fbc_report: fbcUrl,
                    bp_report: bpUrl
                })
            });

            if (!response2.ok) {
                throw new Error('Failed to update appointment to diagnose');
            }

            alert("Reports uploaded successfully.");
            navigate("/nursedashboard/patientmanagement/testdone");
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting the reports. Please try again.');
        }
    };

    const handleBack = () => {
        navigate("/nursedashboard/patientmanagement/testdone");
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
                    Upload Full Blood Count Report
                </InputLabel>
                <TextField
                    fullWidth
                    disabled
                    value={pdfUploadFBC ? pdfUploadFBC.name : ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Button component="label">
                                    Choose File
                                    <input type="file" accept=".pdf" onChange={handleFileChangeFBC} hidden />
                                </Button>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    variant="contained"
                                    onClick={handleUploadFBC}
                                    color={uploadSuccessFBC ? "success" : "primary"}
                                >
                                    {uploadSuccessFBC ? "Uploaded" : "Upload"}
                                </Button>
                            </InputAdornment>
                        )
                    }}
                    style={{ marginTop: '8px' }}
                />

                <InputLabel htmlFor="file-upload" style={{ marginTop: '8px' }}>
                    Upload Blood Picture Report
                </InputLabel>
                <TextField
                    fullWidth
                    disabled
                    value={pdfUploadBP ? pdfUploadBP.name : ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Button component="label">
                                    Choose File
                                    <input type="file" accept=".pdf" onChange={handleFileChangeBP} hidden />
                                </Button>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    variant="contained"
                                    onClick={handleUploadBP}
                                    color={uploadSuccessBP ? "success" : "primary"}
                                >
                                    {uploadSuccessBP ? "Uploaded" : "Upload"}
                                </Button>
                            </InputAdornment>
                        )
                    }}
                    style={{ marginTop: '8px' }}
                />

                <InputLabel htmlFor="file-upload" style={{ marginTop: '8px' }}>
                    Upload Bone Marrow Test Report
                </InputLabel>
                <TextField
                    fullWidth
                    disabled
                    value={pdfUploadBMT ? pdfUploadBMT.name : ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Button component="label">
                                    Choose File
                                    <input type="file" accept=".pdf" onChange={handleFileChangeBMT} hidden />
                                </Button>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    variant="contained"
                                    onClick={handleUploadBMT}
                                    color={uploadSuccessBMT ? "success" : "primary"}
                                >
                                    {uploadSuccessBMT ? "Uploaded" : "Upload"}
                                </Button>
                            </InputAdornment>
                        )
                    }}
                    style={{ marginTop: '8px' }}
                />

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

export default NurseConfirmTestDone;
