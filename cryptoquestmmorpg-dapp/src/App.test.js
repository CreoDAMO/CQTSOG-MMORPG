import { render, screen } from '@testing-library/react';
import App from './App';

test('renders CryptoQuest DApp header', () => {
  render(<App />);
  const headerElement = screen.getByText(/CryptoQuest DApp/i);
  expect(headerElement).toBeInTheDocument();
});

