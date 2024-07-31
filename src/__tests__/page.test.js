import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../app/page';
import { FavoritesProvider } from '../context/FavoritesContext';
import { fetchRandomCocktails } from '../utils/api';

// Mock the API utility
jest.mock('../utils/api', () => ({
  fetchRandomCocktails: jest.fn(),
}));

describe('HomePage', () => {
  const renderHomePage = () =>
    render(
      <FavoritesProvider>
        <HomePage />
      </FavoritesProvider>
    );

  test('renders home page and fetches cocktails', async () => {
    fetchRandomCocktails.mockResolvedValueOnce([
      {
        idDrink: '1',
        strDrink: 'Mojito',
        strDrinkThumb: 'https://example.com/mojito.jpg',
        strCategory: 'Cocktail',
      },
    ]);

    renderHomePage();

    expect(screen.getByText('Random Cocktails')).toBeInTheDocument();
    expect(screen.getByText('Refresh')).toBeInTheDocument();

    // Click the refresh button
    fireEvent.click(screen.getByText('Refresh'));

    await waitFor(() => {
      expect(fetchRandomCocktails).toHaveBeenCalled();
      expect(screen.getByText('Mojito')).toBeInTheDocument();
      expect(screen.getByAltText('Mojito')).toHaveAttribute('src', 'https://example.com/mojito.jpg');
    });
  });

  test('adds cocktail to favorites', async () => {
    fetchRandomCocktails.mockResolvedValueOnce([
      {
        idDrink: '1',
        strDrink: 'Mojito',
        strDrinkThumb: 'https://example.com/mojito.jpg',
        strCategory: 'Cocktail',
      },
    ]);

    renderHomePage();

    fireEvent.click(screen.getByText('Refresh'));

    await waitFor(() => {
      fireEvent.click(screen.getByText('Add to Favorites'));
      expect(screen.getByText('Cocktail added to favorites!')).toBeInTheDocument();
    });
  });

  test('removes cocktail from favorites', async () => {
    fetchRandomCocktails.mockResolvedValueOnce([
      {
        idDrink: '1',
        strDrink: 'Mojito',
        strDrinkThumb: 'https://example.com/mojito.jpg',
        strCategory: 'Cocktail',
      },
    ]);

    renderHomePage();

    fireEvent.click(screen.getByText('Refresh'));

    await waitFor(() => {
      fireEvent.click(screen.getByText('Add to Favorites'));
      fireEvent.click(screen.getByText('Remove'));
      expect(screen.queryByText('Mojito')).not.toBeInTheDocument();
    });
  });
});
