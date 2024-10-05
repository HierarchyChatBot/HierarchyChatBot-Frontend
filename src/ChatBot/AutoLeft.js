// AutoLeft.js

import React from 'react';
import { useGraphManager } from '../Graph/GraphManager'; // Use GraphManager for nodes
import { useChapter } from '../JsonState';

const AutoLeft = () => {
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

      {/* Display each node's ID and type */}
      <div className="nodes-list">
        {nodes.map((node) => (
          <div key={node.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <p><strong>Node ID:</strong> {node.id}</p>
            <p><strong>Node Type:</strong> {node.data.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoLeft;
