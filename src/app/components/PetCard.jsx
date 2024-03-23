import React from 'react';
import { formatValue } from '../utils/shortenValues';
import { formatName } from '../utils/petNames';
import { getPicture } from '../utils/petPicture'; // Adjust based on your implementation
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Assuming you're using Next.js for navigation

// Custom hook to calculate font size
function useDynamicFontSize(text) {
  const [fontSize, setFontSize] = useState('1rem'); // Default font size

  useEffect(() => {
    // Simple algorithm to adjust font size based on text length
    // You might need to adjust the values based on your design needs
    const baseSize = 20; // Base font size in pixels
    const maxLength = 20; // Max length of text for base size
    const scaleFactor = 0.5; // Scale factor for each character above maxLength

    const adjustedSize = Math.max(baseSize - (text.length - maxLength) * scaleFactor, 12); // Minimum font size: 12px
    setFontSize(`${adjustedSize}px`);
  }, [text]);

  return fontSize;
}


const PetCard = ({ pet }) => {
  const { category, configData, value } = pet;
  var { id, pt, sh } = configData;
  const ids = formatName(id, pt, sh);
  
  const pictureUrl = getPicture(id);
  const dynamicFontSize = useDynamicFontSize(ids);

  //if there is no sh set sh to false
  if (sh === undefined) {
    sh = false;
  }

  //if there is no pt set pt to 0
  if (pt === undefined) {
    pt = 0;
  }

  return (
    <Link href={{
      pathname: '/price-terminal',
      query: { id, pt, sh },
    }} passHref>
    <div className="bg-white rounded-lg p-4 m-4 flex flex-col items-center hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer" style={{ maxWidth: '300px' }}>
      <div className="relative">
        <img src={pictureUrl} alt={ids} style={{ maxHeight: '100px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}/>
      </div>
      <div className="w-full text-center mt-4 text-gray-600">
        <h3 className="text-xl font-semibold mb-2" style={{ fontSize: dynamicFontSize }}>{ids}</h3>
        <p className="text-lg font-bold mt-2">Value: {formatValue(value)}</p>
        <p className="text-gray-600">Category: {category}</p>
      </div>
    </div>
    </Link>
  );
};

export default PetCard;