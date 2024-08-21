// src/MerkleTree.js
import { sha256 } from '../utils/sha256';

export class MerkleTree {
  constructor(leaves) {
    this.leaves = leaves;
    this.tree = [];
    this.steps = [];
    this.proofs = {};
  }

  async buildTree(leaves) {
    let currentLevel = await Promise.all(leaves.map(leaf => sha256(leaf)));
    this.steps.push([...currentLevel]);

    while (currentLevel.length > 1) {
      const nextLevel = [];
      for (let i = 0; i < currentLevel.length; i += 2) {
        let left = currentLevel[i];
        let right = currentLevel[i + 1] || left;

        if (left > right) {
          console.log('left > right');
          [left, right] = [right, left];
        }

        const combinedHash = await sha256(left + right);
        nextLevel.push(combinedHash);
      }
      this.steps.push([...nextLevel]);
      currentLevel = nextLevel;
    }

    // Save the root as the last remaining hash
    this.tree = currentLevel;

    // Generate proofs for all leaves
    this.generateProofs();
  }

  generateProofs() {
    this.leaves.forEach((leaf, index) => {
      this.proofs[leaf] = this.generateProof(index);
    });
  }
  
  generateProof(leafIndex) {
    let proof = [leafIndex+1];
    let currentLayerIndex = leafIndex;
  
    // Traverse the tree from the leaf to the root
    for (let i = 0; i < this.steps.length - 1; i++) {
      const layer = this.steps[i];
      const isRightNode = currentLayerIndex % 2 === 1; // True if the node is on the right
  
      // Determine the sibling index based on whether the current node is on the left or right
      const siblingIndex = isRightNode ? currentLayerIndex - 1 : currentLayerIndex + 1;
  
      if (siblingIndex < layer.length) {
        proof.push(layer[siblingIndex]);
      }
  
      // Move to the next layer up (parent node)
      currentLayerIndex = Math.floor(currentLayerIndex / 2);
    }
      
    return proof;
  }
  

  getRoot() {
    return this.tree[0];
  }

  getProof(leaf) {
    return this.proofs[leaf];
  }

  getSteps() {
    return this.steps;
  }

}
