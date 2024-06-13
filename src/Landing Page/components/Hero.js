import React from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from "./hospitallogo.png";

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        paddingTop: theme.spacing(16),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    heroImage: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4), // Adjust this value to increase/decrease the gap
    },
}));

function Hero() {
    const classes = useStyles();

    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });

        }
    };

    return (
        <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Leukemia Treatment and Care
                </Typography>
                <img
                    src={logo}
                    alt="logo of site"
                    className={classes.heroImage}
                />
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    At Apeksha Hospital, we are dedicated to providing comprehensive care and advanced treatment options
                    for leukemia patients. Our specialized team is here to support you every step of the way.
                </Typography>
                <div className={classes.heroButtons}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => scrollToSection('services')}
                            >
                                Learn More
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => scrollToSection('contactus')}
                            >
                                Contact Us
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
}

export default Hero;
