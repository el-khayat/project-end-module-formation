import React, { useEffect, useState } from 'react';
import UserAssistantService from '../../services/assistantService';
import NavBar from '../../components/navbar/navbarComponent';
import Modal from '../../components/modal/Modal';
import ConfirmDeleteModal from '../../components/modal/ConfirmDeleteModal';
import { Box, Button, TextField, Paper, Typography } from '@mui/material';
import TableComponent from '../../components/table/tableComponent';


const AssistantPage = () => {
  const [assistants, setAssistants] = useState([]);
  const [newAssistant, setNewAssistant] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    roles: 'ASSISTANT_ROLE',
  });

  const [mode, setMode] = useState('CREATE');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [elementToDeleteName, setElementToDeleteName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assistantsData = await UserAssistantService.getAllAssistants();
        setAssistants(assistantsData);
      } catch (error) {
        console.error('Error fetching assistants:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateAssistant = async () => {
    try {
      const createdAssistant = await UserAssistantService.createAssistant(newAssistant);
      setAssistants((prevAssistants) => [...prevAssistants, createdAssistant]);
      setNewAssistant({
        name: '',
        email: '',
        phone: '',
        roles: 'ASSISTANT_ROLE',
      });
      alert('The Assistant Added');
      closeModal();
    } catch (error) {
      console.error('Error creating assistant:', error);
    }
  };

  const handleUpdateAssistant = async (assistant) => {
    setMode('UPDATE');
    setNewAssistant(assistant);
    openModal();
  };

  const handleDeleteAssistant = async (assistantId) => {
    const assistantToDelete = assistants.find((assistant) => assistant.id === assistantId);
  
    if (assistantToDelete) {
      setElementToDeleteName(assistantToDelete.name);
      setConfirmDeleteId(assistantId);
      setIsConfirmDeleteModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    try {
      await UserAssistantService.deleteAssistant(confirmDeleteId);
      setAssistants((prevAssistants) =>
        prevAssistants.filter((assistant) => assistant.id !== confirmDeleteId)
      );
      closeModal();
    } catch (error) {
      console.error('Error deleting assistant:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setNewAssistant({
      name: '',
      email: '',
      phone: '',
      roles: 'ASSISTANT_ROLE',
    });
    setIsModalOpen(false);
    setMode('CREATE');
    setConfirmDeleteId(null);
    setIsConfirmDeleteModalOpen(false);
  };

  const Update = async () => {
    try {
      await UserAssistantService.updateAssistant(newAssistant);
      setAssistants((prevAssistants) =>
        prevAssistants.map((assistant) =>
          assistant.id === newAssistant.id ? newAssistant : assistant
        )
      );
      alert('The Assistant Updated');
      closeModal();
    } catch (error) {
      console.error('Error updating assistant:', error);
    }
  };

  const columns = [
    { id: 'id', label: '#' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    {
      id: 'actions',
      render: (assistant) => (
        <>
          <Button onClick={() => handleUpdateAssistant(assistant)}>Update</Button>
          <Button onClick={() => handleDeleteAssistant(assistant.id)}>Delete</Button>
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
        text="Are you sure you want to delete the assistant "
        btn1="Delete"
      />
      <div>
        <Modal isOpen={isModalOpen} onClose={closeModal} style={{ width: '500px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: 500 }} >
            <h2>{mode === 'CREATE' ? 'Create' : 'Update'} Assistant</h2>
            <input
              type="hidden"
              value={newAssistant.id}
              onChange={(e) => setNewAssistant({ ...newAssistant, id: e.target.value })}
            />

            <TextField
              sx={{ my: 2 }}
              required
              label="Name"
              value={newAssistant.name}
              onChange={(e) => setNewAssistant({ ...newAssistant, name: e.target.value })}
            />

            <TextField
              sx={{ my: 2 }}
              required
              label="Email"
              value={newAssistant.email}
              onChange={(e) => setNewAssistant({ ...newAssistant, email: e.target.value })}
            />

            <TextField
              sx={{ my: 2 }}
              required
              label="Phone"
              value={newAssistant.phone}
              onChange={(e) => setNewAssistant({ ...newAssistant, phone: e.target.value })}
            />


            {mode === 'CREATE' ? (
              <Button variant="contained" onClick={handleCreateAssistant}>Create</Button>
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
              Add Assistant
            </Button>
            <Typography variant='h6' component="h1" sx={{ m: 1, marginLeft: "400px" }}>
              Assistants List
            </Typography>
          </Box>
          <TableComponent columns={columns} data={assistants} handleUpdate={handleUpdateAssistant} handleDelete={handleDeleteAssistant} />
        </Paper>
      </div>
    </div>
  );
};

export default AssistantPage;
