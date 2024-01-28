import React, { useState } from 'react';
import ExternalFormateurService from '../../services/externalFormateurService';
import NavBar from '../../components/navbar/navbarComponent';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

const FormateurPage = () => {

  const [newFormateur, setNewFormateur] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    roles: 'EXTERNE_FORMATEUR_ROLE',
    keywords: '',
  });

  const handleCreateFormateur = async () => {
    try {
      const createdFormateur = await ExternalFormateurService.createFormateur(newFormateur);
      setNewFormateur({
        name: '',
        email: '',
        password: '',
        phone: '',
        roles: 'EXTERNE_FORMATEUR_ROLE',
        keywords: '',
      });
    } catch (error) {
      console.error('Error creating external formateur:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewFormateur((prevFormateur) => ({
      ...prevFormateur,
      [name]: value,
    }));
  };

  return (
    <div>
      <NavBar />
      <Paper fullWidth sx={{ overflow: 'cover', m: 2, marginTop: '100px', padding: '20px' }}>
        <Typography variant="h6" component="h1" sx={{ marginBottom: '20px' }}>
          Applay To Be A Trainer
        </Typography>
        <form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField
              name="name"
              label="Name"
              value={newFormateur.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              name="email"
              label="Email"
              value={newFormateur.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              name="phone"
              label="Phone"
              value={newFormateur.phone}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              name="keywords"
              label="Keywords"
              value={newFormateur.keywords}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Box>
          <Button variant="outlined" sx={{ marginTop: '20px' }} onClick={handleCreateFormateur}>
            Submet
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default FormateurPage;