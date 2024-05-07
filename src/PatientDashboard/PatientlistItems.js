import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';


export const patientmainListItems = (
    <React.Fragment>
        <ListItemButton component={Link} to="/patientdashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/patientdashboard/part1">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Part 1" />
        </ListItemButton>
        <ListItemButton component={Link} to="/patientdashboard/part2">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Part 2" />
        </ListItemButton>
        <ListItemButton component={Link} to="/patientdashboard/part3">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Part 3" />
        </ListItemButton>
        <ListItemButton component={Link} to="/patientdashboard/part4">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Part 4" />
        </ListItemButton>
    </React.Fragment>
);


