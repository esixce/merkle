// src/utils/verifName.js
import { sha256 } from './sha256';

export async function verifName(name, proof, root) {
  let hash = await sha256(name.trim().toLowerCase());

  console.log(`Initial hash of name ("${name}"): ${hash}`);

  for (let i = 0; i < proof.length; i++) {
    const proofElement = proof[i].trim();
    const combined = hash < proofElement ? hash + proofElement : proofElement + hash;
    hash = await sha256(combined);

    console.log(`After step ${i + 1}, combined hash: ${combined}, resulting hash: ${hash}`);
  }

  console.log(`Final computed hash: ${hash}`);
  console.log(`Expected root hash: ${root}`);

  return hash === root;
}
