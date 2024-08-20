// src/App.js
import React, { useState } from 'react';
import './App.css'; // Import the styles
import { MerkleTree } from './components/MerkleTree';
import FileUpload from './components/FileUpload';
import LeavesList from './components/LeavesList';
import ProofDisplay from './components/ProofDisplay';
import VeriForm from './components/VeriForm';
import RootDisplay from './components/RootDisplay';
import { verifName } from './utils/verifName';
import { exportToCSV } from './utils/csvExport'; // Import the CSV export utility

function App() {
  const [leaves, setLeaves] = useState([]);
  const [csvContent, setCsvContent] = useState('');
  const [merkleTree, setMerkleTree] = useState(null);
  const [root, setRoot] = useState('');
  const [proof, setProof] = useState([]);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const text = await file.text();
    const data = text.split(',').map(item => item.trim());
    setLeaves(data);
    setCsvContent(text);
  };

  const handleGenerateTree = async () => {
    const tree = new MerkleTree(leaves);
    await tree.buildTree(leaves);
    setMerkleTree(tree);
    setRoot(tree.getRoot());
  };

  const handleGenerateProof = async (leaf) => {
    if (merkleTree) {
      const proof = await merkleTree.getProof(leaf);
      setProof(proof);
    }
  };

  const handleVerification = async (nameToCheck, proofArray, merkleRoot) => {
    const isNameInTree = await verifName(nameToCheck, proofArray, merkleRoot);
    setVerificationResult(isNameInTree ? 'Name is in the Merkle Tree' : 'Name is NOT in the Merkle Tree');
  };

  const handleExportCSV = async () => {
    if (merkleTree && root) {
      const namesAndProofs = await Promise.all(
        leaves.map(async (name) => {
          const proof = await merkleTree.getProof(name);
          return { name, proof };
        })
      );
      exportToCSV(root, namesAndProofs);
    } else {
      alert('No Merkle Tree available to export.');
    }
  };

  return (
    <div className="App">
      <h1>Merkle Proof</h1>
      <VeriForm onVerify={handleVerification} />
      {verificationResult && <p>{verificationResult}</p>}

      <h1>Merkle Tree</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {csvContent && (
        <div>
          <h3>CSV Content:</h3>
          <pre>{csvContent}</pre>
        </div>
      )}
      <button onClick={handleGenerateTree} disabled={leaves.length === 0}>
        Generate Merkle Tree
      </button>
      <RootDisplay root={root} />

      <button onClick={handleExportCSV} disabled={!merkleTree}>
        Export All Proofs to CSV
      </button>

      {/* <LeavesList leaves={leaves} onGenerateProof={handleGenerateProof} /> */}
      {/* <ProofDisplay proof={proof} /> */}

    </div>
  );
}

export default App;
