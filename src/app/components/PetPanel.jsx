// PetPanel.jsx
import React, { useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import PetCard from './PetCard';

const PetPanel = ({ pets }) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - 100);
    };

    handleResize(); // Set initial height

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderRow = ({ index, style }) => {
    const startIndex = index * 4;
    const endIndex = startIndex + 4;
    const rowPets = pets.slice(startIndex, endIndex);

    return (
      <div style={style}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rowPets.map((pet, i) => (
            <PetCard key={startIndex + i} pet={pet} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <List
      height={height}
      itemCount={Math.ceil(pets.length / 4)}
      itemSize={200}
      width="100%"
    >
      {renderRow}
    </List>
  );
};

export default PetPanel;