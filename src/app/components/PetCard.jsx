// PetCard.jsx
import React from 'react';
import { formatValue } from '../utils/shortenValues';
import { formatName } from '../utils/petNames';
import { getPicture } from '../utils/petPicture';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function useDynamicFontSize(text) {
  const [fontSize, setFontSize] = useState('1rem');

  useEffect(() => {
    const baseSize = 20;
    const maxLength = 20;
    const scaleFactor = 0.5;
    const adjustedSize = Math.max(baseSize - (text.length - maxLength) * scaleFactor, 12);
    setFontSize(`${adjustedSize}px`);
  }, [text]);

  return fontSize;
}

const PetCard = ({ pet }) => {
  const { category, configData, value } = pet;
  const { id, pt, sh } = configData;
  const ids = formatName(id, pt, sh);
  const pictureUrl = getPicture(id);
  const dynamicFontSize = useDynamicFontSize(ids);

  return (
    <Link href={{ pathname: '/price-terminal', query: { id, pt, sh } }} passHref>
      <div className="bg-white rounded-lg shadow-md flex flex-col items-center h-full">
        <div className="relative w-50 h-40">
          <img src={pictureUrl} alt={ids} className="w-full h-full object-cover rounded-t-lg" />
        </div>
        <div className="flex-grow p-4 text-center">
          <h3 className="text-xl font-semibold mb-2 overflow-hidden overflow-ellipsis whitespace-nowrap" style={{ fontSize: dynamicFontSize }}>
            {ids}
          </h3>
          <p className="text-lg font-bold mt-2">Value: {formatValue(value)}</p>
          <p className="text-gray-600">Category: {category}</p>
        </div>
      </div>
    </Link>
  );
};

export default PetCard;