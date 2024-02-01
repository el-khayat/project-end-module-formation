import React, { useEffect, useState } from 'react';
import UserFormateurService from '../../services/formateurService';
import NavBar from '../../components/navbar/navbarComponent';
import Modal from '../../components/modal/Modal';
import ConfirmDeleteModal from '../../components/modal/ConfirmDeleteModal';
import { Box, Button, TextField, Paper, Typography } from '@mui/material';
import TableComponent from '../../components/table/tableComponent';
import Autocomplete from '@mui/material/Autocomplete';
import KEYWORDS from '../../utils/keywordsUtil';

const FormateurPage = () => {
  const [formateurs, setFormateurs] = useState([]);
  const [newFormateur, setNewFormateur] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    roles: 'FORMATEUR_ROLE',
    keywords: '',
  });

  const [mode, setMode] = useState('CREATE');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [elementToDeleteName, setElementToDeleteName] = useState('');

  const [input, setInput] = useState([]);
  const onTagsChange = (event, values) => {
    setInput(values);
  };

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
      const keywords = input.join(',');
      const createdFormateur = await UserFormateurService.createFormateur({ ...newFormateur, keywords });
      setFormateurs((prevFormateurs) => [...prevFormateurs, createdFormateur]);
      setNewFormateur({
        name: '',
        email: '',
        password: '',
        phone: '',
        roles: 'FORMATEUR_ROLE',
        keywords: '',
      });
      alert('The Trainer Added');
      closeModal();
    } catch (error) {
      console.error('Error creating formateur:', error);
    }
  };

  const handleUpdateFormateur = async (formateur) => {
    setMode('UPDATE');
    setNewFormateur(formateur);
    setInput(formateur.keywords.split(','));
    openModal();
  };

  const handleDeleteFormateur = async (formateurId) => {
    const formateurToDelete = formateurs.find((formateur) => formateur.id === formateurId);
  
    if (formateurToDelete) {
      setElementToDeleteName(formateurToDelete.name);
      setConfirmDeleteId(formateurId);
      setIsConfirmDeleteModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    try {
      await UserFormateurService.deleteFormateur(confirmDeleteId);
      setFormateurs((prevFormateurs) =>
        prevFormateurs.filter((formateur) => formateur.id !== confirmDeleteId)
      );
      closeModal();
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
    setConfirmDeleteId(null);
    setIsConfirmDeleteModalOpen(false);
  };

  const Update = async () => {
    try {
      const keywords = input.join(',');
      await UserFormateurService.updateFormateur({ ...newFormateur, keywords });
      setFormateurs((prevFormateurs) =>
        prevFormateurs.map((formateur) =>
          formateur.id === newFormateur.id ? { ...newFormateur, keywords } : formateur
        )
      );
      alert('The Trainer Updated');
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
    {
      id: 'actions',
      label: 'Actions',
      render: (formateur) => (
        <>
          <Button onClick={() => handleUpdateFormateur(formateur)}>Update</Button>
          <Button onClick={() => handleDeleteFormateur(formateur.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <NavBar />
      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        itemName={elementToDeleteName}
        text="Are you sure you want to delete the trainer "  
        btn1="Delete"
      />
      <div>

        <Modal isOpen={isModalOpen} onClose={closeModal} style={{ width: '500px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: 500 }} >
            <h2>{mode === 'CREATE' ? 'Create' : 'Update'} Formateur</h2>
            <input
              type="hidden"
              value={newFormateur.id}
              onChange={(e) => setNewFormateur({ ...newFormateur, id: e.target.value })}
            />

            <TextField
              sx={{ my: 2 }}
              required
              label="Name"
              value={newFormateur.name}
              onChange={(e) => setNewFormateur({ ...newFormateur, name: e.target.value })}
            />

            <TextField
              sx={{ my: 2 }}
              required
              label="Email"
              value={newFormateur.email}
              onChange={(e) => setNewFormateur({ ...newFormateur, email: e.target.value })}
            />

            <TextField
              sx={{ my: 2 }}
              required
              label="Phone"
              value={newFormateur.phone}
              onChange={(e) => setNewFormateur({ ...newFormateur, phone: e.target.value })}
            />


            <Autocomplete
              multiple
              options={KEYWORDS}
              getOptionLabel={option => option}
              onChange={onTagsChange}

              defaultValue={input}

              renderInput={params => (
                <TextField
                  {...params}
                  label="Keywords"
                  placeholder="Add keywords"
                  margin="normal"
                  fullWidth
                />
              )}
            />

            {mode === 'CREATE' ? (
              <Button variant="contained" onClick={handleCreateFormateur}>Create</Button>
            ) : (
              <Button variant="contained" onClick={Update}>Update</Button>
            )}
          </Box>
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
