// AutoMiddle.js

import React, { useEffect, useState } from 'react';
import { useGraphManager } from '../Graph/GraphManager';
import { useChapter } from '../JsonState';

const AutoMiddle = () => {
  const { setNodes } = useGraphManager();
  const { selectedNode } = useChapter(); // Use selectedNode from useChapter
  const [description, setDescription] = useState('');
  const [info, setInfo] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setDescription(selectedNode.data.description || '');
      setInfo(selectedNode.data.info || '');
    }
  }, [selectedNode]);

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);

    if (selectedNode) {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  description: newDescription
                },
              }
            : node
        )
      );
    }
  };

  const handleInfoChange = (e) => {
    const newInfo = e.target.value;
    setInfo(newInfo);

    if (selectedNode) {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  info: newInfo
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
          rows="10"
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div>
        <label htmlFor="description">Data:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          rows="10"
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
    </div>
  );
};

export default AutoMiddle;
