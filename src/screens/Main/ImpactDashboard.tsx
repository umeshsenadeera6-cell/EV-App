import React from 'react';
import { Leaf, Zap, BarChart3, Trophy, ChevronRight, Share2, Clock, MapPin, X } from 'lucide-react';
import { useStationStore, MOCK_STATIONS } from '../../store/useStationStore';

const ImpactDashboard: React.FC = () => {
  const { activeReservation, activeQueueEntry, setActiveReservation, setActiveQueueEntry } = useStationStore();

  const stats = [
    { label: "CO₂ Saved", value: "124.5 kg", icon: Leaf, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Clean Energy", value: "94%", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Sessions", value: "18", icon: BarChart3, color: "text-blue-600", bg: "bg-blue-50" },
  ];

  const activeStation = activeReservation || activeQueueEntry 
    ? MOCK_STATIONS.find(s => s.id === (activeReservation?.stationId || activeQueueEntry?.stationId))
    : null;

  return (
    <div className="max-w-6xl mx-auto p-8 lg:p-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-12">
        <div>
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs mb-3">Community Driver</p>
          <h1 className="text-4xl font-black text-dark tracking-tight leading-none">Your Environmental Impact</h1>
        </div>
        <button className="hidden md:flex items-center gap-2 bg-gray-50 hover:bg-white p-4 rounded-2xl border border-gray-100 hover:shadow-xl hover:shadow-gray-100 transition-all group">
          <Share2 size={20} className="text-dark group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm">Share Report</span>
        </button>
      </div>

      {/* Active Status Card */}
      {(activeReservation || activeQueueEntry) && activeStation && (
          <div className="mb-12 overflow-hidden border border-emerald-100/50 rounded-[40px] bg-white shadow-2xl shadow-emerald-50 flex flex-col md:flex-row relative group animate-in slide-in-from-top duration-700">
            <div className={`w-full md:w-16 flex items-center justify-center p-4 ${activeReservation ? "bg-emerald-500" : "bg-amber-400"}`}>
               <Clock size={24} color="white" className="md:-rotate-90" />
            </div>
            <div className="flex-1 p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                 <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${activeReservation ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                        {activeReservation ? "Confirmed Spot" : "In Virtual Queue"}
                    </span>
                 </div>
                 <h2 className="text-2xl font-black text-dark mb-1">{activeStation.name}</h2>
                 <div className="flex items-center text-gray-400 text-sm font-medium">
                    <MapPin size={14} className="mr-1 opacity-50" />
                    {activeStation.address}
                 </div>
              </div>
              
              <div className="flex items-center gap-4">
                 {activeQueueEntry && (
                    <div className="bg-amber-50 px-6 py-4 rounded-3xl border border-amber-100/50 flex flex-col items-center">
                       <span className="text-amber-600 text-2xl font-black leading-none">#{activeQueueEntry.position}</span>
                       <span className="text-amber-600 text-[10px] font-black uppercase tracking-widest mt-1">Queue Position</span>
                    </div>
                 )}
                 <div className="flex-1 md:flex-none">
                    <button 
                        onClick={() => activeReservation ? setActiveReservation(null) : setActiveQueueEntry(null)}
                        className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all font-bold group"
                    >
                        <X size={18} className="group-hover:rotate-90 transition-transform" />
                        Cancel
                    </button>
                 </div>
              </div>
            </div>
          </div>
        )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main Stat Card */}
        <div className="lg:col-span-2 bg-primary p-10 lg:p-12 rounded-[48px] shadow-2xl shadow-emerald-100 relative overflow-hidden group">
          <Leaf size={200} className="absolute -bottom-20 -right-20 text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md border border-white/10">
                <Leaf size={24} color="white" />
              </div>
              <span className="text-white/80 font-black uppercase tracking-widest text-xs">Total Lifetime Savings</span>
            </div>
            <h3 className="text-white text-7xl lg:text-8xl font-black mb-4 tracking-tighter leading-none">2.5k <span className="text-3xl lg:text-4xl text-white/60 font-bold ml-1">kg CO₂</span></h3>
            <p className="text-white/80 text-lg lg:text-xl font-medium max-w-sm mb-12">You've successfully prevented significant carbon emissions by using 100% renewable energy.</p>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-[32px] border border-white/10 w-fit">
              <span className="text-4xl">🌲</span>
              <span className="text-white font-bold text-lg">Equivalent to planting 125 trees</span>
            </div>
          </div>
        </div>

        {/* Small Stats */}
        <div className="grid grid-cols-1 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className={`${stat.bg} p-8 rounded-[40px] flex items-center justify-between border border-transparent hover:border-black/5 hover:shadow-xl transition-all group`}>
               <div>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">{stat.label}</p>
                  <h4 className={`text-3xl font-black ${stat.color} leading-none tracking-tight`}>{stat.value}</h4>
               </div>
               <div className={`p-4 rounded-2xl bg-white shadow-sm group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} className={stat.color} />
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges & Leaderboard */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <section>
          <div className="flex justify-between items-center mb-8 px-2">
            <h3 className="text-2xl font-black text-dark tracking-tight">Eco-Achievements</h3>
            <button className="text-primary font-black text-sm hover:underline underline-offset-4 decoration-2">View Portfolio</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
             {["Solar Champion", "100kg Club", "City Nomad"].map((badge, i) => (
                <div key={i} className="bg-white border border-gray-100 p-6 rounded-[32px] flex flex-col items-center text-center hover:shadow-2xl hover:shadow-gray-100 hover:-translate-y-2 transition-all group">
                   <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Trophy size={32} className={i === 0 ? "text-amber-500" : "text-gray-300"} />
                   </div>
                   <span className="text-xs font-black text-dark leading-tight">{badge}</span>
                </div>
             ))}
          </div>
        </section>

        <section className="bg-dark rounded-[48px] p-10 lg:p-12 shadow-2xl shadow-gray-200">
           <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3 text-white">
                 <Trophy size={24} className="text-amber-500" />
                 <h3 className="text-2xl font-black tracking-tight">Top Savers</h3>
              </div>
              <ChevronRight size={24} className="text-white/40" />
           </div>

           <div className="space-y-6">
              {[1, 2, 3].map((rank) => (
                <div key={rank} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-6">
                    <span className={`text-xl font-black ${rank === 1 ? 'text-amber-500' : 'text-white/20'}`}>{rank}</span>
                    <div className="w-14 h-14 bg-white/5 rounded-full border border-white/10 group-hover:border-primary/50 transition-colors" />
                    <div>
                        <h4 className="text-white font-black text-base group-hover:text-primary transition-colors">User {rank * 42}</h4>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Melbourne Region</p>
                    </div>
                  </div>
                  <div className="text-right">
                     <div className="text-primary font-black text-lg leading-none">{450 - rank * 15}kg</div>
                     <div className="text-white/20 text-[10px] font-bold uppercase tracking-widest mt-1">CO₂ SAVED</div>
                  </div>
                </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default ImpactDashboard;
