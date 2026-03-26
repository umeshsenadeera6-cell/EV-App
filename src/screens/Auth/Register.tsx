import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { setUser, setLoading, setError, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Mock registration
      setTimeout(() => {
        setUser({
          uid: '123',
          email,
          displayName: name,
          preferences: { minCleanEnergy: 90, preferredSpeeds: ['Fast'], notificationsEnabled: true },
          subscription: { tier: 'free' },
          stats: { totalCO2Saved: 0, totalSessions: 0, totalKWh: 0 }
        });
        setLoading(false);
        navigate('/');
      }, 1000);
    } catch (err) {
      setError('Failed to create account. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white selection:bg-emerald-100 selection:text-emerald-900">
      {/* Form Side */}
      <div className="flex items-center justify-center p-8 md:p-16 lg:p-24 animate-in slide-in-from-left duration-700 order-2 lg:order-1">
         <div className="w-full max-w-md">
            <div className="mb-12 text-center lg:text-left">
               <h2 className="text-4xl font-black text-dark tracking-tight mb-3">Join the Future</h2>
               <p className="text-gray-400 font-bold text-lg tracking-tight text-balance">Create your free account and start saving Carbon today.</p>
            </div>

            {error && (
               <div className="bg-red-50 border border-red-100 text-red-500 p-5 rounded-3xl text-sm font-bold mb-8 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  {error}
               </div>
            )}

            <form onSubmit={handleRegister} className="space-y-6 mb-12">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                  <div className="relative group">
                     <User size={20} className="absolute left-6 top-5 text-gray-300 group-focus-within:text-primary transition-colors" />
                     <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Umesh Senadeera"
                        className="w-full pl-16 pr-6 py-5 bg-gray-50 rounded-[28px] border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-emerald-50 outline-none transition-all font-bold text-dark placeholder:text-gray-300"
                     />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                  <div className="relative group">
                     <Mail size={20} className="absolute left-6 top-5 text-gray-300 group-focus-within:text-primary transition-colors" />
                     <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="driver@ecocharge.com"
                        className="w-full pl-16 pr-6 py-5 bg-gray-50 rounded-[28px] border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-emerald-50 outline-none transition-all font-bold text-dark placeholder:text-gray-300"
                     />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Password</label>
                  <div className="relative group">
                     <Lock size={20} className="absolute left-6 top-5 text-gray-300 group-focus-within:text-primary transition-colors" />
                     <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-16 pr-6 py-5 bg-gray-50 rounded-[28px] border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-emerald-50 outline-none transition-all font-bold text-dark placeholder:text-gray-300"
                     />
                  </div>
               </div>

               <div className="flex items-center gap-3 p-2 ml-2">
                  <input type="checkbox" required className="w-5 h-5 rounded-lg border-2 border-gray-200 text-primary focus:ring-primary/20" />
                  <span className="text-xs font-bold text-gray-500">I agree to the <button type="button" className="text-dark hover:underline">Terms</button> & <button type="button" className="text-dark hover:underline">Privacy Policy</button></span>
               </div>

               <button 
                  disabled={loading}
                  className="w-full py-5 bg-primary text-white font-extrabold rounded-[28px] shadow-2xl shadow-emerald-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
               >
                  {loading ? 'Creating Account...' : 'Get Started Now'}
                  <ArrowRight size={20} />
               </button>
            </form>

            <p className="text-center font-bold text-gray-500">
               Already a member? {' '}
               <Link to="/login" className="text-primary hover:underline decoration-2 underline-offset-4">Log in to Account</Link>
            </p>
         </div>
      </div>

      {/* Hero Side */}
      <div className="hidden lg:flex bg-emerald-50 relative overflow-hidden items-center justify-center p-24 order-1 lg:order-2">
         <div className="absolute inset-0 opacity-40 pointer-events-none" 
              style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
         
         <div className="relative z-10 text-center max-w-sm">
            <div className="w-32 h-32 bg-white rounded-[40px] flex items-center justify-center mx-auto mb-10 shadow-3xl shadow-emerald-500/10 border border-emerald-100">
               <ShieldCheck size={64} className="text-primary" />
            </div>
            <h3 className="text-3xl font-black text-dark mb-4 tracking-tight">Eco-Verified Network</h3>
            <p className="text-gray-500 font-bold mb-12 leading-relaxed">
               Every station in our network is audited for 100% renewable energy compliance and high-speed reliability.
            </p>
            
            <div className="bg-white/60 backdrop-blur-md rounded-[40px] p-8 border border-white flex gap-4 items-center">
                <div className="flex -space-x-4">
                   {[1,2,3,4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${i*10}`} alt="user" />
                      </div>
                   ))}
                </div>
                <div className="text-left">
                   <div className="text-dark font-black text-sm">Joining 10,000+ drivers</div>
                   <div className="text-emerald-600 text-[10px] font-black uppercase tracking-widest mt-1">Driving Green in Australia</div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Register;
