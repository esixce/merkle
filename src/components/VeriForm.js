// src/components/VerificationForm.js
import React, { useState } from 'react';

const VeriForm = ({ onVerify }) => {
  const [nameToCheck, setNameToCheck] = useState('');
  const [proofInputs, setProofInputs] = useState(['']);

  const handleAddProofInput = () => {
    setProofInputs([...proofInputs, '']);
  };

  const handleProofChange = (index, value) => {
    const updatedProofs = [...proofInputs];
    updatedProofs[index] = value;
    setProofInputs(updatedProofs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onVerify(nameToCheck, proofInputs.join(','));
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
          Proof Steps:
        </label>
        {proofInputs.map((input, index) => (
          <div key={index}>
            <input
              type="text"
              value={input}
              onChange={(e) => handleProofChange(index, e.target.value)}
              placeholder={`Proof Step ${index + 1}`}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddProofInput}>
          Add More
        </button>
      </div>
      <button type="submit">Verify</button>
    </form>
  );
};

export default VeriForm;
