import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Zap, ArrowRight, Globe, Shield } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setLoading, setError, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Mock login for now
      setTimeout(() => {
        setUser({
          uid: '123',
          email,
          preferences: { minCleanEnergy: 90, preferredSpeeds: ['Fast'], notificationsEnabled: true },
          subscription: { tier: 'premium' },
          stats: { totalCO2Saved: 124.5, totalSessions: 18, totalKWh: 450 }
        });
        setLoading(false);
        navigate('/');
      }, 1000);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Left Decoration */}
      <div className="hidden lg:flex lg:w-1/2 bg-dark relative overflow-hidden items-center justify-center p-24">
         <div className="absolute inset-0 opacity-20 pointer-events-none" 
              style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
         
         <div className="relative z-10 max-w-lg">
            <div className="w-20 h-20 bg-primary rounded-[32px] flex items-center justify-center mb-12 shadow-2xl shadow-emerald-500/20">
               <Zap size={40} className="text-white" />
            </div>
            <h1 className="text-6xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
               Join the <span className="text-primary italic">Clean Energy</span> Revolution.
            </h1>
            <p className="text-white/40 text-xl font-medium leading-relaxed mb-16">
               Access 10,000+ eco-certified charging stations and track your environmental impact in real-time.
            </p>

            <div className="space-y-6">
                <div className="flex items-center gap-6 group cursor-default">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-primary/50 transition-all">
                        <span className="text-2xl">🌲</span>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">2.5k kg CO₂ Saved</h3>
                        <p className="text-white/20 text-sm font-medium">By our community this month</p>
                    </div>
                </div>
                <div className="flex items-center gap-6 group cursor-default">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-primary/50 transition-all">
                        <span className="text-2xl">⚡️</span>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">98% Renewable</h3>
                        <p className="text-white/20 text-sm font-medium">Average station clean energy rating</p>
                    </div>
                </div>
            </div>
         </div>
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white animate-in slide-in-from-right duration-700">
         <div className="w-full max-w-md">
            <div className="lg:hidden flex justify-center mb-12">
               <div className="bg-primary p-3 rounded-2xl shadow-xl">
                  <Zap size={32} className="text-white" />
               </div>
            </div>

            <div className="mb-12 text-center lg:text-left">
               <h2 className="text-4xl font-black text-dark tracking-tight mb-3">Welcome Back</h2>
               <p className="text-gray-400 font-bold text-lg tracking-tight">Login to your EcoCharge account</p>
            </div>

            {error && (
               <div className="bg-red-50 border border-red-100 text-red-500 p-5 rounded-3xl text-sm font-bold mb-8 flex items-center gap-3 animate-in shake duration-500">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  {error}
               </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6 mb-12">
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
                  <div className="flex justify-between items-center ml-4 pr-4">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Password</label>
                     <button type="button" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Forgot?</button>
                  </div>
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

               <button 
                  disabled={loading}
                  className="w-full py-5 bg-dark text-white font-extrabold rounded-[28px] shadow-2xl shadow-gray-200 hover:bg-emerald-600 hover:shadow-emerald-100 active:scale-95 transition-all flex items-center justify-center gap-3 group"
               >
                  {loading ? 'Authenticating...' : 'Sign in to Account'}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </form>

            <div className="relative mb-12">
               <div className="absolute inset-0 flex items-center text-gray-100"><hr className="w-full" /></div>
               <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest bg-white px-4 text-gray-300">Or continue with</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-12">
               <button className="flex items-center justify-center gap-3 py-4 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 rounded-2xl transition-all font-bold group">
                  <Globe size={20} className="text-gray-400 group-hover:text-amber-500 transition-colors" />
                  Google
               </button>
               <button className="flex items-center justify-center gap-3 py-4 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 rounded-2xl transition-all font-bold group">
                  <Shield size={20} className="text-gray-400 group-hover:text-dark transition-colors" />
                  Github
               </button>
            </div>

            <p className="text-center font-bold text-gray-500">
               Don't have an account? {' '}
               <Link to="/register" className="text-primary hover:underline decoration-2 underline-offset-4">Create one for free</Link>
            </p>
         </div>
      </div>
    </div>
  );
};

export default Login;
