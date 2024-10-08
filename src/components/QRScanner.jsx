import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setScannedText } from '../redux/qrSlice';
import { Box, Button, Typography } from '@mui/material';
import { QrReader } from 'react-qr-reader';
import { create_data_data, fetch_data_data, update_data_data } from '../actions/action';

const QRScanner = ({ 
  onResult, 
  constraints = { facingMode: 'environment' }, // Set default value directly
  onError, 
  style, 
  ...props 
}) => {

  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [data_, setData] = useState([])
  const { loading, success, data } = useSelector((res) => res.data)
  
  // FOR FETCHING DATA
  useEffect(() => {
    dispatch(fetch_data_data())
  },[dispatch])

  console.log(data)

  const handleLogin = (result, error) => {
    if (result) {
      
      setData(result.text)
      dispatch(create_data_data(result.text))
      setScanning(false)

    }
  };

  const handleLogout = (result, error) => {
    if (result) {
      
      setData(result.text)
      dispatch(update_data_data(result.text))
      setScanning(false)

    }
  };

  // console.log(data_)

  return (
    <>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {data_}
          <br /> <br /> Scan your QR CODE on the camera <br /> <br />
        </Typography>

        {!scanning ? (
          <>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => {
                setError(null); // Reset error before starting the scan
                setScanning(true);
                handleLogin();
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
                handleLogout();
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
              marginLeft: 28
            }}
          >
            <QrReader
              onResult={(result, error) => {
                if (result) {
                  // Assuming the result contains some data to differentiate between login and logout
                  const isLogin = checkIfLogin(result); // Implement this logic based on your app's needs
                  
                  if (isLogin) {
                    handleLogin();
                  } else {
                    handleLogout();
                  }
                }

                if (error) {
                  console.error("Scan error:", error);
                  setError(error.message); // Store the error message for display
                }
              }}
              onError={(error) => {
                console.error("Camera access error:", error);
                setError(error.message); // Store the error message for display
              }}
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
      
    </>
  );
};

export default QRScanner;