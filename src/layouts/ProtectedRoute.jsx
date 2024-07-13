import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { NavBar } from '../components/Navbar/Navbar';

const ProtectedRoute = () => {
  const { token, logOut } = useAuth();

  if (!token) return <Navigate to="/login" />;
  return (
    <>
      <NavBar logOut={logOut} />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
