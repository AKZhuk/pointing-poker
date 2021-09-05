import { render, screen } from '@testing-library/react';
import Header from './Header';

test('Header should be render', () => {
  render(<Header />);
  expect(screen.findAllByText(/header/));
});
