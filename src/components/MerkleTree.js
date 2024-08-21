// src/MerkleTree.js
import { sha256 } from '../utils/sha256';

export class MerkleTree {
  constructor(leaves) {
    this.leaves = leaves;
    this.tree = [];
    this.steps = [];
  }

  // async buildTree(leaves) {
  //   this.tree = await Promise.all(leaves.map(leaf => sha256(leaf)));
  //   while (this.tree.length > 1) {
  //     const layer = [];
  //     for (let i = 0; i < this.tree.length; i += 2) {
  //       const left = this.tree[i];
  //       const right = this.tree[i + 1] || left;
  //       layer.push(await sha256(left + right));
  //     }
  //     this.tree = layer;
  //   }
  // }

  async buildTree(leaves) {
    let currentLevel = await Promise.all(leaves.map(leaf => sha256(leaf)));
    this.steps.push([...currentLevel]); // Capture initial hashed leaves
    
    while (currentLevel.length > 1) {
      const nextLevel = [];
      for (let i = 0; i < currentLevel.length; i += 2) {
        const left = currentLevel[i];
        const right = currentLevel[i + 1] || left;
        const combinedHash = await sha256(left + right);
        nextLevel.push(combinedHash);
      }
      this.steps.push([...nextLevel]); // Capture each level of the tree
      currentLevel = nextLevel;
    }
    this.tree = currentLevel; // The root is the last remaining hash
  }  

  getRoot() {
    return this.tree[0];
  }

  getSteps() {
    return this.steps;
  }

  async getProof(leaf) {
    const index = this.leaves.findIndex(l => l.trim().toLowerCase() === leaf.trim().toLowerCase());

    if (index === -1) {
      throw new Error('Leaf not found in the tree');
    }

    let proof = [];
    let layerIndex = index;
    let currentLayer = await Promise.all(this.leaves.map(leaf => sha256(leaf.trim().toLowerCase())));

    while (currentLayer.length > 1) {
      let isRightNode = layerIndex % 2;
      let pairIndex = isRightNode ? layerIndex - 1 : layerIndex + 1;

      if (pairIndex < currentLayer.length) {
        proof.push(currentLayer[pairIndex]);
      }

      layerIndex = Math.floor(layerIndex / 2);
      const nextLayer = [];
      for (let i = 0; i < currentLayer.length; i += 2) {
        const left = currentLayer[i];
        const right = currentLayer[i + 1] || left;
        nextLayer.push(await sha256(left + right));
      }
      currentLayer = nextLayer;
    }

    return proof;
  }

  static async verifyProof(leaf, proof, root) {
    let hash = await sha256(leaf);

    for (let siblingHash of proof) {
      if (hash < siblingHash) {
        hash = await sha256(hash + siblingHash);
      } else {
        hash = await sha256(siblingHash + hash);
      }
    }

    return hash === root;
  }
}
