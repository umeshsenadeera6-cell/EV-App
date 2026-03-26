import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { User, Shield, Zap, CreditCard, ChevronRight } from 'lucide-react';
import './ProfileScreen.css';

const ProfileScreen: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-avatar-large">
          {user?.email?.[0].toUpperCase()}
        </div>
        <div className="profile-meta">
          <h2>{user?.displayName || 'Eco Driver'}</h2>
          <p>{user?.email}</p>
          <div style={{ marginTop: 'var(--spacing-md)' }}>
             <span style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '12px', fontWeight: 800 }}>
                {user?.subscription.tier.toUpperCase()} MEMBER
             </span>
          </div>
        </div>
      </header>

      <section className="settings-section">
         <h3 className="section-title">Vehicle & Charging</h3>
         <div className="settings-item">
            <div className="flex items-center gap-4">
               <Zap className="text-primary" size={20} />
               <span className="item-label">Vehicle Model</span>
            </div>
            <span className="item-value">Tesla Model 3</span>
         </div>
         <div className="settings-item">
            <div className="flex items-center gap-4">
               <Shield className="text-primary" size={20} />
               <span className="item-label">Clean Energy Pref.</span>
            </div>
            <span className="item-value">{user?.preferences.minCleanEnergy}% +</span>
         </div>
      </section>

      <section className="settings-section">
         <h3 className="section-title">Account & Security</h3>
         <div className="settings-item">
            <div className="flex items-center gap-4">
               <CreditCard className="text-gray-400" size={20} />
               <span className="item-label">Payment Method</span>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-sm font-bold">•••• 4242</span>
               <ChevronRight size={16} className="text-gray-300" />
            </div>
         </div>
         <div className="settings-item">
            <div className="flex items-center gap-4">
               <User className="text-gray-400" size={20} />
               <span className="item-label">Personal Information</span>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
         </div>
      </section>

      <div className="danger-zone">
         <button className="btn-danger">Sign Out of Account</button>
      </div>
    </div>
  );
};

export default ProfileScreen;
