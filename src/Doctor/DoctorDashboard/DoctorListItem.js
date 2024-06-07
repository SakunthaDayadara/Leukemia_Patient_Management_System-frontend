import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';


export const doctormainListItems = (
    <React.Fragment>
        <ListItemButton component={Link} to="/doctordashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/doctordashboard/patientmanagement">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Admission" />
        </ListItemButton>
        <ListItemButton component={Link} to="/doctordashboard/advancediagnose">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Advance Diagnose" />
        </ListItemButton>
        <ListItemButton component={Link} to="/doctordashboard/referral">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Referral" />
        </ListItemButton>
        <ListItemButton component={Link} to="/doctordashboard/test">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Test" />
        </ListItemButton>
        <ListItemButton component={Link} to="/doctordashboard/clinic">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Clinic" />
        </ListItemButton>
    </React.Fragment>
);


