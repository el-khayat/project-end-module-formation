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
  const [formation_id, setFormation_id] = useState(null);
  const [filterPriceRange, setFilterPriceRange] = useState([0, 100000]);
  const [filteredFormations, setFilteredFormations] = useState([]);
  const [filterCity, setFilterCity] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [cities, setCities] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    FormationService.getAvailableFormationsNoToken()
      .then(response => {
        setFormations(response);
      })
      .catch(error => {
        console.error('Error fetching formations:', error);
      });
  }, []);

  const getMaxPrice = () => {
    const maxPrice = Math.max(...formations.map((formation) => formation.price));
    if(maxPrice<0)
      return 0;
    else
      return maxPrice;
  };

  useEffect(() => {
    setFilterPriceRange([0, getMaxPrice()]);
  }, [formations]);

  useEffect(() => {
    const uniqueCities = [...new Set(formations.map((formation) => formation.city))];
    const uniqueSubjects = [...new Set(formations.map((formation) => formation.subject))];
    const uniqueCategories = [...new Set(formations.map((formation) => formation.category?.title))];
    setCities(uniqueCities);
    setSubjects(uniqueSubjects);
    setCategories(uniqueCategories);
  }, [formations]);

  useEffect(() => {
    const filtered = formations.filter((formation) =>
      (filterCity === '' || formation.city === filterCity) &&
      (filterSubject === '' || formation.subject === filterSubject) &&
      (filterCategory === '' || formation.category.title === filterCategory) &&
      (formation.price >= filterPriceRange[0] && formation.price <= filterPriceRange[1])
    );
    setFilteredFormations(filtered);
  }, [formations, filterCity, filterSubject, filterCategory, filterPriceRange]);

  const handleEnroll = (enrollData) => {
    setFormation_id(enrollData);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const identifier = formData.firstName + formData.lastName;
      const existingIndividual = await IndividuService.getIndividualByNameAndEmail(identifier, formData.email);

      if (existingIndividual) {
        const formationIds = await IndividuService.getIndividualFormations(existingIndividual.id);

        if (formationIds.includes(formation_id)) {
          alert('Already enrolled');
        } else {
          await IndividuService.updateIndividual({
            id: existingIndividual.id, name: existingIndividual.name,
            email: existingIndividual.email, phone: existingIndividual.phone, city: existingIndividual.city,
            birthday: existingIndividual.birthday, formations: [{ id: formation_id }], feedbacks: []
          });
          alert('Enrolled successfully');
        }
      } else {
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

  const handlePriceRangeChange = (event, newValue) => {
    setFilterPriceRange(newValue);
  };

  return (
    <div>
      <NavBar />
      <h1>Available Formations</h1>
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
        <Select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          displayEmpty
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '16px', marginRight: '16px', width: '200px' }}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>{category}</MenuItem>
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
              sx={{ width: '150px' }}
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
