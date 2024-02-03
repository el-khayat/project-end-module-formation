
import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Box, Slider, Typography, Stack } from '@mui/material';
import NavBar from '../../components/navbar/navbarComponent';
import FormationService from '../../services/formationServices';
import IndividuService from '../../services/individuService';
import Modal from '../../components/modal/Modal';
import EnrollForm from './EnrollForm';
import FormationsCards from '../../components/Card/CardModal'; 

const HomeFormationsPage = () => {
  const [formations, setFormations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formation_id, setformation_id] = useState(null);
  const [filteredFormations, setFilteredFormations] = useState([]); // New state for filtered formations
  const [filterCity, setFilterCity] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterPriceRange, setFilterPriceRange] = useState([0, 50000]);
  const [cities, setCities] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    FormationService.getAvailableFormationsNoToken()
      .then(response => {
        setFormations(response);
      })
      .catch(error => {
        console.error('Error fetching formations:', error);
      });
  }, []);

  const handlePriceRangeChange = (event, newValue) => {
    setFilterPriceRange(newValue);
  };
  const getMaxPrice = () => {
    const maxPrice = Math.max(...formations.map((formation) => formation.price));
       return maxPrice;
  };
  // Extract unique cities and subjects from formations
  useEffect(() => {
    const uniqueCities = [...new Set(formations.map((formation) => formation.city))];
    const uniqueSubjects = [...new Set(formations.map((formation) => formation.subject))];
    setCities(uniqueCities);
    setSubjects(uniqueSubjects);
  }, [formations]);

  useEffect(() => {
    filterPriceRange[1]= getMaxPrice();
    // Filter formations based on selected criteria
    const filtered = formations.filter((formation) =>
      (filterCity === '' || formation.city === filterCity) &&
      (filterSubject === '' || formation.subject === filterSubject) &&
      (formation.price >= filterPriceRange[0] && formation.price <= filterPriceRange[1])
    );
    setFilteredFormations(filtered);
  }, [formations, filterCity, filterSubject, filterPriceRange]);


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
      {/* Render FormationsCards with filtered formations */}


      <Box display="flex" alignItems="center">
        <Select
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          displayEmpty
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '16px', marginRight: '16px', width: '200px' }}
        >
          <MenuItem value="">All Cities</MenuItem>
          {cities.map((city, index) => (
            <MenuItem key={index} value={city}>{city}</MenuItem>
          ))}
        </Select>
        <Select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          displayEmpty
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '16px', marginRight: '16px', width: '200px' }}
        >
          <MenuItem value="">All Subjects</MenuItem>
          {subjects.map((subject, index) => (
            <MenuItem key={index} value={subject}>{subject}</MenuItem>
          ))}
        </Select>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: '16px' }}>
          <Typography id="price-range-slider" gutterBottom>
            Price Range
          </Typography>
            
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography variant="body1">
                {filterPriceRange[0]} 
              </Typography>
              <Typography variant="body1">
                {filterPriceRange[1]} 
              </Typography>
            </Box>
            <Slider
              value={filterPriceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              aria-labelledby="price-range-slider"
              min={0}
              max={getMaxPrice()}
              sx={{ width: '150px' }} // Adjust the width here
            />
        </Box>


        </Stack>
      </Box>



      <FormationsCards formations={filteredFormations} onEnroll={handleEnroll} />
      
      <Modal isOpen={isModalOpen} onClose={closeModal} style={{ width: '500px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 500 }}>
          <EnrollForm onSubmit={handleFormSubmit} onClose={closeModal} />
        </Box>
      </Modal>
    </div>
  );
};

export default HomeFormationsPage;
