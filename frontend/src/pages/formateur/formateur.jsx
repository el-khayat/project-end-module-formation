import React, { useEffect, useState } from 'react';
import UserFormateurService from '../../services/formateurService';
import NavBar from '../../components/navbar/navbarComponent';
import Modal from '../../components/modal/Modal';
import './FormateurPage.css';
import { Box, Button, Paper, Typography } from '@mui/material';
import TableComponent from '../../components/table/tableComponent';

const FormateurPage = () => {

  const [formateurs, setFormateurs] = useState([]);
  const [newFormateur, setNewFormateur] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    roles: 'FORMATEUR_ROLE',
    keywords: '',
  });

  const [mode, setMode] = useState('CREATE'); // CREATE | UPDATE
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const formateursData = await UserFormateurService.getAllFormateurs();
        setFormateurs(formateursData);
      } catch (error) {
        console.error('Error fetching formateurs:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateFormateur = async () => {
    try {
      const createdFormateur = await UserFormateurService.createFormateur(newFormateur);
      setFormateurs((prevFormateurs) => [...prevFormateurs, createdFormateur]);
      setNewFormateur({
        name: '',
        email: '',
        password: '',
        phone: '',
        roles: 'FORMATEUR_ROLE',
        keywords: '',
      });
      closeModal();
    } catch (error) {
      console.error('Error creating formateur:', error);
    }
  };

  const handleUpdateFormateur = async (formateur) => {
    setMode('UPDATE');
    setNewFormateur(formateur);
    openModal();
  };

  const handleDeleteFormateur = async (formateurId) => {
    try {
      await UserFormateurService.deleteFormateur(formateurId);
      setFormateurs((prevFormateurs) =>
        prevFormateurs.filter((formateur) => formateur.id !== formateurId)
      );
    } catch (error) {
      console.error('Error deleting formateur:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setNewFormateur({
      name: '',
      email: '',
      password: '',
      phone: '',
      roles: 'FORMATEUR_ROLE',
      keywords: '',
    });
    setIsModalOpen(false);
    setMode('CREATE');
  };



  const Update = async () => {
    try {
      await UserFormateurService.updateFormateur(newFormateur);
      setFormateurs((prevFormateurs) =>
        prevFormateurs.map((formateur) =>
          formateur.id === newFormateur.id ? newFormateur : formateur
        )
      );
      closeModal();
    } catch (error) {
      console.error('Error updating formateur:', error);
    }
  };

  const columns = [
    { id: 'id', label: '#' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'keywords', label: 'Keyword' },

  ];


  return (
    <div>
      <NavBar />
      <div>
        
        <Modal isOpen={isModalOpen} onClose={closeModal} style={{zIndex:3}}>
          <div>
            <h2>{mode === 'CREATE' ? 'Create' : 'Update'} Formateur</h2>
            <input
              type="hidden"
              value={newFormateur.id}
              onChange={(e) => setNewFormateur({ ...newFormateur, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Name"
              value={newFormateur.name}
              onChange={(e) => setNewFormateur({ ...newFormateur, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Email"
              value={newFormateur.email}
              onChange={(e) => setNewFormateur({ ...newFormateur, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={newFormateur.password}
              onChange={(e) => setNewFormateur({ ...newFormateur, password: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              value={newFormateur.phone}
              onChange={(e) => setNewFormateur({ ...newFormateur, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="keywords"
              value={newFormateur.keywords}
              onChange={(e) => setNewFormateur({ ...newFormateur, keywords: e.target.value })}
            />
            {mode === 'CREATE' ? (
              <button onClick={handleCreateFormateur}>Create</button>
            ) : (
              <button onClick={Update}>Update</button>
            )}
          </div>
        </Modal>
      </div>
      <div>
        <Paper fullWidth sx={{ overflow: 'hidden', m: 2, marginTop: "100px" }}>
          <Box sx={{ display: "flex" }}>
            <Button variant='outlined' sx={{ m: 1 }} onClick={openModal} >
              Add Formateur
            </Button>
            <Typography variant='h6' component="h1" sx={{ m: 1, marginLeft: "400px" }}>
              Formateurs List
            </Typography>
          </Box>
          <TableComponent columns={columns} data={formateurs} handleUpdate={handleUpdateFormateur} handleDelete={handleDeleteFormateur} />
        </Paper>
      </div>
    </div>
  );
};

export default FormateurPage;
