import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomeScreen from './screens/Main/HomeScreen';
import MapScreen from './screens/Main/MapScreen';
import WalletScreen from './screens/Main/WalletScreen';
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
          <Route path="/" element={<HomeScreen />} />
          <Route path="/charging" element={<MapScreen />} />
          <Route path="/payments" element={<WalletScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
