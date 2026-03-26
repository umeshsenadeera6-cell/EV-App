import React, { useState } from 'react';
import { Search, Filter, MapPin, Zap, Clock, Mic } from 'lucide-react';
import { MOCK_STATIONS, useStationStore, getAvailablePorts } from '../../store/useStationStore';
import StationDetails from './StationDetails';
import './MapScreen.css';

const MapScreen: React.FC = () => {
  const { selectedStation, setSelectedStation } = useStationStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStations = MOCK_STATIONS.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="map-container">
      {/* Search Overlay */}
      <div className="map-search-overlay">
         <Search size={20} className="ml-4 text-gray-400" />
         <input 
           type="text" 
           placeholder="Search charging stations..."
           className="map-search-input"
           value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
         />
         <div className="flex gap-2 mr-2">
            <button className="p-3 bg-gray-50 rounded-full text-gray-400"><Mic size={20} /></button>
            <button className="p-3 bg-gray-50 rounded-full text-gray-400"><Filter size={20} /></button>
         </div>
      </div>

      {/* Floating Station List (Desktop Only/Sidebar) */}
      {!selectedStation && (
        <div className="map-sidebar hidden md:flex">
          <div className="p-6">
             <h2 className="text-xl font-black mb-4">Nearby Stations</h2>
             <div className="flex flex-col gap-4">
               {filteredStations.map(station => (
                 <div 
                   key={station.id}
                   className="p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-emerald-50 transition-colors"
                   onClick={() => setSelectedStation(station)}
                 >
                    <div className="flex justify-between mb-2">
                       <h4 className="font-black">{station.name}</h4>
                       <span className="text-xs font-black text-emerald-600">{station.cleanEnergyPercentage}% Clean</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted font-bold">
                       <div className="flex items-center gap-1"><Zap size={10} /> {getAvailablePorts(station)} Available</div>
                       <div className="flex items-center gap-1"><Clock size={10} /> 5 min</div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}

      {/* Map Content */}
      <div className="map-view">
         {/* Map markers would be here */}
         <div className="map-placeholder h-full w-full flex flex-col items-center justify-center bg-slate-100">
            <MapPin size={48} className="text-gray-300 mb-4 animate-bounce" />
            <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Interactive Map Visualization</p>
         </div>

         <div className="absolute inset-0 pointer-events-none">
            {MOCK_STATIONS.map((station, i) => (
               <div 
                 key={station.id} 
                 className="marker pointer-events-auto cursor-pointer"
                 style={{ 
                   position: 'absolute',
                   left: `${20 + (i * 15)}%`, 
                   top: `${30 + (i * 10)}%`,
                   transform: selectedStation?.id === station.id ? 'scale(1.5)' : 'scale(1)',
                   transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                 }}
                 onClick={() => setSelectedStation(station)}
               >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${selectedStation?.id === station.id ? 'bg-primary text-white' : 'bg-white text-primary'}`}>
                     <Zap size={20} fill="currentColor" />
                  </div>
               </div>
            ))}
         </div>

         {/* Selection Detail Drawer */}
         {selectedStation && (
           <div className="absolute inset-0 bg-white z-50 md:left-auto md:w-[500px] md:shadow-2xl animate-fade-in">
             <StationDetails 
               station={selectedStation} 
               onClose={() => setSelectedStation(null)} 
             />
           </div>
         )}
      </div>
    </div>
  );
};

export default MapScreen;
