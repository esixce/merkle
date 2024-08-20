// src/components/ProofDisplay.js
import React from 'react';

const ProofDisplay = ({ proof }) => {
  return (
    <div>
      <h3>Proof</h3>
      <pre>{JSON.stringify(proof, null, 2)}</pre>
    </div>
  );
};

export default ProofDisplay;
