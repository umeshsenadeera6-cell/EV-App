import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Map, BarChart2, User, Zap, LogOut } from 'lucide-react';
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
            <Map size={20} />
            <span>Map</span>
          </NavLink>
          <NavLink to="/impact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <BarChart2 size={20} />
            <span>Impact</span>
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
          <Map size={24} />
          <span>Map</span>
        </NavLink>
        <NavLink to="/impact" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
          <BarChart2 size={24} />
          <span>Impact</span>
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
