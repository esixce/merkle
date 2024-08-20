// src/utils/csvExport.js
export function exportToCSV(root, namesAndProofs) {
  // First row with the Merkle root
  const header = [`Merkle Root: ${root}`];
  
  // Rows for each name and its corresponding proof hashes
  const rows = namesAndProofs.map(({ name, proof }) => [name, ...proof]);

  // Convert rows to CSV string
  const csvContent = [header, ['Name', 'Proof Hashes'], ...rows].map(e => e.join(',')).join('\n');

  // Create a Blob from the CSV string
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Create a link element to trigger the download
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `merkle_tree_proofs.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
