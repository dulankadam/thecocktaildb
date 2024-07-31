'use client';
import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (cocktail) => {
    setFavorites(prevFavorites => {
      if (!prevFavorites.some(fav => fav.idDrink === cocktail.idDrink)) {
        return [...prevFavorites, cocktail];
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (cocktailId) => {
    setFavorites(prevFavorites => prevFavorites.filter(cocktail => cocktail.idDrink !== cocktailId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
