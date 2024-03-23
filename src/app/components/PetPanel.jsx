// PetPanel.jsx
import React from 'react';
import PetCard from './PetCard';

const PetPanel = ({ pets, limit }) => {
  const limitedPets = pets.slice(0, limit);

  return (
    <div className="flex flex-wrap justify-between pt-4 gap-2">
      {limitedPets.map((pet, index) => (
        <div className="w-64">
          <PetCard pet={pet} />
        </div>
      ))}
    </div>
  );
};

PetPanel.defaultProps = {
  limit: 36, // Default limit if not provided
};

export default PetPanel;