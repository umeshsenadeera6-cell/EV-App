import React from 'react';
import { History, CreditCard, LayoutGrid, Leaf } from 'lucide-react';
import './WalletScreen.css';

const WalletScreen: React.FC = () => {
  const transactions = [
    { name: 'Colombo Green Hub', date: '2024-01-15', amount: 'Rs 1,130', energy: '45.2 kWh', co2: '3.2 kg' },
    { name: 'Kandy Solar Station', date: '2024-01-14', amount: 'Rs 1,078', energy: '42.1 kWh', co2: '2.9 kg' },
  ];

  return (
    <div className="wallet-container animate-fade-in">
      <header className="wallet-header">
        <h1 className="text-3xl font-black">Smart Wallet</h1>
        <p className="text-muted">Eco-friendly charging made simple</p>
      </header>

      <section className="wallet-card">
         <div className="flex justify-between items-start mb-4">
            <span className="wallet-balance-label">Total Saved This Month</span>
            <Leaf size={32} opacity={0.3} />
         </div>
         <div className="wallet-balance-value">Rs 890</div>
         
         <div className="wallet-stats">
            <div className="wallet-stat-item">
               <span className="wallet-stat-val">135.8</span>
               <span className="wallet-stat-lab">kWh</span>
            </div>
            <div className="wallet-stat-item">
               <span className="wallet-stat-val">9.7 kg</span>
               <span className="wallet-stat-lab">CO2 Saved</span>
            </div>
            <div className="wallet-stat-item">
               <span className="wallet-stat-val">12</span>
               <span className="wallet-stat-lab">Sessions</span>
            </div>
         </div>
      </section>

      <nav className="history-tabs">
         <button className="history-tab active"><History size={16} /> History</button>
         <button className="history-tab"><CreditCard size={16} /> Methods</button>
         <button className="history-tab"><LayoutGrid size={16} /> Plans</button>
      </nav>

      <div className="transaction-list">
         {transactions.map((tx, i) => (
            <div key={i} className="transaction-item">
               <div className="tx-info">
                  <div className="flex items-center gap-2 mb-1">
                     <h4 className="font-black">{tx.name}</h4>
                     <span style={{backgroundColor: '#ecfdf5', color: '#10b981', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', fontWeight: 900}}>eco</span>
                  </div>
                  <p>{tx.date}</p>
                  <p className="text-primary mt-1">🌱 Saved {tx.co2} CO2</p>
               </div>
               <div className="text-right">
                  <div className="tx-amount">{tx.amount}</div>
                  <p className="text-xs text-muted font-bold">{tx.energy}</p>
                  <div className="tx-status mt-2">completed</div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default WalletScreen;
