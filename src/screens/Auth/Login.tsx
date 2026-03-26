import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Zap, Globe, Shield } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import './Auth.css';

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
    <div className="auth-page">
      <div className="auth-hero">
         <div className="hero-content">
            <div className="hero-icon"><Zap size={40} color="white" /></div>
            <h1 className="hero-title">Welcome <br/><span style={{color: 'var(--color-primary)'}}>Home.</span></h1>
            <p className="hero-subtitle">Access Australia's largest network of solar-certified EV charging stations.</p>
         </div>
      </div>

      <div className="auth-form-side animate-in fade-in duration-700">
         <div className="auth-form-container">
            <h2 className="text-4xl font-black mb-8">Sign In</h2>
            
            {error && <div style={{ color: 'var(--color-red-500)', fontWeight: 800, marginBottom: 'var(--spacing-lg)' }}>{error}</div>}

            <form onSubmit={handleLogin}>
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

               <button disabled={loading} className="btn-primary-large" style={{ width: '100%' }}>
                  {loading ? 'Authenticating...' : 'Explore Stations'}
               </button>
            </form>

            <div className="social-grid">
               <button className="social-btn"><Globe size={18} /> Google</button>
               <button className="social-btn"><Shield size={18} /> SSH</button>
            </div>

            <p style={{ marginTop: 'var(--spacing-2xl)', textAlign: 'center', fontWeight: 800 }}>
               New to EcoCharge? <Link to="/register" style={{ color: 'var(--color-primary)' }}>Create account</Link>
            </p>
         </div>
      </div>
    </div>
  );
};

export default Login;
