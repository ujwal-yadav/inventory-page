import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthProvider from './AuthProvider';

jest.mock('./AuthProvider.hooks', () => ({
  useAuthProvider: jest.fn(),
}));

describe('AuthProvider', () => {
  it('should render correctly', () => {
    const mockToken = 'mock-token';
    const mockLogin = jest.fn();
    const mockLogOut = jest.fn();

    require('./AuthProvider.hooks').useAuthProvider.mockReturnValue({
      token: mockToken,
      login: mockLogin,
      logOut: mockLogOut,
    });

    const { asFragment } = render(<AuthProvider>{'UI'}</AuthProvider>);

    expect(asFragment()).toMatchSnapshot();
  });
});
