import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navbar/navbarComponent';
import FormationService from '../../services/formationServices';
import IndividuService from '../../services/individuService';
import FormationTable from './FormationTable';
import Modal from '../../components/modal/Modal';
import EnrollForm from './EnrollForm';
import { Box } from '@mui/material';

const HomeFormationsPage = () => {
  const [formations, setFormations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formation_id, setformation_id] = useState(null);

  useEffect(() => {
    FormationService.getAvailableFormationsNoToken()
      .then(response => {
        setFormations(response);
      })
      .catch(error => {
        console.error('Error fetching formations:', error);
      });
  }, []);

  const handleEnroll = (enrollData) => {
    //console.log('Enrollment information:', enrollData);
    setformation_id(enrollData); // Store enrollData in state
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {

    try {
      // Concatenate name and email to form a unique identifier
      const identifier = formData.firstName + formData.lastName;

      // Check if individual already exists
      const existingIndividual = await IndividuService.getIndividualByNameAndEmail(identifier, formData.email);
      //console.log("individue id",existingIndividual.id);


      if (existingIndividual) {
        console.log("individue alresy exist");
        // Check if formation ID is already in the individual's formation list
        const formationIds = await IndividuService.getIndividualFormations(existingIndividual.id);

        if (formationIds.includes(formation_id)) {
          console.log("formation alresy exist");
          alert('Already enrolled');
        } else {
          // Update individual with new formation
          await IndividuService.updateIndividual({
            id: existingIndividual.id, name: existingIndividual.name,
            email: existingIndividual.email, phone: existingIndividual.phone, city: existingIndividual.city,
            birthday: existingIndividual.birthday, formations: [{ id: formation_id }], feedbacks: []
          });

          alert('Enrolled successfully');
        }
      } else {
        console.log("new individue ");
        // Create new individual and enroll
        await IndividuService.addIndividual({
          name: identifier, email: formData.email, phone: formData.phone,
          city: formData.city, birthday: formData.birthDate, formations: [{ id: formation_id }]
        });
        alert('Enrolled successfully');
      }
    } catch (error) {
      console.error('Error enrolling:', error);
    }


    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <NavBar />
      <h1>Available Formations</h1>
      <FormationTable formations={formations} onEnroll={handleEnroll} />

      <Modal isOpen={isModalOpen} onClose={closeModal} style={{ width: '500px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 500 }}>
          <EnrollForm onSubmit={handleFormSubmit} onClose={closeModal} />
        </Box>
      </Modal>
    </div>
  );
};

export default HomeFormationsPage;
