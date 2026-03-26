import React from 'react';
import type { ChargingStation } from '../../store/useStationStore';
import { X, MapPin, Zap, Clock, Star, Info, ShieldCheck, Map as MapIcon, Share2 } from 'lucide-react';
import Booking from './Booking.tsx';

interface Props {
  station: ChargingStation;
  onClose: () => void;
}

const StationDetails: React.FC<Props> = ({ station, onClose }) => {
  const [showBooking, setShowBooking] = React.useState(false);

  if (showBooking) {
    return <Booking station={station} onBack={() => setShowBooking(false)} />;
  }

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
      {/* Header Image */}
      <div className="relative h-64 flex-shrink-0">
        <img 
          src={station.images[0]} 
          alt={station.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-6 left-6 flex gap-2">
          <button 
            onClick={onClose}
            className="p-2.5 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl hover:bg-white transition-all group"
          >
            <X size={20} className="text-dark group-hover:scale-110 transition-transform" />
          </button>
        </div>
        <div className="absolute top-6 right-6 flex gap-2">
          <button className="p-2.5 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl hover:bg-white transition-all">
            <Share2 size={20} className="text-dark" />
          </button>
        </div>
        <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl flex items-center border border-emerald-50">
          <ShieldCheck size={18} className="text-emerald-500 mr-2" />
          <span className="font-bold text-primary text-sm tracking-tight text-emerald-600">Eco-Certified</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 lg:p-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 pr-6">
            <h1 className="text-3xl font-extrabold text-dark mb-2 tracking-tight">{station.name}</h1>
            <div className="flex items-center text-gray-500">
              <MapPin size={18} className="mr-2 opacity-60" />
              <span className="text-sm font-medium">{station.address}</span>
            </div>
          </div>
          <div className="bg-emerald-50 px-5 py-3 rounded-2xl flex flex-col items-center border border-emerald-100/50">
            <span className="text-primary text-2xl font-black">{station.cleanEnergyPercentage}%</span>
            <span className="text-primary/70 text-[10px] font-bold uppercase tracking-widest">Clean Energy</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          <div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all">
            <Clock size={22} className="text-gray-400 mb-2 group-hover:text-primary transition-colors" />
            <span className="text-dark font-bold text-base">{station.waitTime}m</span>
            <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider">Queue wait</span>
          </div>
          <div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all">
            <Zap size={22} className="text-gray-400 mb-2 group-hover:text-amber-500 transition-colors" />
            <span className="text-dark font-bold text-base">${station.pricing.perKWh}</span>
            <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider">Per kWh</span>
          </div>
          <div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all">
            <Star size={22} className="text-amber-400 mb-2 fill-amber-400" />
            <span className="text-dark font-bold text-base">{station.rating}</span>
            <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider">({station.totalReviews})</span>
          </div>
        </div>

        {/* Port Status */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-dark mb-6 tracking-tight">Real-time Port Status</h2>
          <div className="grid grid-cols-1 gap-4">
            {station.ports.map((port) => (
              <div 
                key={port.id}
                className={`p-5 rounded-3xl border-2 transition-all flex items-center justify-between ${
                  port.status === 'available' 
                    ? 'border-emerald-100/50 bg-emerald-50/10 hover:bg-white hover:shadow-xl hover:shadow-emerald-50' 
                    : 'border-gray-50 bg-gray-50/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${port.status === 'available' ? 'bg-emerald-100 text-primary' : 'bg-gray-100 text-gray-400'}`}>
                    <Zap size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-dark flex items-center gap-2">
                       {port.power}
                       <span className="text-[10px] text-gray-400 font-medium px-2 py-0.5 bg-gray-100 rounded-md truncate uppercase">{port.type}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{port.id}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    port.status === 'available' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {port.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-10">
            <h2 className="text-xl font-bold text-dark mb-4 tracking-tight">On-site Amenities</h2>
            <div className="flex flex-wrap gap-2">
                {station.amenities.map(a => (
                    <span key={a} className="px-5 py-2.5 bg-gray-50 text-gray-600 rounded-2xl text-sm font-bold border border-gray-100/50 hover:bg-white hover:shadow-md transition-all cursor-default">
                        {a}
                    </span>
                ))}
            </div>
        </div>

        {/* Tip */}
        <div className="bg-amber-50/50 border border-amber-100/50 p-6 rounded-[32px] flex gap-4">
           <div className="bg-amber-100 p-3 rounded-2xl h-fit">
              <Info size={20} className="text-amber-700" />
           </div>
           <div>
              <h4 className="font-bold text-amber-900 mb-1">Community Insight</h4>
              <p className="text-amber-800 text-sm leading-relaxed opacity-80">
                 "Great spot! The cafe next door has excellent coffee and free WiFi while you wait. Usually less busy before 8 AM."
              </p>
           </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-8 border-t border-gray-100 bg-white/80 backdrop-blur-md flex gap-4 flex-shrink-0">
        <button 
          className="flex-1 flex items-center justify-center gap-3 py-4.5 px-6 border border-gray-200 text-dark font-extrabold rounded-2xl hover:bg-gray-50 hover:shadow-lg transition-all"
        >
          <MapIcon size={20} />
          Navigate
        </button>
        <button 
          onClick={() => setShowBooking(true)}
          className="flex-[1.5] py-4.5 px-6 bg-primary text-white font-extrabold rounded-2xl shadow-xl shadow-emerald-200 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] transition-all"
        >
          {station.waitTime > 0 ? 'Join Virtual Queue' : 'Book Session'}
        </button>
      </div>
    </div>
  );
};

export default StationDetails;
