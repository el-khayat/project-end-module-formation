import React, { useState } from 'react';
import ExternalFormateurService from '../../services/externalFormateurService';
import NavBar from '../../components/navbar/navbarComponent';
import { Box, Button, Paper, TextField, Typography , Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import KEYWORDS from '../../utils/keywordsUtil';
import Autocomplete from '@mui/material/Autocomplete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const FormateurPage = () => {
  const [input, setInput] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false); 

  const onTagsChange = (event, values) => {
    setInput(values);
  };

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
      if (!newFormateur.name || !newFormateur.email || !newFormateur.phone) {
        setOpenModal(true);
        return;
      }

      const keywords = input.join(',');
      await ExternalFormateurService.createFormateur({ ...newFormateur, keywords });
      setNewFormateur({
        name: '',
        email: '',
        password: '',
        phone: '',
        roles: 'EXTERNE_FORMATEUR_ROLE',
        keywords: '',
      });

      setSuccessModal(true);
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

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
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
              required
              name="name"
              label="Name"
              value={newFormateur.name}
              onChange={handleChange}
              margin="normal"

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
            <Autocomplete
              multiple
              options={KEYWORDS}
              getOptionLabel={option => option}
              onChange={onTagsChange}

              defaultValue={input}

              renderInput={params => (
                <TextField
                  {...params}
                  label="Keywords"
                  placeholder="Add keywords"
                  margin="normal"
                  fullWidth
                />
              )}
            />
          </Box>
          <Button variant="outlined" sx={{ marginTop: '20px' }} onClick={handleCreateFormateur}>
            Submet
          </Button>
        </form>
      </Paper>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ErrorOutlineIcon sx={{ mr: 1, color: '#FF0000' }} />
            All inputs are required
          </Box>
        </DialogTitle>
        <DialogContent>
          Please fill in all the required fields.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>OK</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={successModal} onClose={handleCloseSuccessModal}>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircleOutlineIcon sx={{ mr: 1, color: '#00FF00' }} />
            Application Submitted
          </Box>
        </DialogTitle>
        <DialogContent>
          Your application has been successfully submitted.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessModal}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormateurPage;