import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import logo from "./hospitallogo.png";

const logoStyle = {
    width: '140px',
    height: 'auto',
};

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" mt={1}>
            {'Copyright © '}
            <Link href="https://www.ncisl.health.gov.lk/">Apeksha Hospital&nbsp;</Link>
            {new Date().getFullYear()}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: { xs: 4, sm: 6 },
                backgroundColor: 'background.paper',
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={4}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: { xs: 'center', sm: 'flex-start' },
                            textAlign: { xs: 'center', sm: 'left' },
                        }}
                    >
                        <img
                            src={
                                `${logo}`
                            }
                            alt="Apeksha Hospital logo"
                            style={logoStyle}
                        />
                        <Typography variant="body2" color="text.secondary" mt={2}>
                            Apeksha Hospital Maharagama
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Committed to providing the best care for leukemia patients.
                        </Typography>
                    </Box>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={4}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box>
                            <Typography variant="body2" fontWeight={600}>
                                Quick Links
                            </Typography>
                            <Link href="#aboutus" color="text.secondary" display="block" mt={1}>
                                About Us
                            </Link>
                            <Link href="#services" color="text.secondary" display="block" mt={1}>
                                Services
                            </Link>
                            <Link href="#contactus" color="text.secondary" display="block" mt={1}>
                                Contact Us
                            </Link>
                            <Link href="#faq" color="text.secondary" display="block" mt={1}>
                                FAQs
                            </Link>
                        </Box>
                        <Box>
                            <Typography variant="body2" fontWeight={600}>
                                Contact
                            </Typography>
                            <Typography variant="body2" color="text.secondary" display="block" mt={1}>
                                +94 112 850 252
                            </Typography>
                            <Typography variant="body2" color="text.secondary" display="block" mt={1}>
                                +94 112 850 253
                            </Typography>
                            <Typography variant="body2" color="text.secondary" display="block" mt={1}>
                                Apeksha Hospital, Maharagama, Sri Lanka
                            </Typography>
                            <Typography variant="body2" color="text.secondary" display="block" mt={1}>
                                Email: <Link href="mailto:info@apekshahospital.gov.lk">info@apekshahospital.gov.lk</Link>
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: { xs: 4, sm: 6 },
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        pt: 3,
                    }}
                >
                    <Stack direction="row" spacing={2}>
                        <IconButton
                            color="inherit"
                            href="https://web.facebook.com/ApekshaHospital.ncisl/?_rdc=1&_rdr"
                            aria-label="Facebook"
                        >
                            <FacebookIcon />
                        </IconButton>

                    </Stack>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 2,
                    }}
                >
                    <Copyright />
                </Box>
            </Container>
        </Box>
    );
}
