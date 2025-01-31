'use client';
import { useEffect, useState } from 'react';
import { fetchRandomCocktails } from '@/services/api';
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';
import { useFavorites } from '@/app/context/FavoritesContext';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/globals.css';


const HomePage = () => {
  const [cocktails, setCocktails] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [notification, setNotification] = useState('');
  const { favorites, addToFavorites: addToFavoritesContext, removeFromFavorites } = useFavorites();

  const getCocktails = async () => {
    const fetchedCocktails = await fetchRandomCocktails();
    if (fetchedCocktails.length === 0) {
      setErrorMessage('No cocktails found. Please try again later.');
    } else {
      setCocktails(fetchedCocktails);
      setErrorMessage('');
    }
  };

  const handleAddToFavorites = (cocktail) => {
    if (!favorites.some(fav => fav.idDrink === cocktail.idDrink)) {
      addToFavoritesContext(cocktail); // Call the context function
      setNotification('Cocktail added to favorites!');
      setTimeout(() => setNotification(''), 3000); // Hide after 3 seconds
    }
  };

  useEffect(() => {
    getCocktails();
  }, []);

  return (
    <div>
      <header>
        <div className='titlebar-details'>
          <h1>Random Cocktails</h1>
          <div className="favorites-indicator">
            Favorites: {favorites.length}
          </div>
        </div>
        <button className='refresh-button' onClick={getCocktails}>Refresh</button>
        <div className='navigation-links'>
          <Link href="/search">
            Search Cocktails
          </Link>
          <Link href="/favorites">
            View Favorites
          </Link>
        </div>
      </header>

      {errorMessage && <p>{errorMessage}</p>}
      <Carousel>
        {cocktails.map(cocktail => (
          <div key={cocktail.idDrink} className="cocktail-item">
          <div>
             <div className='carousel-details'>
              <h2>{cocktail.strDrink}</h2>
              <p>Category : {cocktail.strCategory}</p>
              <div className='caresouleButton'>
                <button onClick={() => handleAddToFavorites(cocktail)}>Add to Favorites</button>
                <button onClick={() => removeFromFavorites(cocktail.idDrink)}>Remove</button>
              </div>
            </div>
          </div>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
          </div>
        ))}
      </Carousel>

      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default HomePage;
