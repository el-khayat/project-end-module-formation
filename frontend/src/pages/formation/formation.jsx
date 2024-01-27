import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navbar/navbarComponent';
import FormationForm from './FormationForm';
import FormationService from '../../services/formationServices';
import Modal from '../../components/modal/Modal';
import "./formation.css"
import { Box, Button, Paper, Typography } from '@mui/material';
import TableComponent from '../../components/table/tableComponent';

const FormationsPage = () => {
  const [formations, setFormations] = useState([]);
  const [formToEdit, setFormToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    FormationService.getAllFormations()
      .then(response => {
        console.log('Formations data retrieved:', response);
        setFormations(response);
      })
      .catch(error => {
        console.error('Error fetching formations:', error);
      });
  }, []);



  const handleAddFormation = () => {
    setFormToEdit(null);
    setIsModalOpen(true);
  };

  const handleUpdateFormation = (formationId) => {
    const formationToUpdate = formations.find((formation) => formation.id === formationId);

    console.log('Update clicked for formation:', formationToUpdate);

    setFormToEdit(formationToUpdate);
    setIsModalOpen(true);
  };

  const handleDeleteFormation = (formationId) => {
    FormationService.deleteFormation(formationId)
      .then(() => {
        console.log('Formation deleted:', formationId);
        setFormations(prevFormations =>
          prevFormations.filter(formation => formation.id !== formationId)
        );
      })
      .catch(error => {
        console.error('Error deleting formation:', error);
      });
  };

  const handleFormClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (formToEdit) {
        console.log('Update the record');
        await FormationService.updateFormation(formData);
      } else {
        console.log('Create new record');
        await FormationService.createFormation(formData);
      }

      setIsModalOpen(false);
      const updatedFormations = await FormationService.getAllFormations();
      setFormations(updatedFormations);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };
  const columns = [
    { id: 'id', label: '#' },
    { id: 'numberHours', label: 'Number Hours' },
    { id: 'price', label: 'Price' },
    { id: 'descreption', label: 'Descreption' },
    { id: 'subject', label: 'Subject' },
    { id: 'city', label: 'City' },
    { id: 'date', label: 'Date',format: (value) => new Date(value).toLocaleDateString() },

  ];

  return (
    <div>
      <NavBar />
      <Modal isOpen={isModalOpen} onClose={handleFormClose}>
        <FormationForm
          formToEdit={formToEdit}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      </Modal>

      <div>
        <Paper fullWidth sx={{ overflow: 'hidden', m: 2, marginTop: "100px" }}>
          <Box sx={{ display: "flex" }}>
            <Button variant='outlined' sx={{ m: 1 }} onClick={handleAddFormation} >
              Add Enterprise
            </Button>
            <Typography variant='h6' component="h1" sx={{ m: 1, marginLeft: "400px" }}>
              Enterprises List
            </Typography>
          </Box>
          <TableComponent columns={columns} data={formations} handleUpdate={handleUpdateFormation} handleDelete={handleDeleteFormation} />
        </Paper>
      </div> 

    </div>
  );
};

export default FormationsPage;
