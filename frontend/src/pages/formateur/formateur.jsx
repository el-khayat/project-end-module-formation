import React, { useEffect, useState } from 'react';
import UserFormateurService from '../../services/formateurService';
import NavBar from '../../components/navbar/navbarComponent';
import Modal from '../../components/modal/Modal';
import ReactPaginate from 'react-paginate';
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
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === Math.ceil(formateurs.length / itemsPerPage) - 1;

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

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(0);
  };

  const paginatedFormateurs = formateurs.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

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

  return (
    <div>
      <NavBar />
      <h1>Formateur Page</h1>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', marginLeft: '20px' }}>
          <div style={{ textAlign: "right", marginRight: "50px" }}>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={30}>30</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div>
            <button onClick={openModal}>Add Formateur</button>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
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
        <h2>Formateurs List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Keyword</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFormateurs.map((formateur) => (
              <tr key={formateur.id}>
                <td>{formateur.name}</td>
                <td>{formateur.email}</td>
                <td>{formateur.phone}</td>
                <td>{formateur.keywords}</td>
                <td>
                  <button onClick={() => handleUpdateFormateur(formateur)}>Update</button>
                  <button onClick={() => handleDeleteFormateur(formateur.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        pageCount={Math.ceil(formateurs.length / itemsPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        previousLabel={
          <button
            className={`pagination-btn ${isFirstPage ? 'disabled' : ''}`}
            disabled={isFirstPage}
          >
            ❮ Previous
          </button>
        }
        nextLabel={
          <button
            className={`pagination-btn ${isLastPage ? 'disabled' : ''}`}
            disabled={isLastPage}
          >
            Next ❯
          </button>
        }
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageClassName={'page'}
        previousClassName={'previous'}
        nextClassName={'next'}
        disabledClassName={'disabled'}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}
      />
    </div>
  );
};

export default FormateurPage;
