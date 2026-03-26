import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import './Auth.css';

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
    <div className="auth-page">
      <div className="auth-form-side animate-in fade-in duration-700">
         <div className="auth-form-container">
            <h2 className="text-4xl font-black mb-8">Join the Pulse</h2>
            
            {error && <div style={{ color: 'var(--color-red-500)', fontWeight: 800, marginBottom: 'var(--spacing-lg)' }}>{error}</div>}

            <form onSubmit={handleRegister}>
               <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <div className="input-wrapper">
                     <UserIcon className="input-icon" size={20} />
                     <input 
                        type="text" 
                        required 
                        className="form-input" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Umesh Senadeera"
                     />
                  </div>
               </div>

               <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-wrapper">
                     <Mail className="input-icon" size={20} />
                     <input 
                        type="email" 
                        required 
                        className="form-input" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="driver@ecocharge.com"
                     />
                  </div>
               </div>

               <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-wrapper">
                     <Lock className="input-icon" size={20} />
                     <input 
                        type="password" 
                        required 
                        className="form-input" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                     />
                  </div>
               </div>

               <button disabled={loading} className="btn-primary-large" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                  {loading ? 'Joining...' : 'Get Started Now'}
                  <ArrowRight size={20} />
               </button>
            </form>

            <p style={{ marginTop: 'var(--spacing-2xl)', textAlign: 'center', fontWeight: 800 }}>
               Already driving green? <Link to="/login" style={{ color: 'var(--color-primary)' }}>Sign In</Link>
            </p>
         </div>
      </div>

      <div className="auth-hero light">
         <div className="hero-content">
            <div className="hero-icon" style={{backgroundColor: 'white'}}><ShieldCheck size={40} color="var(--color-primary)" /></div>
            <h1 className="hero-title">Eco-Verified <br/>Network.</h1>
            <p className="hero-subtitle">Every station in our network is audited for 100% renewable energy compliance.</p>
         </div>
      </div>
    </div>
  );
};

export default Register;
