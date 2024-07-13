import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useAuthProvider = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('site');

  const login = async (data) => {
    try {
      const response = await axios.post('/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const res = response.data;

      if (res.data) {
        localStorage.setItem('site', res.data.token);
        navigate('/');
      }
    } catch (err) {
      alert('Erorr while logging in!');
    }
  };

  const logOut = () => {
    localStorage.removeItem('site');
    navigate('/login');
  };

  return { token, login, logOut };
};
