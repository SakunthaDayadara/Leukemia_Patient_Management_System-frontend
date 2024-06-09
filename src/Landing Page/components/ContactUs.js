import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function ContactUs() {
  return (
      <Container
          id="contactus"
          sx={{
            pt: { xs: 4, sm: 12 },
            pb: { xs: 8, sm: 16 },
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
          <Typography component="h2" variant="h4" color="text.primary">
            Contact Us
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Call our hotline for more information. We are ready to help you.
          </Typography>
        </Box>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
            >
              <PhoneIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" color="text.primary">
                CONTACT NUMBERS
              </Typography>
              <Typography variant="body1" color="text.secondary">
                + 94 112 850 252
              </Typography>
              <Typography variant="body1" color="text.secondary">
                + 94 112 850 253
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
            >
              <LocationOnIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" color="text.primary">
                POSTAL ADDRESS
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Apeksha Hospital, Maharagama, Sri Lanka
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="h6" color="text.primary" sx={{ mt: 4 }}>
          Hotline: + 94 112 850 252
        </Typography>
      </Container>
  );
}
