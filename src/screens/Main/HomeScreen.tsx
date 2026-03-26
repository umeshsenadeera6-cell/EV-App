import React from 'react';
import { Search, Zap, Calendar, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container animate-fade-in">
      <header className="home-header">
        <div className="header-text">
          <h1>Good morning! 🌱</h1>
          <p className="text-muted">12 eco-friendly stations nearby</p>
        </div>
        <div className="flex gap-4 items-center">
           <span className="eco-mode-badge">Eco Mode</span>
           <button className="search-mini">
              <Search size={20} />
           </button>
        </div>
      </header>

      {/* Hero Vehicle Card */}
      <section className="vehicle-card">
         <div className="flex justify-between items-start">
            <div>
               <h2 className="vehicle-name">Your Tesla Model 3</h2>
               <p className="charge-status">Last charged 2 hours ago</p>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl">
               <Car size={24} />
            </div>
         </div>
         
         <div className="battery-display">
            <span className="battery-percent">68%</span>
            <span className="range-text">~340 km range</span>
         </div>
         
         <div className="optimal-badge">Optimal</div>
         <p className="text-sm mt-4 opacity-70">Next charge in 4 hours</p>
      </section>

      {/* Quick Actions */}
      <div className="quick-actions">
         <div className="action-card cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/charging')}>
            <div className="action-icon" style={{backgroundColor: '#f0fdf4', color: '#10b981'}}>
               <Zap size={24} />
            </div>
            <div>
               <h3 className="action-title">Quick Charge</h3>
               <p className="action-subtitle">Find fastest route</p>
            </div>
         </div>
         <div className="action-card">
            <div className="action-icon" style={{backgroundColor: '#eff6ff', color: '#3b82f6'}}>
               <Calendar size={24} />
            </div>
            <div>
               <h3 className="action-title">Schedule</h3>
               <p className="action-subtitle">Book ahead</p>
            </div>
         </div>
      </div>

      {/* Mini Map Preview */}
      <section className="mini-map-preview">
         <div className="search-placeholder">
            <Search size={18} />
            <span>Search charging stations...</span>
         </div>
         <div style={{ height: '120px', backgroundColor: '#f1f5f9', borderRadius: 'var(--radius-lg)', marginTop: 'var(--spacing-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p className="text-xs font-black text-slate-300 uppercase tracking-widest">Interactive Map View</p>
         </div>
      </section>
    </div>
  );
};

export default HomeScreen;
