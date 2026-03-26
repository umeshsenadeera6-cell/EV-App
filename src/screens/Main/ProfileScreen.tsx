import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Leaf, Award, ChevronRight, Globe, Settings, LogOut, Edit2 } from 'lucide-react';
import './ProfileScreen.css';

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="profile-container animate-fade-in">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black">My Profile</h1>
        <button className="p-2 bg-amber-400 text-white rounded-full">
           <Award size={20} />
        </button>
      </header>

      <section className="profile-card">
         <div className="profile-header-main">
            <div className="profile-avatar-jd">JD</div>
            <div className="flex-1">
               <h2 className="text-2xl font-black">{user?.displayName || 'John Doe'}</h2>
               <p className="text-muted font-bold">+94 77 123 4567</p>
               <div className="profile-badges">
                  <div className="badge-eco">
                     <Leaf size={10} fill="currentColor" />
                     Eco Champion
                  </div>
                  <div className="badge-premium">Premium</div>
               </div>
            </div>
            <button className="p-2 bg-gray-50 rounded-xl text-gray-400">
               <Edit2 size={18} />
            </button>
         </div>

         <div className="profile-stats-grid">
            <div className="stat-item-p">
               <span className="stat-val-p">47</span>
               <span className="stat-lab-p">Sessions</span>
            </div>
            <div className="stat-item-p">
               <span className="stat-val-p text-emerald-600">127</span>
               <span className="stat-lab-p">kg CO2</span>
            </div>
            <div className="stat-item-p">
               <span className="stat-val-p text-blue-600">1.2k</span>
               <span className="stat-lab-p">kWh</span>
            </div>
            <div className="stat-item-p">
               <span className="stat-val-p text-purple-600">Rs 34K</span>
               <span className="stat-lab-p">Saved</span>
            </div>
         </div>
      </section>

      <section className="impact-section">
         <div className="impact-header">
            <div className="flex items-center gap-4">
               <div className="impact-icon-box">
                  <Globe size={24} />
               </div>
               <div>
                  <h3 className="font-black text-lg">Environmental Impact</h3>
                  <p className="text-xs font-bold text-gray-500">Your contribution this year</p>
               </div>
            </div>
            <button className="view-details-btn">View Details</button>
         </div>
         
         <div className="impact-cards-mini">
            <div className="mini-impact-card">
               <Leaf size={24} className="text-emerald-500" />
            </div>
            <div className="mini-impact-card">
               <div className="w-6 h-6 border-2 border-emerald-500 rounded-md" />
            </div>
         </div>
      </section>

      <div className="flex flex-col gap-4 mt-8">
         <button className="flex items-center justify-between p-6 bg-white rounded-3xl font-black text-gray-700 shadow-soft">
            <div className="flex items-center gap-4">
               <Settings size={20} className="text-gray-400" />
               Settings
            </div>
            <ChevronRight size={20} className="text-gray-300" />
         </button>
         <button 
           onClick={logout}
           className="flex items-center justify-between p-6 bg-white rounded-3xl font-black text-red-500 shadow-soft"
         >
            <div className="flex items-center gap-4">
               <LogOut size={20} />
               Sign Out
            </div>
            <ChevronRight size={20} className="text-gray-300" />
         </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
