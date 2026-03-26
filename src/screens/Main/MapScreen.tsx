import React, { useState } from 'react';
import { MOCK_STATIONS, useStationStore } from '../../store/useStationStore';
import { Search, Filter, MapPin, Zap, Clock, Star, ChevronRight } from 'lucide-react';
import StationDetails from './StationDetails';

const MapScreen: React.FC = () => {
  const { selectedStation, setSelectedStation } = useStationStore();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex h-full relative">
      {/* Side Panel (Search & List) */}
      <div className="w-full md:w-[400px] h-full bg-white border-r border-gray-200 flex flex-col z-10">
        <div className="p-6 border-b border-gray-100">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search charging stations..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-all text-sm font-medium">
              <Filter size={16} />
              Filters
            </button>
            <button className="px-4 py-2.5 bg-emerald-50 text-primary rounded-xl hover:bg-emerald-100 transition-all text-sm font-bold">
              Nearby
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {MOCK_STATIONS.map((station) => (
            <button
              key={station.id}
              onClick={() => setSelectedStation(station)}
              className={`w-full p-6 text-left border-b border-gray-50 transition-all hover:bg-gray-50 group ${
                selectedStation?.id === station.id ? 'bg-emerald-50/50 border-emerald-100' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-dark text-lg group-hover:text-primary transition-colors">
                    {station.name}
                  </h3>
                  <div className="flex items-center text-gray-400 text-sm mt-1">
                    <MapPin size={14} className="mr-1" />
                    {station.address}
                  </div>
                </div>
                <div className="bg-emerald-50 px-2.5 py-1 rounded-lg">
                  <span className="text-primary font-bold text-xs">{station.cleanEnergyPercentage}%</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1.5">
                  <Zap size={14} className="text-amber-500" />
                  <span className="text-xs font-bold text-dark">
                    {station.ports.filter(p => p.status === 'available').length} Available
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-gray-400" />
                  <span className="text-xs font-medium text-gray-500">{station.waitTime}m wait</span>
                </div>
                <div className="flex items-center gap-1.5 ml-auto">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-dark">{station.rating}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Area (Desktop) */}
      <div className="flex-1 bg-gray-100 relative hidden md:block">
        {/* Placeholder for real map */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#e5e7eb] overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="text-center z-10 bg-white/80 backdrop-blur-md p-8 rounded-[40px] shadow-2xl border border-white max-w-md mx-6">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin size={40} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-dark mb-3">Interactive Web Map</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Explore 10,000+ eco-certified charging stations in real-time. Powering 100% renewable energy across Australia.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
               {MOCK_STATIONS.map(s => (
                 <button 
                  key={s.id}
                  onClick={() => setSelectedStation(s)}
                  className={`w-10 h-10 rounded-full border-4 border-white shadow-lg transition-transform hover:scale-110 flex items-center justify-center ${
                    s.cleanEnergyPercentage >= 90 ? 'bg-primary' : 'bg-amber-400'
                  }`}
                 >
                   <Zap size={16} color="white" />
                 </button>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Overlay / Secondary Panel */}
      {selectedStation && (
        <div className="absolute inset-0 md:relative md:w-[450px] bg-white shadow-2xl z-20 overflow-y-auto">
           <StationDetails station={selectedStation} onClose={() => setSelectedStation(null)} />
        </div>
      )}
    </div>
  );
};

export default MapScreen;
