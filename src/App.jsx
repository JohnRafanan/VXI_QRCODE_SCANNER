// src/App.jsx
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import QRScanner from './components/QRScanner';
// import DisplayText from './components/DisplayText';
import Container from '@mui/material/Container';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize as needed
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Container maxWidth="md">
      <QRScanner />
      {/* <DisplayText /> */}
    </Container>
  </ThemeProvider>
);

export default App;