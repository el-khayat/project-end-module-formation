import React, { useEffect, useState } from 'react';
import UserFormateurService from '../../services/formateurService';
import NavBar from '../../components/navbar/navbarComponent';
import Modal from '../../components/modal/Modal';
import './FormateurPage.css';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
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

  const [mode, setMode] = useState('CREATE'); // CREATE | UPDATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
      setNewFormateur({ ...newFormateur, keywords: input.join(',') });
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
    await setNewFormateur(formateur);
    await setInput(formateur.keywords.split(','));
    console.log("input", input);
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
      await UserFormateurService.updateFormateur({ ...newFormateur, keywords: input.join(',') });
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

        <Modal isOpen={isModalOpen} onClose={closeModal} style={{ width:'500px' }}>
          <Box  sx={{display:'flex',flexDirection:'column',width:500}} >
            <h2>{mode === 'CREATE' ? 'Create' : 'Update'} Formateur</h2>
            <input
              type="hidden"
              value={newFormateur.id}
              onChange={(e) => setNewFormateur({ ...newFormateur, id: e.target.value })}
            />

            <TextField
            sx={{my:2}}
              required
              label="Name"
              value={newFormateur.name}
              onChange={(e) => setNewFormateur({ ...newFormateur, name: e.target.value })}
            />

            <TextField
            sx={{my:2}}
              required
              label="Email"
              value={newFormateur.email}
              onChange={(e) => setNewFormateur({ ...newFormateur, email: e.target.value })}
            />

            <TextField
            sx={{my:2}}
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
                    // variant="standard"
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
