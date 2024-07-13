import React from 'react';
import StatsCard from './StatsCard';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from '../../testUtils';

describe('StatsCard', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithTheme(
      <StatsCard title="Orders" value="200" color="primary" />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
