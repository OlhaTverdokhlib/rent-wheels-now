import React, { useState } from 'react';
import carCardStyles from './CarCard.module.scss';
import { FavoriteButton } from 'components/FavoriteButton';
import {
  isFavorite,
  addToFavorites,
  removeFromFavorites,
} from '../../services/favoritesCars';
import { Modal } from '../Modal';

// const formatMileage = mileage => {
//   return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// };

const CarCard = ({ car, onRemoveFavorite }) => {
  const carId = car.id;

  let isCarFavorite = isFavorite(carId);
  const fullAddress = car.address;

  const toggleFavorite = () => {
    if (isCarFavorite) {
      removeFromFavorites(carId);
    } else {
      addToFavorites(carId);
    }
    onRemoveFavorite && onRemoveFavorite();
    isCarFavorite = !isCarFavorite;
  };

  const addressParts = fullAddress.split(',');
  const city = addressParts[1];
  const country = addressParts[2];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // const formattedMileage = formatMileage(car.mileage);

  return (
    <div className={carCardStyles.block}>
      <div className={carCardStyles.block__content}>
        <div className={carCardStyles.block__photo}>
          <img
            className={carCardStyles.block__photo__img}
            src={car.img}
            alt={`${car.make} ${car.model}`}
          ></img>
          <div className={carCardStyles.block__favorite__btn}>
            <FavoriteButton
              isFavorite={isCarFavorite}
              onToggle={toggleFavorite}
            />
          </div>
        </div>
        <div className={carCardStyles.block__review}>
          <div className={carCardStyles.block__review__name}>
            {car.make}&nbsp;
            <span className={carCardStyles.block__review__name__model}>
              {car.model}
            </span>
            , {car.year}
            <p className={carCardStyles.block__review__price}>
              {car.rentalPrice}
            </p>
          </div>
        </div>
        <div className={carCardStyles.block__overview}>
          <span className={carCardStyles.block__overview__items}>{city}</span>
          <span className={carCardStyles.block__overview__items}>
            {country}
          </span>
          <span className={carCardStyles.block__overview__items}>
            {car.rentalCompany}
          </span>
          <span className={carCardStyles.block__overview__items}>
            {car.type}
          </span>
          <span className={carCardStyles.block__overview__items}>
            {car.make}
          </span>
          <span className={carCardStyles.block__overview__items}>
            {car.code}
          </span>
          <span className={carCardStyles.block__overview__items}>
            {car.accessories[0]}
          </span>
        </div>

        <button className={carCardStyles.block__learn__btn } type="button" onClick={openModal}>
          Learn more
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal} car={car}></Modal>
      </div>
    </div>
  );
};

export default CarCard;
