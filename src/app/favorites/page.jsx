'use client';
import { useFavorites } from '@/app/context/FavoritesContext';
import '../../styles/globals.css';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div>
      <header>
        <div className='titlebar-details'>
          <h1>Favorite Cocktails</h1>
          <div className="favorites-indicator">
              Favorites: {favorites.length}
            </div>
        </div>
        <div className='back-to-home'>
        <a href="/">Back to Home</a>
        </div>
      </header>

      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map(cocktail => (
            <div key={cocktail.idDrink} className="cocktail-item">
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <h2>{cocktail.strDrink}</h2>
              <p>{cocktail.strCategory}</p>
              <button onClick={() => removeFromFavorites(cocktail.idDrink)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No favorites yet. Add some cocktails to your favorites!</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
