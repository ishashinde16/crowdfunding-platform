// src/components/ProtectedRoute.jsx

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App'; 

const ProtectedRoute = ({ children }) => {
  const { email } = useContext(UserContext);

  if (!email) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
