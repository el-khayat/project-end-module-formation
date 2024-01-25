// FormationForm.js
import React, { useState } from 'react';

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

    // Call the parent component's function to handle form submission
    onSubmit(formation);

    // Reset the form or perform other actions as needed
    setFormation(initialFormState);

    // Close the form
    onClose();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Number of Hours:
        <input type="number" name="numberHours" value={formation.numberHours} onChange={handleChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={formation.price} onChange={handleChange} />
      </label>
      <label>
        Description:
        <input type="text" name="descreption" value={formation.descreption} onChange={handleChange} />
      </label>
      <label>
        Subject:
        <input type="text" name="subject" value={formation.subject} onChange={handleChange} />
      </label>
      <label>
        City:
        <input type="text" name="city" value={formation.city} onChange={handleChange} />
      </label>
      <label>
        Date:
        <input type="date" name="date" value={formation.date} onChange={handleChange} />
      </label>
      <button type="submit">Create Formation</button>
    </form>
  );
};

export default FormationForm;