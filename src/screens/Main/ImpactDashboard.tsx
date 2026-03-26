import React from 'react';
import { Zap, Leaf, TrendingUp, Users } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useStationStore } from '../../store/useStationStore';
import './ImpactDashboard.css';

const ImpactDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { activeReservation, queueEntry } = useStationStore();

  const stats = [
    { label: 'CO₂ Saved', value: `${user?.stats.totalCO2Saved}kg`, icon: <Leaf />, color: 'primary' },
    { label: 'Clean Energy', value: '98%', icon: <Zap />, color: 'amber' },
    { label: 'Total Energy', value: `${user?.stats.totalKWh}kWh`, icon: <TrendingUp />, color: 'primary' },
    { label: 'Community', value: '10k+', icon: <Users />, color: 'primary' },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Your Impact.</h1>
        <p className="dashboard-subtitle">Driving the change since 2024</p>
      </header>

      {/* Active Context */}
      {(activeReservation || queueEntry) && (
        <section className="active-sessions">
          <div className="session-badge">{activeReservation ? 'Charging Now' : 'In Queue'}</div>
          <div className="session-body">
             <div>
                <h3 className="text-2xl font-black">
                  {activeReservation ? 'Port 02 Active' : `Ready in ${queueEntry?.position || 15} mins`}
                </h3>
                <p className="text-gray-400 font-bold mt-1">Sydney City Central Station</p>
             </div>
             <button className="px-8 py-4 bg-primary rounded-2xl font-black text-white hover:scale-105 transition-all">
                {activeReservation ? 'View Progress' : 'Check In'}
             </button>
          </div>
        </section>
      )}

      {/* Key Metrics */}
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card">
             <div className="stat-head">
                <div className={`stat-icon ${stat.color === 'amber' ? 'amber' : ''}`}>
                  {stat.icon}
                </div>
             </div>
             <div className="stat-value">{stat.value}</div>
             <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'var(--spacing-3xl)' }}>
        <h3 className="text-3xl mb-8">Weekly Energy History</h3>
        <div style={{ padding: 'var(--spacing-3xl)', backgroundColor: 'white', borderRadius: 'var(--radius-3xl)', border: '1px solid var(--color-gray-100)' }}>
           <div style={{ height: '300px', width: '100%', backgroundColor: 'var(--color-gray-50)', borderRadius: 'var(--radius-2xl)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: 'var(--spacing-xl)' }}>
              {[60, 45, 80, 55, 90, 70, 85].map((h, i) => (
                 <div key={i} style={{ width: '40px', height: `${h}%`, backgroundColor: 'var(--color-primary)', borderRadius: '8px 8px 0 0', opacity: 0.2 + (h/100) }}></div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactDashboard;
