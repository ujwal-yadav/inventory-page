import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from '../../testUtils';
import { NavBar } from './Navbar';
import { fireEvent, screen } from '@testing-library/react';

describe('NavBar', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithTheme(<NavBar logOut={jest.fn()} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call logOut when the button is clicked', () => {
    const mockLogOut = jest.fn();

    renderWithTheme(<NavBar logOut={mockLogOut} />);

    const button = screen.getByRole('button', { name: /log out/i });
    fireEvent.click(button);

    expect(mockLogOut).toHaveBeenCalledTimes(1);
  });
});
