import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React from "react";
import Button from "@mui/material/Button";
import {Link, Outlet, useLocation} from "react-router-dom";

function AdminAccountManagement() {
    const location = useLocation();

    const getButtonStyles = (path) => {
        return location.pathname === path ? {
            backgroundColor: 'darkblue',
            color: 'white',
            '&:hover': {
                backgroundColor: 'navy'
            }
        } : {};
    };

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
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: 60,
                            }}
                        >
                            <Button variant="contained" component={Link} to="/admindashboard/accountmanagement" sx={{ mr: 2, ...getButtonStyles("/admindashboard/accountmanagement") }}>
                                Create Accounts
                            </Button>
                            <Button variant="contained" component={Link} to="/admindashboard/accountmanagement/updateaccount" sx={{ mr: 2, ...getButtonStyles("/admindashboard/accountmanagement/updateaccount") }}>
                                Update Accounts
                            </Button>
                        </Paper>

                        <Outlet />

                    </Grid>

                </Container>

            </Box>


        </React.Fragment>
    );
}

export default AdminAccountManagement;
