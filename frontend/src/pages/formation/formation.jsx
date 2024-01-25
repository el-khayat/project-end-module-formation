import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navbar/navbarComponent';
import FormationsTable from './FormationsTable';
import FormationForm from './FormationForm';
import FormationService from '../../services/formationServices';
import Modal from '../../components/modal/Modal';

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

      // Print the information of the selected row to the console
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
        // If formToEdit is present, update the existing formation
        console.log('Update the record')
        await FormationService.updateFormation(formData);
      } else {
        console.log('Ucreate new record')
        // If formToEdit is null, create a new formation
        await FormationService.createFormation(formData);
      }

      // Close the modal and fetch updated formations
      setIsModalOpen(false);
      const updatedFormations = await FormationService.getAllFormations();
      setFormations(updatedFormations);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <h1>List of Formations</h1>

      <Modal isOpen={isModalOpen} onClose={handleFormClose}>
        <FormationForm
          formToEdit={formToEdit}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      </Modal>

      <div>
        <button onClick={handleAddFormation}>Add Formation</button>
      </div>

      <FormationsTable
        formations={formations}
        onUpdateFormation={handleUpdateFormation}
        onDeleteFormation={handleDeleteFormation}
      />
    </div>
  );
};

export default FormationsPage;
