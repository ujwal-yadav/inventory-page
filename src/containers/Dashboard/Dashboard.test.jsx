import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import '@testing-library/jest-dom/extend-expect';
import { useDashboard } from './Dashboard.hooks';
import { renderWithTheme } from '../../testUtils';
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';

jest.mock('../../context/AuthProvider.jsx', () => ({
  useAuth: jest.fn(),
}));
jest.mock('axios');

beforeEach(() => {
  useAuth.mockReturnValue({ token: 'mock-token' });
});

describe('Dashboard', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithTheme(<Dashboard />);

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Dashboard- Hooks', () => {
  it('should fetch data and sets stats data correctly', async () => {
    const mockData = { data: { data: new Array(10) } };
    axios.get.mockResolvedValue(mockData);

    const { result } = renderHook(() => useDashboard());

    await waitFor(() => expect(result.current.statsData.length).toBe(5));

    expect(result.current.statsData).toEqual([
      { title: 'PRODUCTS', value: 10, color: 'green' },
      { title: 'ORDERS', value: 10, color: 'brown' },
      { title: 'CUSTOMERS', value: 10, color: 'blue' },
      { title: 'DELIVERIES', value: 10, color: 'orange' },
      { title: 'RETURNS', value: 10, color: 'hotpink' },
    ]);
  });

  it('should handle errors while fetching stats data', async () => {
    axios.get.mockImplementation((url) => {
      if (url === '/products') {
        return Promise.reject(new Error('Error'));
      }
      return Promise.resolve({ data: { data: [] } });
    });

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { result } = renderHook(() => useDashboard());

    await waitFor(() => expect(result.current.statsData.length).toBe(4));

    expect(alertMock).toHaveBeenCalledWith(
      'Error while fetching PRODUCTS stats!'
    );
    expect(result.current.statsData).toEqual([
      { title: 'ORDERS', value: 0, color: 'brown' },
      { title: 'CUSTOMERS', value: 0, color: 'blue' },
      { title: 'DELIVERIES', value: 0, color: 'orange' },
      { title: 'RETURNS', value: 0, color: 'hotpink' },
    ]);
  });
});
