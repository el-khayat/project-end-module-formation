import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import NavBar from '../../components/navbar/navbarComponent';
import FormationsTable from './FormationsTable';
import FormationForm from './FormationForm';
import FormationService from '../../services/formationServices';
import Modal from '../../components/modal/Modal';
import "./formation.css"

const FormationsPage = () => {
  const [formations, setFormations] = useState([]);
  const [formToEdit, setFormToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === Math.ceil(formations.length / itemsPerPage) - 1;

  useEffect(() => {
    FormationService.getAllFormations()
      .then(response => {
        console.log('Formations data retrieved:', response);
        setFormations(response);
      })
      .catch(error => {
        console.error('Error fetching formations:', error);
      });
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(0);
  };

  const paginatedFormations = formations.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleAddFormation = () => {
    setFormToEdit(null);
    setIsModalOpen(true);
  };

  const handleUpdateFormation = (formationId) => {
    const formationToUpdate = formations.find((formation) => formation.id === formationId);

    console.log('Update clicked for formation:', formationToUpdate);

    setFormToEdit(formationToUpdate);
    setIsModalOpen(true);
  };

  const handleDeleteFormation = (formationId) => {
    FormationService.deleteFormation(formationId)
      .then(() => {
        console.log('Formation deleted:', formationId);
        setFormations(prevFormations =>
          prevFormations.filter(formation => formation.id !== formationId)
        );
      })
      .catch(error => {
        console.error('Error deleting formation:', error);
      });
  };

  const handleFormClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (formToEdit) {
        console.log('Update the record');
        await FormationService.updateFormation(formData);
      } else {
        console.log('Create new record');
        await FormationService.createFormation(formData);
      }

      setIsModalOpen(false);
      const updatedFormations = await FormationService.getAllFormations();
      setFormations(updatedFormations);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <h1>List of Formations</h1>

      <Modal isOpen={isModalOpen} onClose={handleFormClose}>
        <FormationForm
          formToEdit={formToEdit}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      </Modal>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px',marginLeft:"20px" }}>
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
          <button onClick={handleAddFormation}>Add Formation</button>
        </div>
      </div>

      <FormationsTable
        formations={paginatedFormations}
        onUpdateFormation={handleUpdateFormation}
        onDeleteFormation={handleDeleteFormation}
      />

      <ReactPaginate
        pageCount={Math.ceil(formations.length / itemsPerPage)}
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

export default FormationsPage;
