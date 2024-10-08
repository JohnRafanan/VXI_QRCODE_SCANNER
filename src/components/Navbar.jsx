// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ width: '100%' }}>
    <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
        QR Scanner App
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">About</Button>
        <Button color="inherit">Contact</Button>
    </Toolbar>
    </AppBar>
  );
};

export default Navbar;