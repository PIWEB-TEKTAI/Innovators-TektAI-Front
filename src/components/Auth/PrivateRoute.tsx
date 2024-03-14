import React from 'react';
import { Route, Navigate, useNavigate, Routes } from 'react-router-dom';
import { useAuth } from './AuthProvider';

{/*interface PrivateRouteProps {
    component: React.ReactNode;
    path?: string;
    requiredRoles?: string[]; // Specify the required roleAuths for the route
  }
  
  const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component,
    path = '',
    requiredRoles = [],
  }) => {
    // Use the useAuth hook to get userAuth and roleAuth information
    const { userAuth, roleAuth } = useAuth();
    console.log('userAuth route'+userAuth);
    console.log('userAuth roleAuth'+roleAuth);
    if(roleAuth){
        console.log('requiredRoles'+requiredRoles.includes(roleAuth))

    }
    // Check if the userAuth is authenticated and has the required roleAuth
    if (!userAuth || !roleAuth || !requiredRoles.includes(roleAuth)) {
      // Redirect to the sign-in page or unauthorized page based on your logic
      return <Navigate to="/auth/signin" />;
    }
  
    // Render the protected component if authenticated and has the required roleAuth
    return( <Routes>
             <Route path={path} element={component} />

    </Routes>);
  };
  
export default PrivateRoute;*/}
interface PrivateRouteProps {
    component: React.ReactNode;
    requiredRoles?: string[]; // Specify the required roleAuths for the route
  }
  
  const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component,
    requiredRoles = [],
  }) => {
    // Use the useAuth hook to get userAuth and roleAuth information
    const { userAuth, roleAuth } = useAuth();

    if (!userAuth || !roleAuth || !requiredRoles.includes(roleAuth)) {
      return <Navigate to="/auth/signin" />;
    }
  
    return(component );
  };
  
export default PrivateRoute;