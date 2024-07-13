import { render, screen } from '@testing-library/react';
import { useInventoryTable } from './InventoryTable.hooks';
import InventoryTable from './InventoryTable';
import { renderWithTheme } from './../../testUtils';

jest.mock('./InventoryTable.hooks', () => ({
  useInventoryTable: jest.fn(),
}));

describe('InventoryTable', () => {
  it('should display "Loading..." when isLoading is true', () => {
    useInventoryTable.mockReturnValue({ isLoading: true, inventoryData: null });

    render(<InventoryTable />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display "No Products available" when inventoryData is empty', () => {
    useInventoryTable.mockReturnValue({ isLoading: false, inventoryData: [] });

    render(<InventoryTable />);

    expect(screen.getByText('No Products available')).toBeInTheDocument();
  });

  it('should render the product details correctly', () => {
    const mockData = [
      {
        id: 1,
        code: 'PROD-01',
        name: 'Product Satu',
        price: 1000,
        minimum_stock: 25,
        company: {
          id: 1,
          code: 'DM',
          name: 'Dummy',
          address: '',
        },
        brand: {
          id: 1,
          company: {
            id: 0,
            code: '',
            name: '',
            address: '',
          },
          code: 'BRAND-01',
          name: 'Brand Test',
        },
        product_category: {
          id: 1,
          company: {
            id: 0,
            code: '',
            name: '',
            address: '',
          },
          name: 'Furniture',
          category: {
            id: 0,
            name: '',
          },
        },
      },
    ];

    useInventoryTable.mockReturnValue({
      isLoading: false,
      inventoryData: mockData,
    });

    const { asFragment } = renderWithTheme(<InventoryTable />);

    expect(asFragment()).toMatchSnapshot();
  });
});
