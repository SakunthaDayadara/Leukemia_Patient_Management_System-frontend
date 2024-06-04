import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React from "react";

function PatientDashpage() {
    return (
        <React.Fragment>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper
                                aria-label={'patient-deatils'}
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 60,
                                }}>

                            </Paper>
                            <Paper
                                aria-label={'patient-appointment'}
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    height: 180,
                                }}>

                            </Paper>
                            <Paper
                                aria-label={'patient-test'}
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    height: 180,
                                }}>

                            </Paper>
                            <Paper
                                aria-label={'patient-clinic'}
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    height: 180,
                                }}>

                            </Paper>
                        </Grid>
                    </Grid>

                </Container>
            </Box>
        </React.Fragment>
    );
}

export default PatientDashpage;
