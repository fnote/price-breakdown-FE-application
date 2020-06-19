import React from 'react';
import { render } from '@testing-library/react';
import AppRoute from './AppRoute';

test('renders learn react link', () => {
  const { getByText } = render(<AppRoute />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
