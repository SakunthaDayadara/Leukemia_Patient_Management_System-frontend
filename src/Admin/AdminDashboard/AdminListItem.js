import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';


export const adminmainListItems = (
    <React.Fragment>

        <ListItemButton component={Link} to="/admindashboard/accountmanagement">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Account Management" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admindashboard/doctors">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Doctors" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admindashboard/nurses">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Nurses" />
        </ListItemButton>
    </React.Fragment>
);


