import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MapScreen from './screens/Main/MapScreen';
import ImpactDashboard from './screens/Main/ImpactDashboard';
import ProfileScreen from './screens/Main/ProfileScreen';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import { useAuthStore } from './store/useAuthStore';

const App: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={<MapScreen />} />
          <Route path="/impact" element={<ImpactDashboard />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
