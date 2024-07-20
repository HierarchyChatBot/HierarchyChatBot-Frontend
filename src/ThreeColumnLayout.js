// ThreeColumnLayout.js

import React from 'react';
import ColumnLeft from './ColumnLeft';
import ColumnMiddle from './ColumnMiddle';
import ColumnRight from './ColumnRight';

const ThreeColumnLayout = () => {
  const baseStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '10px',
    padding: '10px',
  };

  return (
    <div style={baseStyles} className="three-column-layout">
      <ColumnLeft />
      <ColumnMiddle />
      <ColumnRight />
    </div>
  );
};

export default ThreeColumnLayout;