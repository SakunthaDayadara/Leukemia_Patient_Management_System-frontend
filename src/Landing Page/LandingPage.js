import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import LogoCollection from './components/LogoCollection';
import FandQ from './components/FandQ';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Footer from './components/Footer';
import getLPTheme from './getLPTheme';

export default function LandingPage() {
    const [mode, setMode] = React.useState('light');
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppAppBar mode={mode} />
            <Hero />
            <Box sx={{ bgcolor: 'background.default' }}>
                <Divider />
                <AboutUs />
                <Divider />
                <Services />
                <Divider />
                <FandQ />
                <Divider />
                <ContactUs />
                <Divider />
                <Footer />
            </Box>
        </ThemeProvider>
    );
}
