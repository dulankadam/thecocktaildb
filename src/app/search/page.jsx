'use client';
import { useState } from 'react';
import { searchCocktails } from '@/services/api';
import { useFavorites } from '@/app/context/FavoritesContext';
import Link from 'next/link';

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
      <h1>Search Cocktails</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a cocktail"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
      <div className="favorites-indicator">
          Favorites: {favorites.length}
        </div>
        <Link href="/">
          Back to Home
        </Link>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="cocktails-list">
        {results.map(cocktail => (
          <div key={cocktail.idDrink} className="cocktail-item">
            <h2>{cocktail.strDrink}</h2>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <button onClick={() => addToFavorites(cocktail)}>Add to Favorites</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
