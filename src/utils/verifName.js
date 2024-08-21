// src/utils/verifName.js
import { sha256 } from './sha256';

export async function verifName(leaf, proofArray, merkleRoot) {
  let hash = await sha256(leaf);
  console.log('hash', hash);

  for (let siblingHash of proofArray) {
    // if (hash < siblingHash) {
    hash = await sha256(hash + siblingHash);
    // } else {
      // hash = await sha256(siblingHash + hash);
    // }
    console.log('hash + siblingHash', hash);
  }

  console.log('merkleRoot', merkleRoot);
  console.log('hash', hash);
  console.log(hash === merkleRoot);
  console.log(hash == merkleRoot);
  return hash === merkleRoot;
}


// Example usage:
// const root = '4fcfb77eaf9a279c4ff2d20171c1626c2823a82a2cec1ddc0c23dbcb48822e80';
// const proof = [
//   "ca15ebc05a3c5c1348753b209c4452c54022dbe565d9943b11c795e3af9eb0b0",
//   "9855c9f31157005f7f2ff1c7ca91a628f9ed881e2d784cb9cd85f3d5d04a6489"
// ];
// const word = "Portal";

// verifName(word, proof, root).then(isValid => {
//   console.log(isValid ? 'Valid proof' : 'Invalid proof');
// });