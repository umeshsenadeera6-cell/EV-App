import React, { useState } from 'react';
import { Search, Filter, MapPin, Zap, Clock } from 'lucide-react';
import { MOCK_STATIONS, useStationStore, getAvailablePorts } from '../../store/useStationStore';
import StationDetails from './StationDetails.tsx';
import './MapScreen.css';

const MapScreen: React.FC = () => {
  const { selectedStation, setSelectedStation } = useStationStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStations = MOCK_STATIONS.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="map-container">
      {/* Sidebar Panel */}
      <div className="map-sidebar">
        <div className="map-sidebar-header">
          <h2 className="text-2xl">Find Charging</h2>
          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search station or city..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
             <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-100 rounded-xl font-bold text-sm bg-gray-50">
                <Filter size={16} /> Filters
             </button>
          </div>
        </div>

        <div className="station-list">
          {filteredStations.map(station => (
            <div 
              key={station.id}
              className={`station-card ${selectedStation?.id === station.id ? 'selected' : ''}`}
              onClick={() => setSelectedStation(station)}
            >
              <div className="station-thumb">
                <Zap size={24} color={station.cleanEnergyPercentage >= 90 ? '#10b981' : '#f59e0b'} />
                <span className={`energy-badge ${station.cleanEnergyPercentage >= 90 ? 'high' : 'low'}`}>
                  {station.cleanEnergyPercentage}%
                </span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold">{station.name}</h4>
                <div className="flex items-center gap-4 mt-2">
                   <div className="flex items-center gap-1 text-[10px] font-black text-gray-400">
                      <Clock size={10} /> 5 min
                   </div>
                   <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600">
                      <Zap size={10} /> {getAvailablePorts(station)} {getAvailablePorts(station) === 1 ? 'port' : 'ports'}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map View Area */}
      <div className="map-view">
        <div className="map-placeholder">
           <MapPin size={48} className="text-gray-200" />
           <p>Interactive Map View</p>
        </div>

        <div className="map-markers">
           {MOCK_STATIONS.map((station, i) => (
              <div 
                key={station.id} 
                className={`marker ${selectedStation?.id === station.id ? 'selected' : ''}`}
                style={{ 
                  left: `${20 + (i * 15)}%`, 
                  top: `${30 + (i * 10)}%` 
                }}
                onClick={() => setSelectedStation(station)}
              >
                 <Zap size={20} className={station.cleanEnergyPercentage >= 90 ? 'text-primary' : 'text-amber'} />
              </div>
           ))}
        </div>

        {selectedStation && (
          <StationDetails 
            station={selectedStation} 
            onClose={() => setSelectedStation(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default MapScreen;
