// FormationTable.js
import React from 'react';

const FormationTable = ({ formations, enrollButton }) => {
  const handleEnroll = (formationId) => {
    // Implement logic for enrolling in the formation
    console.log(`Enrolling in formation with ID ${formationId}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Number of Hours</th>
          <th>Price</th>
          <th>Description</th>
          <th>Date</th>
          {/* Add more columns as needed */}
          {enrollButton && <th>Enroll</th>}
        </tr>
      </thead>
      <tbody>
        {formations.map((formation) => (
          <tr key={formation.id}>
            <td>{formation.subject}</td>
            <td>{formation.numberHours}</td>
            <td>{formation.price}</td>
            <td>{formation.descreption}</td> {/* Correct property name */}            
            <td>{new Date(formation.date).toLocaleDateString()}</td>
            {/* Add  cells if needed later */}
            {enrollButton && (
              <td>
                <button onClick={() => handleEnroll(formation.id)}>Enroll</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FormationTable;
