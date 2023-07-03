import { LOGIN_ROUTE } from 'config/const/routes/website/login';
import React from 'react';
import { Navigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return <Navigate to={LOGIN_ROUTE} />;
};

export default NotFoundPage;
