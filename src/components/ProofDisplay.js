import React from 'react';

const ProofDisplay = ({ proof }) => {
  const preStyle = {
    whiteSpace: 'pre-wrap',  // Allows the text to wrap
    wordBreak: 'break-word', // Breaks long words if necessary
  };

  return (
    <div>
      <h3>Proof</h3>
      <pre style={preStyle}>{proof.join(', ')}</pre> {/* Join the proof array into a string with commas */}
    </div>
  );
};

export default ProofDisplay;
