import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, Zap, CreditCard, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import './Layout.css';

const Layout: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="layout">
      {/* Sidebar - Desktop Only */}
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo-icon">
            <Zap size={24} />
          </div>
          <span className="logo-text">EcoCharge</span>
        </div>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Home size={20} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/charging" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Zap size={20} />
            <span>Charging</span>
          </NavLink>
          <NavLink to="/payments" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <CreditCard size={20} />
            <span>Payments</span>
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <User size={20} />
            <span>Profile</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-card">
            <div className="user-avatar">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div className="user-info">
              <div className="user-name">{user?.email?.split('@')[0]}</div>
              <div className="user-plan">{user?.subscription?.tier}</div>
            </div>
            <button className="logout-btn"><LogOut size={16} /></button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Bottom Nav - Mobile Only */}
      <nav className="mobile-nav">
        <NavLink to="/" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
          <Home size={24} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/charging" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
          <Zap size={24} />
          <span>Charging</span>
        </NavLink>
        <NavLink to="/payments" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
          <CreditCard size={24} />
          <span>Payments</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
          <User size={24} />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Layout;
