// ColumnRight.js
import React from 'react';

const ColumnRight = () => {
  const columnStyles = {
    border: '1px solid #ddd',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  };

  return (
    <div style={columnStyles} className="column">
      <h2>Column 3</h2>
      <p>Content for the third column.</p>
    </div>
  );
};

export default ColumnRight;