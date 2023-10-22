import React, { useState, useEffect } from 'react';
import buttonFavoriteStyles from "./FavoriteButton.module.scss";



const FavoriteButton = ({ isFavorite, onToggle }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const handleClick = () => {
    setFavorite(!favorite);
    onToggle(!favorite);
  };

    return (
      <>
        <button
          className={buttonFavoriteStyles.block} 
          onClick={handleClick}
        >
          <svg
            className={`${buttonFavoriteStyles.block__icon} ${
              favorite ? buttonFavoriteStyles.block__icon__favorite : ''
            }`}
            width={18}
            height={18}
          >
            <use
              href="/images/sprite.svg#icon-heart"
            
            ></use>
          </svg>
        </button>

        <svg
          // className={`${buttonFavoriteStyles.block__icon} ${
          //   favorite ? buttonFavoriteStyles.block__icon__favorite : ''
          // }`}
          width={16}
          height={16}
        >
          <use href="/images/sprite.svg#icon-download"></use>
        </svg>
      </>
    );
};

export default FavoriteButton;


