// EnrollForm.js
import React, { useState } from 'react';

const EnrollForm = ({ onSubmit, onClose }) => {
  const [enrollInfo, setEnrollInfo] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
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
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={enrollInfo.firstName}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={enrollInfo.lastName}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="birthDate">Birth Date:</label>
      <input
        type="date"
        id="birthDate"
        name="birthDate"
        value={enrollInfo.birthDate}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="city">City:</label>
      <input
        type="text"
        id="city"
        name="city"
        value={enrollInfo.city}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={enrollInfo.email}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="phone">Phone:</label>
      <input
        type="text"
        id="phone"
        name="phone"
        value={enrollInfo.phone}
        onChange={handleInputChange}
        required
      />

      <button type="submit">Submit</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EnrollForm;