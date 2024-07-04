import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container } from '@mui/material';
import Component1 from './Component1';
import Component2 from './Component2';

const SecondPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Second page
            </Typography>
            <Typography variant="h4" gutterBottom>
                Component 1
            </Typography>
            <Component1 />
            <Typography variant="h4" gutterBottom>
                Component 2
            </Typography>
            <Component2 />
        </Container>
    );
};

export default SecondPage;
