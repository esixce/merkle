// src/components/MerkleTreeVisualization.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const MerkleVisual = ({ tree, leaves }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!tree || !leaves.length) return;

    const width = 800;
    const height = 400;
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid black");

    // Clear previous content
    svg.selectAll("*").remove();

    // Create a hierarchical structure for D3
    const data = {
      name: "Root",
      children: [],
    };

    // Recursively build the tree structure
    const buildTree = (nodes, level = 0) => {
      if (level >= nodes.length) return null;
      const currentLevel = nodes[level];
      const parentNodes = [];
      for (let i = 0; i < currentLevel.length; i += 2) {
        const left = currentLevel[i];
        const right = currentLevel[i + 1] || left;
        const parentNode = {
          name: `${left.slice(0, 6)}...`,
          children: [left, right].filter(Boolean).map((hash) => ({
            name: `${hash.slice(0, 6)}...`,
          })),
        };
        parentNodes.push(parentNode);
      }
      data.children = parentNodes;
      buildTree(nodes, level + 1);
    };

    buildTree([leaves, ...tree]);

    const root = d3.hierarchy(data);

    const treeLayout = d3.tree().size([width - 40, height - 40]);
    treeLayout(root);

    const linkGenerator = d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x);

    // Links
    svg.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", linkGenerator)
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2);

    // Nodes
    svg.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("cx", d => d.y)
      .attr("cy", d => d.x)
      .attr("r", 4)
      .attr("fill", "#555");

    // Labels
    svg.selectAll(".label")
      .data(root.descendants())
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", d => d.y + 6)
      .attr("y", d => d.x + 4)
      .text(d => d.data.name);
  }, [tree, leaves]);

  return <svg ref={svgRef}></svg>;
};

export default MerkleVisual;
