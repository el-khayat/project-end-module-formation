import React, { useEffect, useState } from 'react';
import UserFormateurService from '../../services/formateurService';
import NavBar from '../../components/navbar/navbarComponent';
import Modal from '../../components/modal/Modal'; 
import './FormateurPage.css';

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
    setMode('UPDATE')
    setNewFormateur(formateur)
    openModal()
  };
  const Update = async () => {
    try {
      

      await UserFormateurService.updateFormateur(
        newFormateur
      );
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
    setIsModalOpen(false);
  };

  return (
    <div>
      <NavBar />
      <h1>Formateur Page</h1>

      <div>
        <button onClick={openModal}>Add Formateur</button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
        <h2>{ mode==="CREATE"?"Create":"Update"} Formateur</h2>
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
        {mode==="CREATE"?
        (
          <button onClick={ handleCreateFormateur} >Create</button>
        ):(
          <button onClick={ Update} >Update</button>
        )
        }
        
        
      </div>
        </Modal>
      </div>

      <div>
        <h2>Formateurs List</h2>
        <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {formateurs.map((formateur) => (
        <tr key={formateur.id}>
          <td>{formateur.name}</td>
          <td>{formateur.email}</td>
          <td>
            <button onClick={() => handleUpdateFormateur(formateur)}>Update</button>
            <button onClick={() => handleDeleteFormateur(formateur.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
      </div>
    </div>
  );
};

export default FormateurPage;