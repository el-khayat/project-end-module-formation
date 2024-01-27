import React, { useEffect, useState } from 'react';
import EntrepriseService from '../../services/entrepriseService';
import NavBar from '../../components/navbar/navbarComponent';
import Modal from '../../components/modal/Modal';
import { Box, Button, Paper, Typography } from '@mui/material';
import TableComponent from '../../components/table/tableComponent';

const EntreprisePage = () => {
  const [entreprises, setEntreprises] = useState([]);
  const [newEntreprise, setNewEntreprise] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
    url: '',
    email: '',
  });
  const [mode, setMode] = useState('CREATE'); // CREATE | UPDATE
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entreprisesData = await EntrepriseService.getAllEntreprise();
        setEntreprises(entreprisesData);
      } catch (error) {
        console.error('Error fetching entreprises:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateEntreprise = async () => {
    try {
      const createdEntreprise = await EntrepriseService.saveEntreprise(newEntreprise);
      setEntreprises((prevEntreprises) => [...prevEntreprises, createdEntreprise]);
      setNewEntreprise({
        name: '',
        address: '',
        phone: '',
        url: '',
        email: '',
      });
      closeModal();
    } catch (error) {
      console.error('Error creating entreprise:', error);
    }
  };

  const handleUpdateEntreprise = (entreprise) => {
    setMode('UPDATE');
    setNewEntreprise(entreprise);
    openModal();
  };

  const handleUpdate = async () => {
    try {
      await EntrepriseService.updateEntreprise(newEntreprise);
      setEntreprises((prevEntreprises) =>
        prevEntreprises.map((entreprise) =>
          entreprise.id === newEntreprise.id ? newEntreprise : entreprise
        )
      );
      closeModal();
    } catch (error) {
      console.error('Error updating entreprise:', error);
    }
  };

  const handleDeleteEntreprise = async (entrepriseId) => {
    try {
      await EntrepriseService.deleteEntrepriseById(entrepriseId);
      setEntreprises((prevEntreprises) =>
        prevEntreprises.filter((entreprise) => entreprise.id !== entrepriseId)
      );
    } catch (error) {
      console.error('Error deleting entreprise:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setNewEntreprise({
      name: '',
      address: '',
      phone: '',
      url: '',
      email: '',
    });
    setIsModalOpen(false);
    setMode('CREATE');
  };

console.log(entreprises);
  const columns = [
    { id: 'id', label: '#' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'address', label: 'Address' },
    { id: 'url', label: 'url' },

  ];

  return (
    <div>
      <NavBar />
      <div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div>
            <h2>{mode === 'CREATE' ? 'Create' : 'Update'} Entreprise</h2>
            <input
              type="hidden"
              value={newEntreprise.id}
              onChange={(e) => setNewEntreprise({ ...newEntreprise, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Name"
              value={newEntreprise.name}
              onChange={(e) => setNewEntreprise({ ...newEntreprise, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              value={newEntreprise.address}
              onChange={(e) => setNewEntreprise({ ...newEntreprise, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              value={newEntreprise.phone}
              onChange={(e) => setNewEntreprise({ ...newEntreprise, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL"
              value={newEntreprise.url}
              onChange={(e) => setNewEntreprise({ ...newEntreprise, url: e.target.value })}
            />
            <input
              type="text"
              placeholder="Email"
              value={newEntreprise.email}
              onChange={(e) => setNewEntreprise({ ...newEntreprise, email: e.target.value })}
            />
            {mode === "CREATE" ?
              (
                <button onClick={handleCreateEntreprise} >Create</button>
              ) : (
                <button onClick={handleUpdate} >Update</button>
              )
            }
          </div>
        </Modal>
      </div>
      <div>
        <Paper fullWidth sx={{ overflow: 'hidden', m: 2, marginTop: "100px" }}>
          <Box sx={{ display: "flex" }}>
            <Button variant='outlined' sx={{ m: 1 }} onClick={openModal} >
              Add Enterprise
            </Button>
            <Typography variant='h6' component="h1" sx={{ m: 1, marginLeft: "400px" }}>
              Enterprises List
            </Typography>
          </Box>
          <TableComponent columns={columns} data={entreprises} handleUpdate={handleUpdateEntreprise} handleDelete={handleDeleteEntreprise} />
        </Paper>
      </div>
    </div>
  );
};

export default EntreprisePage;
