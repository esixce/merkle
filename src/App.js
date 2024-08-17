// src/App.js
import React, { useState } from 'react';
import * as d3 from 'd3';
import { MerkleTree } from './components/MerkleTree';

function App() {
  const [leaves, setLeaves] = useState([]);
  const [csvContent, setCsvContent] = useState(''); // State to store CSV content
  const [merkleTree, setMerkleTree] = useState(null);
  const [root, setRoot] = useState('');
  const [proof, setProof] = useState([]);
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const text = await file.text();
    const data = text.split(',').map(item => item.trim()); // Split by commas and trim any extra spaces
    setLeaves(data);
    setCsvContent(text); // Store the raw CSV content
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

  return (
    <div className="App">
      <h1>Merkle Tree</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {csvContent && (
        <div>
          <h3>CSV Content:</h3>
          <pre>{csvContent}</pre>
        </div>
      )}
      <button onClick={handleGenerateTree} disabled={leaves.length === 0}>
        Generate Merkle Tree
      </button>
      <h2>Root: {root}</h2>
      <h3>Leaves</h3>
      <ul>
        {leaves.map((leaf, index) => (
          <li key={index}>
            {leaf} <button onClick={() => handleGenerateProof(leaf)}>Generate Proof</button>
          </li>
        ))}
      </ul>
      <h3>Proof</h3>
      <pre>{JSON.stringify(proof, null, 2)}</pre>
    </div>
  );
}

export default App;
