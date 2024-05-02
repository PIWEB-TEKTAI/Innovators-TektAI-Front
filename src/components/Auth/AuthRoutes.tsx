import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';


// ... other imports ...
interface AuthRouteProps {
  component: React.ReactNode;
}
const AuthRoutes: React.FC<AuthRouteProps> = ({
  component,
})=> {
  const { userAuth } = useAuth();

  
  if (userAuth) {
    if(userAuth.role == "admin" || userAuth.role=="superAdmin"){
      return <Navigate to="/List" />;
    }
    return <Navigate to="/landing" />;
  }
  return (component)
};

export default AuthRoutes;
