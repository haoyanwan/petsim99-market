// PetCard.jsx
import React from 'react';
import { formatValue } from '../utils/shortenValues';
import { formatName } from '../utils/petNames';

const PetCard = ({ pet }) => {
  const { category, configData, value } = pet;
  const { id, pt, sh } = configData;
  const ids = formatName(id, pt, sh);
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-semibold mb-2">{ids}</h3>
      <p className="text-gray-600">Category: {category}</p>
      <p className="text-lg font-bold mt-4">Value: {formatValue(value)}</p>
    </div>
  );
};

export default PetCard;