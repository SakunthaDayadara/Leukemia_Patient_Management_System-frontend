import React from 'react';
import { Container, Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  servicesContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  sectionTitle: {
    marginBottom: theme.spacing(4),
  },
}));

function Services() {
  const classes = useStyles();

  return (
      <div className={classes.servicesContent} id="services">
        <Container maxWidth="md">
          <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom className={classes.sectionTitle}>
            Our Services
          </Typography>
          <Typography variant="h6" align="center" color="textPrimary" paragraph>
            At Apeksha Hospital, we offer a range of specialized services for leukemia patients, ensuring comprehensive care and support throughout their treatment journey.
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                  Diagnosis
                </Typography>
                <Typography>
                  State-of-the-art diagnostic tools for accurate and early detection of leukemia.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                  Treatment
                </Typography>
                <Typography>
                  Personalized treatment plans including chemotherapy, radiation therapy, and targeted therapies.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                  Support Services
                </Typography>
                <Typography>
                  Comprehensive support services including counseling, nutritional support, and rehabilitation.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                  Clinical Trials
                </Typography>
                <Typography>
                  Access to cutting-edge clinical trials offering new and innovative treatments.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                  Pediatric Care
                </Typography>
                <Typography>
                  Specialized care and treatment for pediatric leukemia patients.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                  Follow-Up Care
                </Typography>
                <Typography>
                  Ongoing follow-up care to monitor health and prevent recurrence.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
  );
}

export default Services;
