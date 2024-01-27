import React, { useEffect, useState } from 'react';
import EntrepriseService from '../../services/entrepriseService';
import NavBar from '../../components/navbar/navbarComponent';
import Modal from '../../components/modal/Modal';
import ReactPaginate from 'react-paginate';

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
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === Math.ceil(entreprises.length / itemsPerPage) - 1;

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

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(0);
  };

  const paginatedEntreprises = entreprises.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
      <NavBar />
      <h1>Entreprise Page</h1>

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
            <button onClick={openModal}>Add Entreprise</button>
          </div>
        </div>

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
        <h2>Entreprises List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>URL</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEntreprises.map((entreprise) => (
              <tr key={entreprise.id}>
                <td>{entreprise.name}</td>
                <td>{entreprise.address}</td>
                <td>{entreprise.phone}</td>
                <td>{entreprise.url}</td>
                <td>{entreprise.email}</td>
                <td>
                  <button onClick={() => handleUpdateEntreprise(entreprise)}>Update</button>
                  <button onClick={() => handleDeleteEntreprise(entreprise.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        pageCount={Math.ceil(entreprises.length / itemsPerPage)}
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

export default EntreprisePage;
