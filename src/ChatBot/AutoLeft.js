// AutoLeft.js

import React from 'react';
import { useGraphManager } from '../Graph/GraphManager'; // Use GraphManager for nodes
import { useChapter } from '../JsonState';

const AutoLeft = () => {
  const { nodes } = useGraphManager();
  const {
    mode,
    setMode,
    selectedNode, 
    setSelectedNode
  } = useChapter();
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
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
    backgroundColor: '#e0f7fa',
    border: '1px solid #00796b',
  };

  const infoNodes = nodes.filter((node) => node.data.type === 'INFO');

  return (
    <div style={columnStyles} className="column left-column">
      <div style={headerStyles}>
        <h2>Nodes</h2>
        <div>
          <label htmlFor="mode-select">Mode: </label>
          <select id="mode-select" value={mode} onChange={handleModeChange}>
            <option value="Workflow">Workflow</option>
            <option value="Consult">Consult</option>
            <option value="Automation">Automation</option>
          </select>
        </div>
      </div>

      <div className="nodes-list">
        {infoNodes.length === 0 ? (
          <p>No INFO nodes available.</p>
        ) : (
          infoNodes.map((node) => (
            <div
              key={node.id}
              style={{
                marginBottom: '10px',
                padding: '10px',
                border: '1px solid #ccc',
                ...(selectedNode && selectedNode.id === node.id ? selectedNodeStyles : {}),
              }}
              onClick={() => handleNodeSelect(node)}
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
