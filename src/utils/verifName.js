// src/utils/verifName.js
import { sha256 } from "../utils/sha256";

export async function verifName(leaf, proofArray, merkleRoot, index) {
  let hash = await sha256(leaf);
  console.log("hash", hash);

  for (let siblingHash of proofArray) {
    console.log("index", index);
    console.log("siblingHash", siblingHash);
    // if (index !== 0 && index % 2 === 0) {
    if (siblingHash < hash) {
      hash = await sha256(siblingHash + hash);
    } else {
      hash = await sha256(hash + siblingHash);
    }
    // Move up the tree: Each step divides the index by 2
    // index = Math.floor(index / 2);

    console.log("hash + siblingHash", hash);
  }

  console.log("merkleRoot", merkleRoot);
  console.log(hash === merkleRoot);
  return hash === merkleRoot;
}
