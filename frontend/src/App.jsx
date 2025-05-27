import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import { useEffect } from 'react';

function App() { 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Можно добавить проверку токена через API
      api.get('/user/me').catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      });
    }
  }, []);

  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
