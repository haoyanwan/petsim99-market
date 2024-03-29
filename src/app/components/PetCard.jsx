import React, { use } from 'react';
import { formatValue } from '../utils/shortenValues';
import { formatName } from '../utils/petNames';
import { getPicture } from '../utils/petPicture';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

// Import the star icon from react-icons
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

  // If there is no sh set sh to false
  if (sh === undefined) {
    sh = false;
  }

  // If there is no pt set pt to 0
  if (pt === undefined) {
    pt = 0;
  }

  const ids = formatName(id, pt, sh);
  let pictureUrl = getPicture(id);

  // If pictureUrl is empty or undefined, replace it with the default image path
  if (!pictureUrl) {
    pictureUrl = '/Noimagefound.png';
  }

  const dynamicFontSize = useDynamicFontSize(ids);
  const [isFavorite, setIsFavorite] = useState(false);

  let borderStyle = {};
  if (pt === 1) {
    borderStyle = { border: '4px solid', borderColor: '#f59e0b' };
  } else if (pt === 2) {
    borderStyle = {
      border: '4px solid',
      borderImage: 'linear-gradient(to right, #ef4444, #f59e0b, #a855f7) 1',
    };
  }

  let shinyClass = '';
  if (sh) {
    shinyClass =
      'relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:animate-shiny';
  }

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(storedFavorites.includes(ids));
  }, [ids]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = isFavorite
      ? storedFavorites.filter((favoriteId) => favoriteId !== ids)
      : [...storedFavorites, ids];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Link href={{ pathname: '/price-terminal', query: { id, pt, sh } }} passHref>
      <div
        className={`bg-bright rounded-lg shadow-md flex flex-col items-center h-full relative ${shinyClass}`}
        style={borderStyle}
      >
        <div className={`relative w-50 ${pt === 0 ? 'h-40' : 'h-40'}`}>
          <img
            src={pictureUrl}
            alt={ids}
            className="w-full h-full pt-5 object-cover rounded-t-lg"
          />
        </div>
        <div className="absolute top-2 right-2">
          <FaStar color={isFavorite ? 'gold' : 'gray'} size={24} onClick={handleFavoriteClick} />
        </div>
        <div className="flex-grow p-4 text-center">
          <h3
            className="text-xl text-gray-300 font-semibold mb-2 overflow-hidden overflow-ellipsis whitespace-nowrap"
            style={{ fontSize: dynamicFontSize }}
          >
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