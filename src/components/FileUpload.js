// src/components/FileUpload.js
import React from 'react';

const FileUpload = ({ onFileUpload }) => {
  return (
    <div>
      <input type="file" accept=".csv" onChange={onFileUpload} />
    </div>
  );
};

export default FileUpload;
