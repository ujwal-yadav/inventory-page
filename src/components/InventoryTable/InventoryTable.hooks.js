import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';
import { useEffect, useState } from 'react';

export const useInventoryTable = () => {
  const [inventoryData, setInventoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useAuth();

  const getProducts = async () => {
    setIsLoading(true);
    const headers = {
      token,
    };

    try {
      const response = await axios.get('/products', { headers });

      if (response.data) {
        setInventoryData(response.data.data);
      }
    } catch (err) {
      alert('Erorr while fetching inventory details!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return { isLoading, inventoryData };
};
