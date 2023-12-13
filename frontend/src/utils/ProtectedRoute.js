import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const account = useSelector(state => state.account);
  let location = useLocation();

  if (!account.state.isAuthenticated) {
    return <Navigate to="/guard/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
