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
  var { id, pt, sh } = configData;
    //if there is no sh set sh to false
    if (sh === undefined) {
      sh = false;
    }
  
    //if there is no pt set pt to 0
    if (pt === undefined) {
      pt = 0;
    }
  const ids = formatName(id, pt, sh);
  const pictureUrl = getPicture(id);
  const dynamicFontSize = useDynamicFontSize(ids);
  return (
    <Link href={{ pathname: '/price-terminal', query: { id, pt, sh } }} passHref>
      <div className="bg-bright rounded-lg shadow-md flex flex-col items-center h-full">
        <div className="relative w-50 h-40">
          <img src={pictureUrl} alt={ids} className="w-full h-full pt-5 object-cover rounded-t-lg" />
        </div>
        <div className="flex-grow p-4 text-center">
          <h3 className="text-xl text-gray-300 font-semibold mb-2 overflow-hidden overflow-ellipsis whitespace-nowrap" style={{ fontSize: dynamicFontSize }}>
            {ids}
          </h3>
          <p className="text-lg text-gray-300 font-bold mt-2">Value: {formatValue(value)}</p>
          <p className="text-gray-300">Category: {category}</p>
        </div>
      </div>
    </Link>
  );
};

export default PetCard;