import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';
import { useEffect, useState } from 'react';

export const useInventoryTable = () => {
  const [inventoryData, setInventoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeProductId, setActiveProductId] = useState(null);
  const [errors, setErrors] = useState({
    name: false,
    price: false,
    brand: false,
    category: false,
    stock: false,
  });

  const [product, setProduct] = useState({
    name: '',
    price: '',
    brand: '',
    category: '',
    stock: '',
  });

  const validateField = (name, value) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !value,
    }));

    return !value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    validateField(name, value);
  };

  const { token } = useAuth();

  const headers = {
    token,
  };

  const getProducts = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get('/products', { headers });

      if (response.data) {
        setInventoryData(response.data.data);
      }
    } catch (err) {
      alert('Error while fetching inventory details!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const toggleEditProductModal = (id) => {
    setActiveProductId(id);
    setIsEditModalOpen(!isEditModalOpen);
    if (!isEditModalOpen && inventoryData) {
      const productData = inventoryData.find((product) => product.id === id);
      setProduct({
        name: productData.name,
        price: productData.price,
        brand: productData.brand.code,
        category: productData.product_category.id,
        stock: productData.minimum_stock,
      });
    }
  };

  const toggleDeleteProductModal = (id) => {
    setActiveProductId(id);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const deleteProduct = async () => {
    setIsDeleteModalOpen(false);
    try {
      const response = await axios.delete(`/products/${activeProductId}`, {
        headers,
      });

      if (response.data === '') {
        getProducts();
      }
    } catch (err) {
      alert('Could not delete product!');
    }
  };

  const editProduct = async () => {
    const { name, price, brand, category, stock } = product;
    const nameError = validateField('name', name);
    const priceError = validateField('price', price);
    const brandError = validateField('brand', brand);
    const categoryError = validateField('category', category);
    const stockError = validateField('stock', stock);

    if (nameError || priceError || brandError || categoryError || stockError) {
      return;
    }

    try {
      const response = await axios.put(
        `/products/${activeProductId}`,
        {
          id: activeProductId,
          name,
          price: Number(price),
          brand: String(brand),
          product_category: String(category),
          minimum_stock: String(stock),
        },
        { headers }
      );

      if (response.data) {
        setIsEditModalOpen(false);
        getProducts();
      }
    } catch (err) {
      alert('Could not update product!');
    }
  };

  return {
    isLoading,
    inventoryData,
    isEditModalOpen,
    isDeleteModalOpen,
    toggleEditProductModal,
    toggleDeleteProductModal,
    deleteProduct,
    editProduct,
    activeProductId,
    errors,
    validateField,
    handleChange,
    ...product,
  };
};
