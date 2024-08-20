// src/App.js
import React, { useState } from 'react';
import { MerkleTree } from './components/MerkleTree';
import FileUpload from './components/FileUpload';
import LeavesList from './components/LeavesList';
import ProofDisplay from './components/ProofDisplay';
import VeriForm from './components/VeriForm';
import RootDisplay from './components/RootDisplay';
import { verifName } from './utils/verifName';
import './App.css';

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

  const handleVerification = async (nameToCheck, proofInput) => {
    if (!nameToCheck || !proofInput) return;

    const proofArray = proofInput.split(',').map(item => item.trim());
    const isNameInTree = await verifName(nameToCheck, proofArray, root);
    setVerificationResult(isNameInTree ? 'Name is in the Merkle Tree' : 'Name is NOT in the Merkle Tree');
  };

  return (
    <div className="App">
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
      <LeavesList leaves={leaves} onGenerateProof={handleGenerateProof} />
      <ProofDisplay proof={proof} />
      <VeriForm onVerify={handleVerification} />
      {verificationResult && <p>{verificationResult}</p>}
    </div>
  );
}

export default App;
