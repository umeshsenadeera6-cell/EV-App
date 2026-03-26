import React, { useState } from 'react';
import { Zap, Info, ArrowRight, Plug2 } from 'lucide-react';
import type { ChargingStation } from '../../store/useStationStore';
import Booking from './Booking';
import './StationDetails.css';

interface Props {
  station: ChargingStation;
  onClose: () => void;
}

const StationDetails: React.FC<Props> = ({ station, onClose }) => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedConnector, setSelectedConnector] = useState<string>('CCS');

  if (showBooking) {
    return <Booking station={station} onBack={() => setShowBooking(false)} />;
  }

  const connectors = [
    { type: 'CCS', power: '150kW', status: 'available' },
    { type: 'Type 2', power: '22kW', status: 'available' },
    { type: 'CHAdeMO', power: '50kW', status: 'occupied' },
  ];

  return (
    <div className="station-details-container animate-fade-in">
      <header className="details-header">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowRight size={24} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <h2 className="text-xl font-black">Smart Charging</h2>
        <Info size={20} className="text-gray-400" />
      </header>

      <div className="station-main-info">
         <img 
           src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=200&auto=format&fit=crop" 
           alt={station.name} 
           className="station-img"
         />
         <div>
            <h3 className="text-2xl font-black mb-1">{station.name}</h3>
            <p className="text-muted font-bold text-sm">Solar-powered station</p>
            <div className="renewable-text">
               <div className="w-2 h-2 rounded-full bg-primary" />
               100% renewable
            </div>
         </div>
         <div className="station-status-badge">Available</div>
      </div>

      <section className="mb-8">
         <h3 className="text-xl font-black mb-6">Select Connector</h3>
         <div className="connector-grid">
            {connectors.map(c => (
               <div 
                 key={c.type}
                 className={`connector-card ${selectedConnector === c.type ? 'active' : ''} ${c.status === 'occupied' ? 'occupied' : ''}`}
                 onClick={() => c.status !== 'occupied' && setSelectedConnector(c.type)}
               >
                  <div className="p-3 bg-gray-50 rounded-2xl mb-2 text-dark">
                     <Plug2 size={24} />
                  </div>
                  <span className="font-black text-sm">{c.type}</span>
                  <span className="text-xs text-muted font-extrabold">{c.power}</span>
                  {c.status === 'occupied' && <span className="occupied-text">Occupied</span>}
               </div>
            ))}
         </div>
      </section>

      <section className="charging-mode-section">
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-black">Charging Mode</h3>
            <button className="text-primary font-bold text-sm">Compare modes ∨</button>
         </div>
         <div className="eco-mode-banner">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
                  <Zap size={24} fill="currentColor" />
               </div>
               <div>
                  <h4 className="font-black text-lg">Eco Mode</h4>
                  <p className="text-xs font-bold text-emerald-700">Recommended for battery longevity</p>
               </div>
            </div>
            <span className="eco-mode-tag">Recommended</span>
         </div>
      </section>

      <button className="btn-start-journey" onClick={() => setShowBooking(true)}>
         Start Your Journey <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default StationDetails;
