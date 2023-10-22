import React from 'react';
import { CarCard } from '../CarCard';
import carListStyle from './CarList.module.scss';

const CarList = ({ cars, favoriteCars, toggleFavorite, openModal }) => {
  return (
    <>
      <ul className={carListStyle.list}>
        {cars.map(car => (
          <li key={car.id} className={carListStyle.item}>
            <CarCard
              car={car}
              isFavorite={favoriteCars.some(
                favoriteCar => favoriteCar.id === car.id
              )}
              toggleFavorite={toggleFavorite}
              openModal={openModal}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
export default CarList;
