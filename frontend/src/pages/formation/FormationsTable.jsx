import React from 'react';

const FormationsTable = ({ formations, onUpdateFormation, onDeleteFormation }) => {
  return (
    <table className="formations-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Number of Hours</th>
          <th>Price</th>
          <th>Description</th>
          <th>Subject</th>
          <th>City</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {formations.map((formation) => (
          <tr key={formation.id}>
            <td>{formation.id}</td>
            <td>{formation.numberHours}</td>
            <td>{formation.price}</td>
            <td>{formation.descreption}</td> {/* Corrected property name */}
            <td>{formation.subject}</td>
            <td>{formation.city}</td>
            <td>{new Date(formation.date).toLocaleDateString()}</td>
            <td>
            <button onClick={() => onUpdateFormation(formation.id)}>Update</button>
            <button onClick={() => onDeleteFormation(formation.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FormationsTable;