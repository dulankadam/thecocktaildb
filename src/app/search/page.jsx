'use client';
import { useState } from 'react';
import { searchCocktails } from '@/services/api';
import { useFavorites } from '@/app/context/FavoritesContext';
import Link from 'next/link';
import '../../styles/globals.css';


const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { favorites, addToFavorites } = useFavorites();

  const handleSearch = async () => {
    if (query.trim() === '') {
      setErrorMessage('Please enter a search query.');
      setResults([]);
    } else {
      const fetchedCocktails = await searchCocktails(query);
      if (fetchedCocktails.length === 0) {
        setErrorMessage('No search results found. Please try a different query.');
        setResults([]);
      } else {
        setResults(fetchedCocktails);
        setErrorMessage('');
      }
    }
  };

  return (
    <div>
     <header>
      <div className='titlebar-details'>
        <h1>Search Cocktails</h1>
        <div className="favorites-indicator">
            Favorites: {favorites.length}
          </div>
      </div>
      <div className='header-Search'>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a cocktail"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className='navigation-links'>
      <div className='back-to-home'>
        <Link href="/">
          Back to Home
        </Link>
        <Link href="/favorites">
            View Favorites
          </Link>
      </div>
      </div>
      </header>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="cocktails-list">
        {results.map(cocktail => (
          <div key={cocktail.idDrink} className="cocktail-item">
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <h2>{cocktail.strDrink}</h2>
            
            <button onClick={() => addToFavorites(cocktail)}>Add to Favorites</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
