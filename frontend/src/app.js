import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/register/RegisterForm'; 
import LoginForm from './components/login/LoginForm'; 
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} /> 
      </Routes>
    </Router>
  );
}

export default App;