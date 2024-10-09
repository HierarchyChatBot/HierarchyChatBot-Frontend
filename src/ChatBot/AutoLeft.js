// AutoLeft.js

import React from 'react';
import { useGraphManager } from '../Graph/GraphManager'; // Use GraphManager for nodes
import { useChapter } from '../JsonState';

const AutoLeft = ({ selectedNode, setSelectedNode }) => {
  // Access nodes from GraphManager
  const { nodes } = useGraphManager();
  const {
    mode,
    setMode,
  } = useChapter();
  
  // Handle mode change
  const handleModeChange = (e) => {
    setMode(e.target.value); // Change mode when dropdown is used
  };

  const columnStyles = {
    border: '1px solid #ddd',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    overflowY: 'auto',
    maxHeight: '80vh',
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const selectedNodeStyles = {
    backgroundColor: '#e0f7fa', // Light blue background for selected node
    border: '1px solid #00796b', // Darker border for selected node
  };

  // Handle node selection
  const handleNodeSelect = (node) => {
    setSelectedNode(node); // Update selected node
  };

  // Filter nodes to show only those with type "INFO"
  const infoNodes = nodes.filter(node => node.data.type === "INFO");

  return (
    <div style={columnStyles} className="column left-column">
      {/* Flex container for header */}
      <div style={headerStyles}>
        <h2>Nodes</h2>

        {/* Dropdown for mode selection */}
        <div>
          <label htmlFor="mode-select">Mode: </label>
          <select id="mode-select" value={mode} onChange={handleModeChange}>
            <option value="Workflow">Workflow</option>
            <option value="Consult">Consult</option>
            <option value="Automation">Automation</option>
          </select>
        </div>
      </div>

      {/* Display only "INFO" nodes */}
      <div className="nodes-list">
        {infoNodes.length === 0 ? (
          <p>No INFO nodes available.</p> // Show a message if no INFO nodes
        ) : (
          infoNodes.map((node) => (
            <div 
              key={node.id} 
              style={{ 
                marginBottom: '10px', 
                padding: '10px', 
                border: '1px solid #ccc', 
                ...(selectedNode && selectedNode.id === node.id ? selectedNodeStyles : {}) // Apply styles if selected
              }} 
              onClick={() => handleNodeSelect(node)} // Handle node click
            >
              <p><strong>Node ID:</strong> {node.id}</p>
              <p><strong>Node Type:</strong> {node.data.type}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AutoLeft;
