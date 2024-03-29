import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navbar/navbarComponent';
import FormationForm from './FormationForm';
import FormationService from '../../services/formationService';
import Modal from '../../components/modal/Modal';
import SelectModal from '../../components/modalSelect/modalSelectComponent';
import ModalSelectCategory from '../../components/modalSelect/modalSelectComponentCategory';
import "./formation.css"
import { Box, Button, Paper, Typography } from '@mui/material';
import TableComponent from '../../components/table/FormationTableComponent';
import UserFormateurService from '../../services/formateurService';
import CategoryService from '../../services/categoryService';
import ConfirmDeleteModal from '../../components/modal/ConfirmDeleteModal';


const FormationsPage = () => {
  const [formations, setFormations] = useState([]);
  const [formToEdit, setFormToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSelect, setIsModalOpenSelect] = useState(false);
  const [isModalOpenSelectCategory, setIsModalOpenSelectCategory] = useState(false);
  const [formateurs, setFormateurs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formationId, setFormationId] = useState(null);

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [elementToDeleteName, setElementToDeleteName] = useState('');


  useEffect(() => {
    FormationService.getAllFormations()
      .then(response => {
        console.log(response)

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

  useEffect(() => {
    CategoryService.getAllCategies()
      .then(response => {
        setCategories(response);
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
    console.log('delete formation', formationId);
    const formationToDelete = formations.find((formation) => formation.id === formationId);

    if (formationToDelete) {

      setElementToDeleteName(formationToDelete.subject);
      setConfirmDeleteId(formationId);
      setIsConfirmDeleteModalOpen(true);
      console.log('formation to delete', formationToDelete);
      console.log('formation to delete model this open ', isConfirmDeleteModalOpen);
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
  };
  const handleFormCloseSelect = () => {
    console.log("hello");
    setIsModalOpenSelect(false);
  };
  const handleFormCloseSelectCategory = () => {
    console.log("hello");
    setIsModalOpenSelectCategory(false);
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
    { id: 'individuals', label: 'Subscribers', format: (value) => value ? value.length : '0' },
    { id: 'user', label: 'Formateur', format: (value) => value ? value.name : 'Not Assigned Yet' },
  ];

  const selectFornateur = (formationId) => {

    setFormationId(formationId);
    setIsModalOpenSelect(true);
  }

  const selectCategory = (formationId) => {

    setFormationId(formationId);
    setIsModalOpenSelectCategory(true);
  }

  const sendFeedbackRequest = (formationId) => {
    console.log('send feedback request', formationId);
    FormationService.sendFeedbackFormMail(formationId)
  }

  let actions = [
    { name: "Assign Formateur", action: selectFornateur },
    { name: "Assign Category", action: selectCategory },
    { name: "Send Feedback Request", action: sendFeedbackRequest },
  ];

  const AssignFormateur =  (formateurId)=>{
    FormationService.assignFormateur(formationId,formateurId)
    .then(()=>{
      setIsModalOpenSelect(false);
      // const updatedFormations =   FormationService.getAllFormations();
      // setFormations(updatedFormations);
    })
    .catch(error=>{
      console.log(error);
    })
  }

  const AssignCategory =  (categoryId)=>{
    FormationService.assignCategory(formationId, categoryId)
    .then(()=>{
      setIsModalOpenSelectCategory(false);
      // const updatedFormations =   FormationService.getAllFormations();
      // setFormations(updatedFormations);
    })
    .catch(error=>{
      console.log(error);
    })
  }


  return (
    <div>
      <NavBar />
      <Modal
        isOpen={isConfirmDeleteModalOpen}
        onClose={handleFormClose}
        style={{ width: '500px' }}>

        


      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        itemName={elementToDeleteName}
        text="Are you sure you want to delete the formation"  
        btn1="Delete"
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirm={confirmDeleteFormation}
      />
      </Modal>

      <Modal isOpen={isModalOpen} onClose={handleFormClose} style={{ width: '500px' }}>
        <FormationForm
          formToEdit={formToEdit}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          availableFormateurs={formateurs}
        />
      </Modal>
      <SelectModal
          open={isModalOpenSelect}
          onClose={handleFormCloseSelect}
          style={{ width: '500px' }}
          handleClose={handleFormCloseSelect}
          AssignFormateur={AssignFormateur}
        />
        <ModalSelectCategory
          open={isModalOpenSelectCategory}
          onClose={handleFormCloseSelectCategory}
          style={{ width: '500px' }}
          handleClose={handleFormCloseSelectCategory}
          AssignCategory={AssignCategory}
        />
      <div>
        <Paper sx={{ overflow: 'hidden', m: 2, marginTop: "100px" }}>
          <Box sx={{ display: "flex" }}>
            <Button variant='outlined' sx={{ m: 1 }} onClick={handleAddFormation} >
              Add Formation
            </Button>
            <Typography variant='h6' component="h1" sx={{ m: 1, marginLeft: "400px" }}>
              Formations List
            </Typography>
          </Box>
          <TableComponent
            columns={columns}
            data={formations}
            handleUpdate={handleUpdateFormation}
            handleDelete={handleDeleteFormation}
            setIsConfirmDeleteModalOpen ={setIsConfirmDeleteModalOpen}
            actions={actions} />
        </Paper>
      </div>
    </div>
  );
};

export default FormationsPage;
