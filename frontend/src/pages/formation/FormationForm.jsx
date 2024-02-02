
import React, { useState } from 'react';
import { Box, Button,TextField,  MenuItem } from '@mui/material';

const FormationForm = ({ onSubmit, formToEdit, onClose, availableFormateurs }) => {
  const initialFormState = {
    numberHours: 0,
    price: 0,
    descreption: '',
    subject: '',
    city: '',
    date: new Date().toISOString().split('T')[0],
    selectedFormateur: '', 
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
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 500 }} >
        <TextField
          required
          label="Number of Hours:"
          type="Number"
          name="numberHours"
          value={formation.numberHours}
          onChange={handleChange}
          sx={{ my: 1, width: '500px' }}
          InputProps={{ style: { fontSize: '16px' } }}
        />
        <TextField
          required
          label="Price:"
          name="price"
          value={formation.price}
          onChange={handleChange}
          sx={{ my: 1, width: '500px' }}
        />
        <TextField
          required
          label="Description:"
          name="descreption"
          value={formation.descreption}
          onChange={handleChange}
          sx={{ my: 1, width: '500px' }}
          InputProps={{ style: { fontSize: '16px' } }}
        />
        <TextField
          required
          label="Subject:"
          name="subject"
          value={formation.subject}
          onChange={handleChange}
          sx={{ my: 1, width: '500px' }}
          InputProps={{ style: { fontSize: '16px' } }}
        />
        <TextField
          required
          type="Number"
          label="Max Members:"
          name="totalMembers"
          value={formation.totalMembers}
          onChange={handleChange}
          sx={{ my: 1, width: '500px' }}
          InputProps={{ style: { fontSize: '16px' } }}
        />
        <TextField
          required
          label="City:"
          name="city"
          value={formation.city}
          onChange={handleChange}
          sx={{ my: 1, width: '500px' }}
          InputProps={{ style: { fontSize: '16px' } }}
        />
        <TextField
          required
          label="Date:"
          type="Date"
          name="date"
          value={formation.date}
          onChange={handleChange}
          sx={{ my: 1, width: '500px' }}
          InputProps={{ style: { fontSize: '16px' } }}
        />
        <TextField
          required
          label="Select Formateur"
          sx={{ my: 1, width: '500px' }}
          InputProps={{ style: { fontSize: '16px' } }}
          select
          name="selectedFormateur"
          value={formation.selectedFormateur}
          onChange={handleChange}
        >
          <MenuItem value="">Select Formateur</MenuItem>
          {availableFormateurs.map((formateur) => (
            <MenuItem key={formateur.id} value={formateur.id}>
              {formateur.name} - {formateur.keyword}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Button type="submit" variant="contained" sx={{ my: 1, width: '500px' }} >
        Create Formation
      </Button>
    </form>
  );
};

export default FormationForm;