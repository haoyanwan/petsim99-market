import React from 'react';
import { formatValue } from '../utils/shortenValues';
import { formatName } from '../utils/petNames';
import { getPicture } from '../utils/petPicture'; // Adjust based on your implementation

const PetCard = ({ pet }) => {
  const { category, configData, value } = pet;
  const { id, pt, sh } = configData;
  const ids = formatName(id, pt, sh);

  const pictureUrl = getPicture(id);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center" style={{ maxWidth: '300px' }}> {/* Adjust maxWidth as needed */}
      <div className="relative">
        <img src={pictureUrl} alt={ids} style={{ maxHeight: '100px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}/> {/* Adjust maxHeight as needed */}
      </div>
      <div className="w-full text-center mt-4"> {/* Increased margin-top */}
        <h3 className="text-xl font-semibold mb-2">{ids}</h3>
        <p className="text-lg font-bold mt-2">Value: {formatValue(value)}</p>
        <p className="text-gray-600">Category: {category}</p>

      </div>
    </div>
  );
};

export default PetCard;