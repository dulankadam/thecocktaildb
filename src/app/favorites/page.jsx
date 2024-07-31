'use client';
import { useFavorites } from '@/app/context/FavoritesContext';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div>
      <header>
        <h1>Favorite Cocktails</h1>
        <a href="/">Back to Home</a>
      </header>

      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map(cocktail => (
            <div key={cocktail.idDrink} className="cocktail-item">
              <h2>{cocktail.strDrink}</h2>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
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
