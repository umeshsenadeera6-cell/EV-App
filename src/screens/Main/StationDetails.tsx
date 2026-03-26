import React, { useState } from 'react';
import type { ChargingStation } from '../../store/useStationStore';
import { X, MapPin, Zap, Clock, Star, Share2 } from 'lucide-react';
import Booking from './Booking.tsx';
import './StationDetails.css';

interface Props {
  station: ChargingStation;
  onClose: () => void;
}

const StationDetails: React.FC<Props> = ({ station, onClose }) => {
  const [showBooking, setShowBooking] = useState(false);

  if (showBooking) {
    return <Booking station={station} onBack={() => setShowBooking(false)} />;
  }

  return (
    <div className="station-details-overlay animate-in slide-in-from-bottom duration-300">
      <header className="details-header">
        <button className="close-btn" onClick={onClose}><X size={20} /></button>
        <div className="flex items-center gap-2 mb-2">
           <span style={{ backgroundColor: 'var(--color-primary-light)', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
              100% CLEAN ENERGY
           </span>
           <div className="flex items-center gap-1">
              <Star size={12} fill="var(--color-amber)" color="var(--color-amber)" />
              <span className="text-xs font-black">{station.rating}</span>
           </div>
        </div>
        <h2 className="text-3xl font-black">{station.name}</h2>
        <div className="flex items-center gap-2 mt-2 text-gray-400 font-bold">
           <MapPin size={16} />
           <span className="text-sm">Australia South, 2000 Sydney</span>
        </div>
      </header>

      <div className="details-body">
         <div className="info-grid">
            <div className="info-box">
               <Zap className="text-primary" size={20} />
               <div>
                  <div className="box-label">Power</div>
                  <div className="box-value">350 kW</div>
               </div>
            </div>
            <div className="info-box">
               <Clock className="text-amber" size={20} />
               <div>
                  <div className="box-label">Wait Time</div>
                  <div className="box-value">~15 min</div>
               </div>
            </div>
         </div>

         <div className="amenities">
            <h4 className="box-label mb-4">On-site Amenities</h4>
            <div className="flex flex-wrap gap-2">
               {['Coffee Shop', 'Fast WiFi', 'Lounge', 'Restrooms'].map(a => (
                  <span key={a} className="amenity-chip">{a}</span>
               ))}
            </div>
         </div>
      </div>

      <div className="booking-actions">
         <button className="btn-primary-large" onClick={() => setShowBooking(true)}>
            Reserve Port Now
         </button>
         <button style={{ backgroundColor: 'var(--color-gray-50)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-xl)' }}>
            <Share2 size={24} className="text-gray-400" />
         </button>
      </div>
    </div>
  );
};

export default StationDetails;
