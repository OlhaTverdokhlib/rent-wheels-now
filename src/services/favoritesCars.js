export const addToFavorites = carId => {
  const favorites = getFavorites();
  if (!favorites.includes(carId)) {
    favorites.push(carId);
    saveFavorites(favorites);
  }
};

export const removeFromFavorites = carId => {
  const favorites = getFavorites();
  const index = favorites.indexOf(carId);
  if (index !== -1) {
    favorites.splice(index, 1);
    saveFavorites(favorites);
  }
};

export const isFavorite = carId => {
  const favorites = getFavorites();
  return favorites.includes(carId);
};

export const getFavorites = () => {
  const favoritesJson = localStorage.getItem('favorites');
  return favoritesJson ? JSON.parse(favoritesJson) : [];
};

export const saveFavorites = favorites => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};
