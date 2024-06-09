import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FandQ() {
    return (
        <Box
            id="faq"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                color: 'white',
                bgcolor: '#06090a',
            }}
        >
            <Container
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 3, sm: 6 },
                }}
            >
                <Box
                    sx={{
                        width: { sm: '100%', md: '60%' },
                        textAlign: { sm: 'left', md: 'center' },
                    }}
                >
                    <Typography component="h2" variant="h4">
                        Frequently Asked Questions
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'grey.400' }}>
                        Here are some of the most frequently asked questions about leukemia and our treatment approach at Apeksha Hospital Maharagama.
                    </Typography>
                </Box>
                <Grid container spacing={2.5}>
                    <Grid item xs={12}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                <Typography variant="h6">What is leukemia?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Leukemia is a type of cancer that affects the blood and bone marrow. It occurs when there is an overproduction of abnormal white blood cells, which can crowd out normal blood cells and lead to various health issues.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                                <Typography variant="h6">What are the symptoms of leukemia?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Common symptoms of leukemia include fatigue, frequent infections, easy bruising or bleeding, weight loss, swollen lymph nodes, and night sweats. If you experience any of these symptoms, it is important to consult a healthcare professional.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                                <Typography variant="h6">How is leukemia diagnosed?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Leukemia is typically diagnosed through blood tests that measure the levels of different blood cells. A bone marrow biopsy may also be performed to confirm the diagnosis and determine the specific type of leukemia.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content" id="panel4a-header">
                                <Typography variant="h6">What treatment options are available for leukemia?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Treatment options for leukemia may include chemotherapy, radiation therapy, targeted therapy, and stem cell transplantation. The specific treatment plan depends on the type and stage of leukemia, as well as the patient's overall health.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5a-content" id="panel5a-header">
                                <Typography variant="h6">What support services are available at Apeksha Hospital Maharagama?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Apeksha Hospital Maharagama offers a range of support services, including counseling, nutritional support, pain management, and patient education programs. Our multidisciplinary team is dedicated to providing comprehensive care and support to our patients and their families.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
