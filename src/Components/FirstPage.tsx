import React, { useState } from 'react';
import { TextField, Button, Typography, Card, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FirstPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name && phone && email) {
      localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));
      navigate('/secondPage');
    }
  };

  return (
    <Container sx={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", maxWidth: "lg"}}>
      <Card sx={{p: 1, maxWidth: "sm"}}>
        <Typography variant="h4" gutterBottom>
          First Page
        </Typography>
        <Typography variant="h5" gutterBottom>
          User Information
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
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
