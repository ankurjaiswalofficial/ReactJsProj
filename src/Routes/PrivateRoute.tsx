import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
    const isUserDataPresent = () => {
        const userData = localStorage.getItem('userData');
        return userData !== null;
    };

    return isUserDataPresent() ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ message: "Please enter your complete details before accessing the second page." }} />
    );
};

export default PrivateRoute;
