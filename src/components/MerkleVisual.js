// src/components/MerkleTreeDiagram.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MerkleVisual = ({ leaves, merkleTree }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!leaves.length || !merkleTree) return;

    // Setup the SVG element
    const svg = d3.select(svgRef.current)
      .attr('width', 800)
      .attr('height', 600)
      .style('background-color', '#f4f4f4');

    svg.selectAll("*").remove();  // Clear previous drawings

    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const layerHeight = height / (Math.log2(leaves.length) + 2);

    // Function to draw a node
    const drawNode = (x, y, text) => {
      svg.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 20)
        .style('fill', '#007bff');

      svg.append('text')
        .attr('x', x)
        .attr('y', y + 5)
        .attr('text-anchor', 'middle')
        .style('fill', '#fff')
        .style('font-size', '10px')
        .text(text);
    };

    // Function to draw a line between nodes
    const drawLine = (x1, y1, x2, y2) => {
      svg.append('line')
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('stroke', '#ccc')
        .attr('stroke-width', 2);
    };

    // Start drawing from the leaves
    let currentLayer = leaves.map((leaf, index) => ({
      hash: leaf,
      x: width / (leaves.length + 1) * (index + 1),
      y: height - layerHeight
    }));

    currentLayer.forEach(node => drawNode(node.x, node.y, node.hash));

    // Traverse up the tree
    while (currentLayer.length > 1) {
      const nextLayer = [];
      for (let i = 0; i < currentLayer.length; i += 2) {
        const left = currentLayer[i];
        const right = currentLayer[i + 1] || left;
        const combinedHash = `${left.hash}+${right.hash}`;

        const nextNode = {
          hash: combinedHash,
          x: (left.x + right.x) / 2,
          y: left.y - layerHeight
        };

        nextLayer.push(nextNode);

        drawLine(left.x, left.y, nextNode.x, nextNode.y);
        drawLine(right.x, right.y, nextNode.x, nextNode.y);
        drawNode(nextNode.x, nextNode.y, combinedHash);
      }
      currentLayer = nextLayer;
    }

    // Draw the root
    const root = currentLayer[0];
    drawNode(root.x, root.y, 'Root: ' + root.hash);

  }, [leaves, merkleTree]);

  return <svg ref={svgRef}></svg>;
};

export default MerkleVisual;
