import React, { useEffect, useState } from 'react';
import { CarCard } from '../CarCard';
import { getFavorites, removeFromFavorites } from '../../services/favoritesCars';
import fetchCars from '../../services/fetchCars';

const FavoritesList = () => {
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [allCars, setAllCars] = useState([]);

  const getFavoritesList = data => {
    const favoriteCarIds = getFavorites();
    const fCars = data.filter(car => favoriteCarIds.includes(car.id));
    setFavoriteCars(fCars);
  };

  useEffect(() => {
    fetchCars()
      .then(data => {
        setAllCars(data);
        getFavoritesList(data);
      })
      .catch(error => {
        console.error('Помилка під час отримання даних:', error);
      });
  }, []);

  const handleRemoveFavorite = car => {
    removeFromFavorites(car.id);
    getFavoritesList(allCars);
  };

  return (
    <div>
      <h1>Favorites</h1>
      {favoriteCars.length > 0 ? (
        favoriteCars.map(car => (
          <CarCard
            key={car.id}
            car={car}
            onRemoveFavorite={() => handleRemoveFavorite(car)}
          />
        ))
      ) : (
        <p>You have no favorite cars</p>
      )}
    </div>
  );
};

export default FavoritesList;
