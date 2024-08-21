// src/components/VerificationForm.js
import React, { useState } from 'react';

const VeriForm = ({ onVerify }) => {
  const [nameToCheck, setNameToCheck] = useState('');
  const [proofInput, setProofInput] = useState('');
  const [merkleRoot, setMerkleRoot] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const proofArray = proofInput.split(',').map(item => item.trim());
    onVerify(nameToCheck, proofArray, merkleRoot);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={nameToCheck}
            onChange={(e) => setNameToCheck(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Proof Steps (comma-separated):
          <input
            type="text"
            value={proofInput}
            onChange={(e) => setProofInput(e.target.value)}
            placeholder="Enter proof steps, separated by commas"
          />
        </label>
      </div>
      <div>
        <label>
          Merkle Root:
          <input
            type="text"
            value={merkleRoot}
            onChange={(e) => setMerkleRoot(e.target.value)}
            placeholder="Enter the Merkle root"
          />
        </label>
      </div>
      <button type="submit">Verify</button>
    </form>
  );
};

export default VeriForm;
