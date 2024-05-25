import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import {useNavigate, useParams} from "react-router-dom";
import {Autocomplete, FormControl, InputAdornment, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import {storage} from "../../../../Util/firebase-config";
import TextField from "@mui/material/TextField";

function NurseConfirmTestDone() {
    const { patient_id } = useParams();
    const navigate = useNavigate();
    const [pdfUploadFBC, setPdfUploadFBC] = useState(null);
    const [pdfUploadBP, setPdfUploadBP] = useState(null);
    const [pdfUploadBMT, setPdfUploadBMT] = useState(null);
    const [fbcUrl, setFbcUrl] = useState("");
    const [bpUrl, setBpUrl] = useState("");
    const [bmtUrl, setBmtUrl] = useState("");
    const [uploadSuccessFBC, setUploadSuccessFBC] = useState(false); // State to track FBC upload success
    const [uploadSuccessBP, setUploadSuccessBP] = useState(false); // State to track BP upload success
    const [uploadSuccessBMT, setUploadSuccessBMT] = useState(false); // State to track BMT upload success

    const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString();



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

        const pdfRef = ref(storage, `InitialTestReports/FullBloodCount/${patient_id + "/" + patient_id + 'FBC'}`);
        uploadBytes(pdfRef, pdfUploadFBC).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setFbcUrl(url);
                console.log(url);
                setUploadSuccessFBC(true); // Set FBC upload success to true
                alert("Full Blood Count Report Upload Complete");
            })
        })
    };

    const handleUploadBP = () => {
        if (pdfUploadBP == null) return;

        const pdfRef = ref(storage, `InitialTestReports/BloodPicture/${patient_id + "/" + patient_id + 'BP'}`);
        uploadBytes(pdfRef, pdfUploadBP).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setBpUrl(url);
                console.log(url);
                setUploadSuccessBP(true); // Set BP upload success to true
                alert("Blood Picture Report Upload Complete");
            })
        })
    };

    const handleUploadBMT = () => {
        if (pdfUploadBMT == null) return;

        const pdfRef = ref(storage, `InitialTestReports/BoneMarrowTest/$${patient_id + "/" + patient_id + 'BMT'}`);
        uploadBytes(pdfRef, pdfUploadBMT).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setBmtUrl(url);
                console.log(url);
                setUploadSuccessBMT(true); // Set BMT upload success to true
                alert("Bone Marrow Test Report Upload Complete");
            })
        })
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



                <InputLabel
                    htmlFor="file-upload"
                    style={{ marginTop: '8px' }}
                >Upload Full Blood Count Report</InputLabel>
                <TextField
                    fullWidth
                    disabled
                    value={pdfUploadFBC ? pdfUploadFBC.name : ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Button component="label">
                                    Choose File
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChangeFBC}
                                        hidden
                                    />
                                </Button>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    variant="contained"
                                    onClick={handleUploadFBC}
                                    color={uploadSuccessFBC ? "success" : "primary"} // Change color based on upload success
                                >
                                    {uploadSuccessFBC ? "Uploaded" : "Upload"}
                                </Button>
                            </InputAdornment>
                        )
                    }}
                    style={{ marginTop: '8px' }}
                />

                <InputLabel
                    htmlFor="file-upload"
                    style={{ marginTop: '8px' }}
                >Upload Blood Picture Report</InputLabel>
                <TextField
                    fullWidth
                    disabled
                    value={pdfUploadBP ? pdfUploadBP.name : ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Button component="label">
                                    Choose File
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChangeBP}
                                        hidden
                                    />
                                </Button>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    variant="contained"
                                    onClick={handleUploadBP}
                                    color={uploadSuccessBP ? "success" : "primary"} // Change color based on upload success
                                >
                                    {uploadSuccessBP ? "Uploaded" : "Upload"}
                                </Button>
                            </InputAdornment>
                        )
                    }}
                    style={{ marginTop: '8px' }}
                />

                <InputLabel
                    htmlFor="file-upload"
                    style={{ marginTop: '8px' }}
                >Upload Bone Marrow Test Report</InputLabel>
                <TextField
                    fullWidth
                    disabled
                    value={pdfUploadBMT ? pdfUploadBMT.name : ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Button component="label">
                                    Choose File
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChangeBMT}
                                        hidden
                                    />
                                </Button>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    variant="contained"
                                    onClick={handleUploadBMT}
                                    color={uploadSuccessBMT ? "success" : "primary"} // Change color based on upload success
                                >
                                    {uploadSuccessBMT ? "Uploaded" : "Upload"}
                                </Button>
                            </InputAdornment>
                        )
                    }}
                    style={{ marginTop: '8px' }}
                />




            </Paper>

        </React.Fragment>
    );
}

export default NurseConfirmTestDone;


