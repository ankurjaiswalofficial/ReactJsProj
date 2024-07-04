import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Card, Alert, AlertTitle, Snackbar, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const FirstPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string | undefined>('All Fields Required');
  const [showAlertBox, setShowAlertBox] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const state = location.state as { message?: string };
    if (state) {
      setAlertMessage(state.message);
      setShowAlertBox(true);
    } else{
      setAlertMessage('All Fields Required');
      setShowAlertBox(true);
    }
  }, [location]);

  const handleAlertBox = () => {
    setShowAlertBox(prev => !prev);
  }

  const handleSubmit = () => {
    if (name && phone && email) {
      localStorage.setItem('userData', JSON.stringify({ name, phone, email }));
      navigate('/secondPage');
    } else {
      setAlertMessage('All Fields Required');
      setShowAlertBox(true);
    }
  };

  return (
    <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "100vh", maxWidth: "lg" }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlertBox}
        onClose={handleAlertBox}
        autoHideDuration={3500}
      >
        <Alert variant='filled' severity="error" onClose={handleAlertBox}>
          <AlertTitle>Error</AlertTitle>
          {alertMessage}
        </Alert>
      </Snackbar>

      <Card sx={{ p: 1, maxWidth: "sm" }}>
        <Typography variant="h4" gutterBottom>
          First Page
        </Typography>
        <Typography variant="h5" gutterBottom>
          User Information
        </Typography>
        <TextField
          label="Name"
          value={name}
          type='text'
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          value={phone}
          type='number'
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Card>
    </Container>
  );
};

export default FirstPage;
