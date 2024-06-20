import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js'; // Make sure the path is correct

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const authenticated = useAuth(); // Assume this hook checks if user is authenticated

    return (
        <Route
            {...rest}
            element={authenticated ? <Component {...rest} /> : <Navigate to="/login" />}
        />
    );
};

export default ProtectedRoute;
