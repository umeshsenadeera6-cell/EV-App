import React from 'react';
import type { ChargingStation } from '../../store/useStationStore';
import { useStationStore } from '../../store/useStationStore';
import { ChevronLeft, Calendar, Zap, CheckCircle2, CreditCard } from 'lucide-react';
import { bookingService } from '../../services/booking';
import { useAuthStore } from '../../store/useAuthStore';

interface Props {
  station: ChargingStation;
  onBack: () => void;
}

const Booking: React.FC<Props> = ({ station, onBack }) => {
  const [step, setStep] = React.useState(1);
  const [selectedPort, setSelectedPort] = React.useState(station.ports[0].id);
  const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split('T')[0]);
  const user = useAuthStore(state => state.user);
  const { setActiveReservation } = useStationStore();

  const handleConfirm = async () => {
    if (!user) return;
    
    const startTime = new Date(`${selectedDate}T10:00:00`);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const reservationId = await bookingService.createReservation({
      stationId: station.id,
      userId: user.uid,
      startTime,
      endTime,
      status: 'confirmed',
      portIndex: station.ports.findIndex(p => p.id === selectedPort),
    });

    setActiveReservation({
      id: reservationId,
      stationId: station.id,
      userId: user.uid,
      startTime,
      endTime,
      status: 'confirmed',
      portIndex: station.ports.findIndex(p => p.id === selectedPort),
    });

    setStep(3);
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
      <div className="p-8 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
        <button 
          onClick={onBack}
          className="p-3 hover:bg-gray-100 rounded-2xl transition-all"
        >
          <ChevronLeft size={24} className="text-dark" />
        </button>
        <span className="font-extrabold text-dark tracking-tight">Reserve a Spot</span>
        <div className="w-12" />
      </div>

      <div className="flex-1 overflow-y-auto p-10">
        <div className="flex items-center gap-2 mb-10 overflow-hidden rounded-full bg-gray-50 border border-gray-100 p-1">
          {[1, 2, 3].map(i => (
             <div 
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'bg-primary' : 'bg-gray-200'}`} 
             />
          ))}
        </div>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-dark mb-2">Select Duration</h2>
            <p className="text-gray-500 mb-10 font-medium">Choose when and where you want to charge.</p>
            
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                 <button 
                  onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                  className={`p-6 rounded-[32px] border-2 text-left transition-all ${
                    selectedDate === new Date().toISOString().split('T')[0] ? 'border-primary bg-emerald-50/50 ring-4 ring-emerald-50' : 'border-gray-100 hover:border-gray-200'
                  }`}
                 >
                    <Calendar size={24} className={selectedDate === new Date().toISOString().split('T')[0] ? 'text-primary' : 'text-gray-400'} />
                    <div className="mt-4 font-black text-dark text-lg">Today</div>
                    <div className="text-gray-500 text-sm mt-1">Limited spots left</div>
                 </button>
                 <button 
                   onClick={() => setSelectedDate(new Date(Date.now() + 86400000).toISOString().split('T')[0])}
                   className={`p-6 rounded-[32px] border-2 text-left transition-all ${
                    selectedDate !== new Date().toISOString().split('T')[0] ? 'border-primary bg-emerald-50/50 ring-4 ring-emerald-50' : 'border-gray-100 hover:border-gray-200'
                   }`}
                 >
                    <Calendar size={24} className={selectedDate !== new Date().toISOString().split('T')[0] ? 'text-primary' : 'text-gray-400'} />
                    <div className="mt-4 font-black text-dark text-lg">Tomorrow</div>
                    <div className="text-gray-500 text-sm mt-1">Available all day</div>
                 </button>
              </div>

              <div>
                <h3 className="font-bold text-dark mb-4 text-sm uppercase tracking-widest text-gray-400">Available Ports</h3>
                <div className="grid grid-cols-1 gap-3">
                   {station.ports.map(port => (
                      <button 
                        key={port.id}
                        onClick={() => setSelectedPort(port.id)}
                        className={`p-5 rounded-3xl border-2 flex items-center justify-between transition-all ${
                          selectedPort === port.id ? 'border-primary bg-emerald-50/50 ring-4 ring-emerald-50' : 'border-gray-100'
                        }`}
                      >
                         <div className="flex items-center gap-4">
                            <div className="bg-white p-2.5 rounded-2xl shadow-sm">
                              <Zap size={20} className={selectedPort === port.id ? 'text-primary' : 'text-gray-400'} />
                            </div>
                            <div className="text-left">
                               <div className="font-bold text-dark">{port.power}</div>
                               <div className="text-xs text-gray-400">{port.type}</div>
                            </div>
                         </div>
                         {selectedPort === port.id && <CheckCircle2 size={20} className="text-primary" />}
                      </button>
                   ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-dark mb-2">Final Confirmation</h2>
            <p className="text-gray-500 mb-10 font-medium whitespace-pre-wrap">A premium session at {"\n"}<span className="text-dark font-black">{station.name}</span></p>

            <div className="bg-gray-50 rounded-[40px] p-8 border border-gray-100 mb-8 space-y-6">
               <div className="flex justify-between items-center pb-6 border-b border-gray-200/50">
                  <div className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Rate</div>
                  <div className="text-dark font-bold">${station.pricing.perKWh} / kWh</div>
               </div>
               <div className="flex justify-between items-center pb-6 border-b border-gray-200/50">
                  <div className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Reservation Fee</div>
                  <div className="text-dark font-bold">$2.50</div>
               </div>
               <div className="flex justify-between items-center pt-2">
                  <div className="text-dark font-black text-xl tracking-tight">Total Estimated</div>
                  <div className="text-primary font-black text-2xl uppercase">$15 - $25</div>
               </div>
            </div>

            <div className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl mb-10">
               <div className="bg-emerald-500 p-2 rounded-xl text-white">
                  <CreditCard size={18} />
               </div>
               <div className="text-emerald-900 font-bold text-sm">Payment will be processed after your session.</div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center h-full text-center animate-in zoom-in-95 duration-700">
            <div className="w-24 h-24 bg-emerald-500 rounded-[32px] flex items-center justify-center mb-8 shadow-2xl shadow-emerald-200 animate-bounce">
              <CheckCircle2 size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-black text-dark mb-3 tracking-tight">Booking Confirmed!</h2>
            <p className="text-gray-500 mb-10 max-w-xs mx-auto font-medium">
               Your charging spot is ready. We've saved <span className="text-primary font-black">~5.4kg of CO2</span> for this trip.
            </p>
            <button 
              onClick={onBack}
              className="w-full py-5 bg-dark text-white font-extrabold rounded-[28px] shadow-2xl shadow-gray-200 hover:scale-[1.02] transition-all"
            >
              Back to Map
            </button>
          </div>
        )}
      </div>

      {step < 3 && (
        <div className="p-8 border-t border-gray-100 bg-white/80 backdrop-blur-md flex-shrink-0">
          <button 
            onClick={() => step === 1 ? setStep(2) : handleConfirm()}
            className="w-full py-5 bg-primary text-white font-extrabold rounded-[28px] shadow-2xl shadow-emerald-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center group"
          >
            {step === 1 ? 'Continue to Review' : 'Confirm & Reserve Spot'}
            <ChevronLeft size={20} className="ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Booking;
