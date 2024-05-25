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
            <ListItemText primary="Patient Management" />
        </ListItemButton>
        <ListItemButton component={Link} to="/doctordashboard/part2">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Part 2" />
        </ListItemButton>
        <ListItemButton component={Link} to="/doctordashboard/part3">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Part 3" />
        </ListItemButton>
        <ListItemButton component={Link} to="/doctordashboard/part4">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Part 4" />
        </ListItemButton>
    </React.Fragment>
);


