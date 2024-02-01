import React, { useState } from 'react';
import { TextField, Button, DialogActions } from '@mui/material';

const EnrollForm = ({ onSubmit, onClose }) => {
  const currentDate = new Date();
  const [enrollInfo, setEnrollInfo] = useState({
    firstName: '',
    lastName: '',
    birthDate: new Date(currentDate.getFullYear() - 20, currentDate.getMonth(), currentDate.getDate()).toISOString().split('T')[0],
    city: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnrollInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(enrollInfo);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField
        sx={{ my: 2 }}
        label="First Name:"
        required
        type="text"
        id="firstName"
        name="firstName"
        fullWidth
        value={enrollInfo.firstName}
        onChange={handleInputChange}
      />

      <TextField
        sx={{ my: 2 }}
        label="Last Name:"
        type="text"
        id="lastName"
        name="lastName"
        fullWidth
        value={enrollInfo.lastName}
        onChange={handleInputChange}
        required
      />

      <TextField
        sx={{ my: 2 }}
        label="Birth Date:"
        type="date"
        id="birthDate"
        name="birthDate"
        fullWidth
        value={enrollInfo.birthDate}
        onChange={handleInputChange}
        required
      />

      <TextField
        sx={{ my: 2 }}
        label="City:"
        type="text"
        id="city"
        name="city"
        fullWidth
        value={enrollInfo.city}
        onChange={handleInputChange}
        required
      />

      <TextField
        sx={{ my: 2 }}
        label="Email :"
        type="email"
        id="email"
        name="email"
        fullWidth
        value={enrollInfo.email}
        onChange={handleInputChange}
        required
      />

      <TextField
        sx={{ my: 2 }}
        label="Phone :"
        type="text"
        id="phone"
        name="phone"
        fullWidth
        value={enrollInfo.phone}
        onChange={handleInputChange}
        required
      />

      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" sx={{ my: 1, width: '100px' }} type="submit">
          Submit
        </Button>
        <Button variant="contained" onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </form>
  );
};

export default EnrollForm;