import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { QrReader } from 'react-qr-reader';
import { create_data_data, fetch_data_data, update_data_data } from '../actions/action';

const QRScanner = ({ 
  constraints = { facingMode: 'environment' }, // Set default value directly
  style, 
  ...props 
}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [actionType, setActionType] = useState(null); // To track 'login' or 'logout'
  const [data_, setData] = useState('');
  const { loading, success, data } = useSelector((res) => res.data);

  const [newData, setNewData] = useState({ 
    HRID: '',
    Name: '',
    Site: '',
    LoginTime: '',
    TimeDifference: ''
   })

  // FOR FETCHING DATA
  useEffect(() => {
    dispatch(fetch_data_data());
  }, [dispatch]);

  const handleLogin = (result) => {
    if (result) {
        newData.HRID = result.text;
        newData.Name = 'TEST';
        newData.Site = 'TEST';
        newData.LoginTime = new Date().toISOString();
        newData.TimeDifference = 'TEST';

      setData(result.text);
      dispatch(create_data_data(newData));
      setScanning(false);
      console.log(newData)
    }
  };

  const handleLogout = (result) => {
    if (result) {
      setData(result.text);
      dispatch(update_data_data(result.text));
      setScanning(false);
    }
  };

  const checkIfLogin = (result) => {
    if (result) {
      const isLogin = true; // Placeholder logic for login/logout detection
      if (isLogin && actionType === 'login') {
        handleLogin(result); // Call login handler
      } else if (!isLogin && actionType === 'logout') {
        handleLogout(result); // Call logout handler
      }
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        <br /> <br /> Select and scan your QR CODE on the camera <br /> <br />
      </Typography>

      {!scanning ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setError(null); // Reset error before starting the scan
              setScanning(true);
              setActionType('login'); // Set action type to 'login'
            }}
            style={{ margin: '10px' }}
          >
            Login
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setError(null); // Reset error before starting the scan
              setScanning(true);
              setActionType('logout'); // Set action type to 'logout'
            }}
            style={{ margin: '10px' }}
          >
            Logout
          </Button>
        </>
      ) : (
        <Box
          sx={{
            width: '100%',
            maxWidth: 400, // Restrict max width for responsiveness
            backgroundColor: '#fff',
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            marginLeft: 28,
          }}
        >
          <QrReader
            onResult={(result, error) => {
              if (error) {
                console.error('Scan error:', error);
                setError(error.message); // Store error message for display
              } else if (result) {
                checkIfLogin(result); // Check login/logout action
              }
            }}
            constraints={constraints}
            style={{ width: '100%' }}
            {...props}
          />

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setScanning(false)}
            sx={{ mt: 2 }}
          >
            Stop Scanning
          </Button>
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default QRScanner;