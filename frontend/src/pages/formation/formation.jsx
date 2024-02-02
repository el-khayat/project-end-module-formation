import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navbar/navbarComponent';
import FormationForm from './FormationForm';
import FormationService from '../../services/formationServices';
import Modal from '../../components/modal/Modal';
import "./formation.css"
import { Box, Button, Paper, Typography } from '@mui/material';
import TableComponent from '../../components/table/tableComponent';
import UserFormateurService from '../../services/formateurService';
import ConfirmDeleteModal from '../../components/modal/ConfirmDeleteModal';


const FormationsPage = () => {
  const [formations, setFormations] = useState([]);
  const [formToEdit, setFormToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formateurs, setFormateurs] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [elementToDeleteName, setElementToDeleteName] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    FormationService.getAllFormations()
      .then(response => {
        setFormations(response);
      })
      .catch(error => {
        console.error('Error fetching formations:', error);
      });
  }, []);

  useEffect(() => {
    UserFormateurService.getAllFormateurs()
      .then(response => {
        setFormateurs(response);
      })
      .catch(error => {
        console.error('Error fetching formateurs:', error);
      });
  }, []);



  const handleAddFormation = () => {
    setFormToEdit(null);
    setIsModalOpen(true);
  };

  const handleUpdateFormation = (formationId) => {
    setFormToEdit(formationId);
    setIsModalOpen(true);
  };

  const handleDeleteFormation = (formationId) => {
    const formationToDelete = formations.find((formation) => formation.id === formationId);

    if (formationToDelete) {
      setElementToDeleteName(formationToDelete.subject);
      setConfirmDeleteId(formationId);
      setIsConfirmDeleteModalOpen(true);
    }

  };

  const confirmDeleteFormation = async () => {
    try {
      await FormationService.deleteFormation(confirmDeleteId);
      setFormations(prevFormations =>
        prevFormations.filter(formation => formation.id !== confirmDeleteId)
      );
      setIsConfirmDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting formation:', error);
    }
  };

  const handleFormClose = () => {
    setIsModalOpen(false);
    setSelectedFile(null); 
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (formData.selectedFormateur) {
        formData.user = { id: formData.selectedFormateur };
      }

      if (formToEdit) {
        await FormationService.updateFormation(formData);
        alert('The Formation Updated');
      } else {
        console.log('Create new record');
        await FormationService.createFormation(formData);
        alert('The Formation Added');
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
    { id: 'date', label: 'Date', format: (value) => new Date(value).toLocaleDateString() },
    { id: 'user', label: 'Formateur', format: (value) => value ? value.name : 'No Formateur' },

  ];

  return (
    <div>
      <NavBar />

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        itemName={elementToDeleteName}
        text="Are you sure you want to delete the formation"  
        btn1="Delete"
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirm={confirmDeleteFormation}
      />

      <Modal isOpen={isModalOpen} onClose={handleFormClose} style={{ width: '500px' }}>
        <FormationForm
          formToEdit={formToEdit}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          availableFormateurs={formateurs}
        />
      </Modal>

      <div>
        <Paper fullWidth sx={{ overflow: 'hidden', m: 2, marginTop: "100px" }}>
          <Box sx={{ display: "flex" }}>
            <Button variant='outlined' sx={{ m: 1 }} onClick={handleAddFormation} >
              Add Formation
            </Button>
            <Typography variant='h6' component="h1" sx={{ m: 1, marginLeft: "400px" }}>
              Formations List
            </Typography>
          </Box>
          <TableComponent columns={columns} data={formations} handleUpdate={handleUpdateFormation} handleDelete={handleDeleteFormation} />
        </Paper>
      </div>

    </div>
  );
};

export default FormationsPage;
