import { render, screen } from '@testing-library/react';
import SearchPage from '../pages/search';

test('renders search page', () => {
  render(<SearchPage />);
  const heading = screen.getByText(/Search Cocktails/i);
  expect(heading).toBeInTheDocument();
});
