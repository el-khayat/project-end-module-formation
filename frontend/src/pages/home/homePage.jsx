// HomeFormationsPage.js
import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navbar/navbarComponent';
import FormationService from '../../services/formationServices';
import FormationTable from './FormationTable';

const HomeFormationsPage = () => {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    FormationService.getAllFormationsNoToken()
      .then(response => {
        console.log('Formations data retrieved:', response);
        setFormations(response);
      })
      .catch(error => {
        console.error('Error fetching formations:', error);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Available Formations</h1>
      <FormationTable formations={formations} enrollButton={true} />
    </div>
  );
};

export default HomeFormationsPage;
