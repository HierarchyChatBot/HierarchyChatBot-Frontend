// AutoMiddle.js

import React, { useEffect, useState } from 'react';
import { useGraphManager } from '../Graph/GraphManager';

const AutoMiddle = ({ selectedNode, setSelectedNode }) => {
  const { nodes, setNodes } = useGraphManager(); // Access nodes and setNodes
  const [description, setDescription] = useState('');
  const [info, setInfo] = useState('');

  // Set the local state when the selectedNode changes
  useEffect(() => {
    if (selectedNode) {
      setDescription(selectedNode.data.description || '');
      setInfo(selectedNode.data.info || '');
    }
  }, [selectedNode]);

  // Handle changes to the description field
  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);

    // Update the selected node in GraphManager
    if (selectedNode) {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  description: newDescription, // Update the description in the selectedNode
                },
              }
            : node
        )
      );
    }
  };

  // Handle changes to the info field
  const handleInfoChange = (e) => {
    const newInfo = e.target.value;
    setInfo(newInfo);

    // Update the selected node in GraphManager
    if (selectedNode) {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  info: newInfo, // Update the info in the selectedNode
                },
              }
            : node
        )
      );
    }
  };

  if (!selectedNode) {
    return <p>Please select a node to see its details.</p>;
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
      <h3>Node Details</h3>
      <div style={{ marginTop: '10px' }}>
        <label htmlFor="info">Question:</label>
        <textarea
          id="info"
          value={info}
          onChange={handleInfoChange}
          rows="4" // Number of rows for the textarea
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div>
        <label htmlFor="description">Data:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          rows="4" // Number of rows for the textarea
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
    </div>
  );
};

export default AutoMiddle;
