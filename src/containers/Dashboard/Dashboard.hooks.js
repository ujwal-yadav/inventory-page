import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';

export const useDashboard = () => {
  const [statsData, setStatsData] = useState([]);

  const { token } = useAuth();

  const fetchStatsData = async (url, title, color) => {
    const headers = {
      token,
    };

    try {
      const response = await axios.get(url, { headers });

      if (response.data) {
        setStatsData((prevStatsData) => [
          ...prevStatsData,
          {
            title,
            value: response.data.data?.length || 0,
            color,
          },
        ]);
      }
    } catch (err) {
      alert(`Error while fetching ${title} stats!`);
    }
  };

  useEffect(() => {
    fetchStatsData('/products', 'PRODUCTS', 'green');
    fetchStatsData('/sales-orders', 'ORDERS', 'brown');
    fetchStatsData('/customers', 'CUSTOMERS', 'blue');
    fetchStatsData('/deliveries', 'DELIVERIES', 'orange');
    fetchStatsData('/purchase-returns', 'RETURNS', 'hotpink');
  }, []);

  return { statsData };
};
