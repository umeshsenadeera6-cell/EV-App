import React from 'react';
import { User, Shield, CreditCard, Bell, ChevronRight, LogOut, Trash2, Camera, Car } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuthStore();

  const sections = [
    { 
       title: "Charging Preferences", 
       items: [
         { label: "Renewable Energy Goal", value: "90%", icon: Shield, color: "text-emerald-500", bg: "bg-emerald-50" },
         { label: "Notification Settings", value: "Enabled", icon: Bell, color: "text-blue-500", bg: "bg-blue-50" },
       ]
    },
    { 
        title: "Billing & Subscription", 
        items: [
          { label: "Membership Tier", value: "Premium Plan", icon: CreditCard, color: "text-amber-500", bg: "bg-amber-50" },
          { label: "Default Payment", value: "•••• 4242", icon: CreditCard, color: "text-gray-500", bg: "bg-gray-50" },
        ]
     }
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16 bg-white p-10 rounded-[48px] shadow-2xl shadow-gray-100 border border-gray-50 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12 group-hover:scale-110 transition-transform duration-1000">
            <User size={240} />
         </div>

         <div className="relative">
            <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gray-50 rounded-[40px] flex items-center justify-center border-4 border-white shadow-2xl shadow-gray-200">
               <User size={64} className="text-gray-300" />
            </div>
            <button className="absolute -bottom-2 -right-2 p-3 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all border-4 border-white">
               <Camera size={20} />
            </button>
         </div>

         <div className="text-center md:text-left z-10">
            <h1 className="text-4xl font-black text-dark tracking-tight mb-2">Driver Account</h1>
            <p className="text-gray-500 font-bold mb-6 text-lg tracking-tight">{user?.email || 'driver@ecocharge.com'}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
               <span className="px-5 py-2 bg-emerald-500 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-100">Premium Driver</span>
               <span className="px-5 py-2 bg-gray-50 text-gray-400 rounded-full text-xs font-black uppercase tracking-widest border border-gray-100">Joined Mar 2026</span>
            </div>
         </div>
      </div>

      {/* Vehicle Info */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-dark mb-6 tracking-tight px-4 capitalize">Registered Vehicle</h3>
        <div className="bg-dark p-8 rounded-[40px] shadow-2xl shadow-gray-200 relative overflow-hidden group">
            <Car size={140} className="absolute -bottom-10 -right-10 text-white/5 group-hover:scale-110 transition-transform duration-1000" />
            <div className="flex items-center gap-6 relative z-10">
                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center border border-white/20">
                    <Car size={32} className="text-white" />
                </div>
                <div>
                    <h4 className="text-white font-black text-2xl tracking-tight leading-none mb-1">Tesla Model 3</h4>
                    <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Performance Dual Motor</p>
                </div>
                <button className="ml-auto p-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all border border-white/10">
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {sections.map((section, idx) => (
          <section key={idx}>
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 px-4">{section.title}</h4>
            <div className="space-y-4">
               {section.items.map((item, i) => (
                  <button key={i} className="w-full bg-white p-6 rounded-[32px] border border-gray-100 flex items-center justify-between hover:shadow-2xl hover:shadow-gray-100 hover:-translate-y-1 transition-all group">
                     <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                           <item.icon size={20} />
                        </div>
                        <div className="text-left leading-none">
                           <div className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{item.label}</div>
                           <div className="text-dark font-black tracking-tight">{item.value}</div>
                        </div>
                     </div>
                     <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
                  </button>
               ))}
            </div>
          </section>
        ))}
      </div>

      {/* Danger Zone */}
      <div className="mt-16 pt-12 border-t border-gray-100 flex flex-col md:flex-row gap-4">
         <button 
          onClick={() => logout()}
          className="flex-1 flex items-center justify-center gap-3 py-5 bg-white text-dark font-extrabold rounded-[28px] border border-gray-200 hover:bg-gray-50 hover:shadow-xl transition-all"
         >
            <LogOut size={20} />
            Logout Session
         </button>
         <button className="flex-1 flex items-center justify-center gap-3 py-5 bg-red-50 text-red-500 font-extrabold rounded-[28px] border border-red-100 hover:bg-red-600 hover:text-white hover:shadow-2xl hover:shadow-red-100 transition-all group">
            <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
            Delete Account
         </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
