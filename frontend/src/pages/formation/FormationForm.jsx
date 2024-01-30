import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

const FormationForm = ({ onSubmit, formToEdit, onClose }) => {
  const initialFormState = {
    numberHours: 0,
    price: 0,
    descreption: '',
    subject: '',
    city: '',
    date: new Date().toISOString().split('T')[0],
  };

  const [formation, setFormation] = useState(formToEdit || initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormation({ ...formation, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formation);

    setFormation(initialFormState);

    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <TextField
          required
          label="Number of Hours:"
          type="Number"
          value={formation.numberHours}
          onChange={handleChange}
          sx={{ my: 2, width: '500px' }} 
          InputProps={{ style: { fontSize: '16px' } }}
        />
      </Box>
      <Box>
        <TextField
          required
          label="Price:"
          value={formation.price}
          onChange={handleChange}
          sx={{ my: 2, width: '500px' }} 
          InputProps={{ style: { fontSize: '16px' } }}
        />
      </Box>
      <Box>
        <TextField
          required
          label="Description:"
          value={formation.descreption}
          onChange={handleChange}
          sx={{ my: 2, width: '500px' }} 
          InputProps={{ style: { fontSize: '16px' } }}
        />
      </Box>
      <Box>
        <TextField
          required
          label="Subject:"
          value={formation.subject}
          onChange={handleChange}
          sx={{ my: 2, width: '500px' }} 
          InputProps={{ style: { fontSize: '16px' } }}
        />
      </Box>
      <Box>
        <TextField
          required
          label="City:"
          value={formation.city}
          onChange={handleChange}
          sx={{ my: 2, width: '500px' }} 
          InputProps={{ style: { fontSize: '16px' } }}
        />
      </Box>
      <Box>
        <TextField
          required
          label="Date:"
          type="date"
          value={formation.date}
          onChange={handleChange}
          sx={{ my: 2, width: '500px' }} 
          InputProps={{ style: { fontSize: '16px' } }}
        />
      </Box>
      <Button type="submit" variant="contained" sx={{ my: 2, width: '500px' }} >
        Create Formation
      </Button>
    </form>
  );
};

export default FormationForm;