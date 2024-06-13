import React from 'react';
import { Container, Grid, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import backgroundImage from './about-us-background.png'; // Ensure this path is correct

const useStyles = makeStyles((theme) => ({
    aboutUsContent: {
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        overflow: 'hidden',
        minHeight: '100vh', // Ensure the height is sufficient to see the background
        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.5, // Adjust the opacity as needed
            zIndex: -1,
        },
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background with opacity
        position: 'relative', // Ensure the content is positioned correctly
        zIndex: 1, // Ensure the content is above the background
    },
    sectionTitle: {
        marginBottom: theme.spacing(4),
    },
}));

function AboutUs() {
    const classes = useStyles();

    React.useEffect(() => {
        console.log('Background image path:', backgroundImage);
    }, []);

    return (
        <div className={classes.aboutUsContent} id="aboutus">
            <Container
                maxWidth="md"
            >
                <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom className={classes.sectionTitle}>
                    About Us
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom>
                                Our Mission
                            </Typography>
                            <Typography>
                                At Apeksha Hospital Maharagama, our mission is to provide the highest standard of care for leukemia patients through cutting-edge treatments, compassionate care, and comprehensive support services.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom>
                                Our Team
                            </Typography>
                            <Typography>
                                Our team consists of highly experienced oncologists, hematologists, nurses, and support staff who are dedicated to offering personalized care and support to each patient and their families.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom>
                                Our Facilities
                            </Typography>
                            <Typography>
                                We are equipped with state-of-the-art facilities and advanced diagnostic tools to ensure accurate and early detection of leukemia. Our treatment protocols are designed to provide the best possible outcomes for our patients.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default AboutUs;
