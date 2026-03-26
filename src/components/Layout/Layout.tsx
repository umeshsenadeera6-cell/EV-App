import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Map, BarChart3, User, LogOut, Zap } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const Layout: React.FC = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: Map, label: 'Map' },
    { path: '/impact', icon: BarChart3, label: 'Impact' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary p-2 rounded-xl">
            <Zap size={24} color="white" />
          </div>
          <span className="text-xl font-bold text-dark">EcoCharge</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-primary font-bold shadow-sm'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-dark'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100 z-10">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Zap size={18} color="white" />
            </div>
            <span className="text-lg font-bold text-dark">EcoCharge</span>
          </div>
          <button className="p-2 text-gray-400">
            <User size={24} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>

        {/* Mobile Tab Bar */}
        <nav className="md:hidden flex bg-white border-t border-gray-100 px-4 py-2 pb-safe z-10">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-2 transition-all ${
                  isActive ? 'text-primary' : 'text-gray-400'
                }`
              }
            >
              <item.icon size={20} />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </main>
    </div>
  );
};

export default Layout;
