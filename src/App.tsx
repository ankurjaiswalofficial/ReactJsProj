import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FirstPage from './Components/FirstPage';
import SecondPage from './Components/SecondPage';
import PrivateRoute from './Routes/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/secondPage" element={<PrivateRoute />}>
          <Route path="" element={<SecondPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
