import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';


export const nursemainListItems = (
    <React.Fragment>
        <ListItemButton component={Link} to="/nursedashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/nursedashboard/appointmentmanagement">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Appointments" />
        </ListItemButton>
        <ListItemButton component={Link} to="/nursedashboard/patientmanagement">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Admission" />
        </ListItemButton>
        <ListItemButton component={Link} to="/nursedashboard/treatment">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Treatment" />
        </ListItemButton>
        <ListItemButton component={Link} to="/nursedashboard/test">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Test" />
        </ListItemButton>
        <ListItemButton component={Link} to="/nursedashboard/clinic">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Clinic" />
        </ListItemButton>
    </React.Fragment>
);


