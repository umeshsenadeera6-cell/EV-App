import React, { useState } from 'react';
import type { ChargingStation } from '../../store/useStationStore';
import { getAvailablePorts, useStationStore } from '../../store/useStationStore';
import { ChevronLeft, CheckCircle2, CreditCard } from 'lucide-react';
import { bookingService } from '../../services/booking';
import { useAuthStore } from '../../store/useAuthStore';
import './Booking.css';

interface Props {
  station: ChargingStation;
  onBack: () => void;
}

const Booking: React.FC<Props> = ({ station, onBack }) => {
  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState(30);
  const { user } = useAuthStore();
  const { setQueueEntry, setActiveReservation, activeReservation } = useStationStore();

  const handleBooking = async () => {
    if (!user) return;
    
    if (getAvailablePorts(station) > 0) {
      const reservation = await bookingService.createReservation(user.uid, station.id, duration);
      setActiveReservation(reservation);
    } else {
      const entry = await bookingService.joinQueue(user.uid, station.id);
      setQueueEntry(entry);
    }
    setStep(3);
  };

  return (
    <div className="booking-container animate-in slide-in-from-right duration-300">
      <header className="booking-header">
        <button onClick={onBack}><ChevronLeft size={24} /></button>
        <h3 className="text-xl font-black">Reserve at {station.name}</h3>
      </header>

      <div className="booking-body">
        <div className="step-indicator">
          {[1, 2, 3].map(s => (
            <div key={s} className={`step-dot ${s <= step ? 'active' : ''}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="animate-in fade-in duration-500">
            <h2 className="booking-title">Select Duration</h2>
            <p className="text-gray-400 font-bold mb-8 text-balance">Choose how long you need to charge. We'll find the best available port.</p>
            
            <div className="selection-grid">
              {[30, 60, 90, 120].map(d => (
                <div 
                  key={d} 
                  className={`selection-card ${duration === d ? 'selected' : ''}`}
                  onClick={() => setDuration(d)}
                >
                  <span className="text-xs font-black text-gray-400">SESSION</span>
                  <span className="text-2xl font-black">{d} min</span>
                  <span className="text-sm font-bold text-primary">~{Math.round(d * 0.8)} kWh</span>
                </div>
              ))}
            </div>
            
            <button className="btn-primary-large mt-12" onClick={() => setStep(2)}>
               Continue to Review
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in duration-500">
            <h2 className="booking-title">Confirm Booking</h2>
            <div style={{ backgroundColor: 'var(--color-gray-50)', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-2xl)', marginTop: 'var(--spacing-xl)' }}>
               <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400 font-bold">Estimated Cost</span>
                  <span className="text-xl font-black text-primary">$12.50</span>
               </div>
               <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400 font-bold">Clean Energy Rating</span>
                  <span className="text-emerald-600 font-black">98% (Solar Certified)</span>
               </div>
               <div className="flex items-center gap-3 p-4 bg-white rounded-xl border-1 border-gray-100 mt-8">
                  <CreditCard size={20} className="text-gray-400" />
                  <span className="font-bold">Visa ending in 4242</span>
               </div>
            </div>
            
            <button className="btn-primary-large mt-12" onClick={handleBooking}>
               {getAvailablePorts(station) > 0 ? 'Confirm Reservation' : 'Join Virtual Queue'}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="confirmation-view animate-in zoom-in duration-500">
            <div className="success-icon">
               <CheckCircle2 size={40} />
            </div>
            <h2 className="text-4xl font-black mb-4">You're all set!</h2>
            <p className="text-gray-400 font-bold mb-12 text-balance leading-relaxed">
               {activeReservation 
                 ? `Your port at ${station.name} is reserved. Head to the station to start charging.`
                 : `You've joined the queue. We'll notify you when a port is ready.`}
            </p>
            <button className="btn-primary-large" style={{ maxWidth: '300px' }} onClick={onBack}>
               Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
