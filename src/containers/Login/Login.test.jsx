import { act, renderHook } from '@testing-library/react';
import { useAuth } from '../../context/AuthProvider';
import { renderWithTheme } from '../../testUtils';
import Login from './Login';
import { useLogin } from './Login.hooks';

jest.mock('../../context/AuthProvider.jsx', () => ({
  useAuth: jest.fn(),
}));

beforeEach(() => {
  useAuth.mockReturnValue({ login: jest.fn() });
});

describe('Login', () => {
  it('should render correctly', () => {
    useAuth.mockReturnValue({ login: jest.fn() });

    const { asFragment } = renderWithTheme(<Login />);

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Login- Hooks', () => {
  describe('handleChange()', () => {
    it('should update username and password correctly', () => {
      const { result } = renderHook(() => useLogin());

      act(() => {
        result.current.handleChange({
          target: { name: 'username', value: 'testuser' },
        });
      });

      expect(result.current.username).toBe('testuser');
      expect(result.current.errors.username).toBe(false);

      act(() => {
        result.current.handleChange({
          target: { name: 'password', value: 'password123' },
        });
      });
      expect(result.current.password).toBe('password123');
      expect(result.current.errors.password).toBe(false);
    });
  });

  describe('validateField()', () => {
    it('should set errors to true when the value is empty', () => {
      const { result } = renderHook(() => useLogin());

      act(() => {
        result.current.validateField('username', '');
      });

      expect(result.current.errors.username).toBe(true);
      expect(result.current.errors.password).toBe(false);
    });

    it('should set errors to false when the value is non-empty', () => {
      const { result } = renderHook(() => useLogin());

      act(() => {
        result.current.validateField('username', 'testuser');
      });

      expect(result.current.errors.username).toBe(false);
      expect(result.current.errors.password).toBe(false);
    });
  });

  describe('handleLogin()', () => {
    it('should call login with username and password when there are no validation errors', () => {
      const { result } = renderHook(() => useLogin());

      act(() => {
        result.current.handleChange({
          target: { name: 'username', value: 'testuser' },
        });
        result.current.handleChange({
          target: { name: 'password', value: 'password123' },
        });
      });

      act(() => {
        result.current.handleLogin();
      });

      expect(useAuth().login).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
      });
    });

    it('should not call login if there are validation errors', () => {
      const { result } = renderHook(() => useLogin());

      act(() => {
        result.current.handleChange({
          target: { name: 'username', value: '' },
        });
        result.current.handleChange({
          target: { name: 'password', value: 'password123' },
        });
      });

      act(() => {
        result.current.handleLogin();
      });

      expect(useAuth().login).not.toHaveBeenCalled();
    });
  });
});
