// src/components/LeavesList.js
import React from 'react';

const LeavesList = ({ leaves, onGenerateProof }) => {
  return (
    <ul>
      {leaves.map((leaf, index) => (
        <li key={index}>
          {leaf} <button onClick={() => onGenerateProof(leaf)}>Generate Proof</button>
        </li>
      ))}
    </ul>
  );
};

export default LeavesList;
