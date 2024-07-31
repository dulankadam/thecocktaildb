import { render, screen, fireEvent } from '@testing-library/react';
import FavoritesPage from '../app/favorites/page';
import { FavoritesProvider } from '../context/FavoritesContext';

// Mock the FavoritesContext
const mockRemoveFromFavorites = jest.fn();

jest.mock('../context/FavoritesContext', () => ({
  useFavorites: () => ({
    favorites: [
      {
        idDrink: '1',
        strDrink: 'Mojito',
        strDrinkThumb: 'https://example.com/mojito.jpg',
        strCategory: 'Cocktail',
      },
    ],
    removeFromFavorites: mockRemoveFromFavorites,
  }),
}));

describe('FavoritesPage', () => {
  const renderFavoritesPage = () =>
    render(
      <FavoritesProvider>
        <FavoritesPage />
      </FavoritesProvider>
    );

  test('renders favorites page and displays favorites', () => {
    renderFavoritesPage();

    expect(screen.getByText('Favorite Cocktails')).toBeInTheDocument();
    expect(screen.getByText('Mojito')).toBeInTheDocument();
    expect(screen.getByAltText('Mojito')).toHaveAttribute('src', 'https://example.com/mojito.jpg');
  });

  test('removes cocktail from favorites', () => {
    renderFavoritesPage();

    fireEvent.click(screen.getByText('Remove'));
    expect(mockRemoveFromFavorites).toHaveBeenCalledWith('1');
  });
});
