import { useState } from 'react';
import api from '../api';

export default function Payment({ onPay }) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      await api.post('/user/pay');
      await onPay(); // This re-fetches user — App.jsx sees has_paid=1
      // App.jsx will now redirect to /onboarding automatically
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', textAlign: 'center', padding: 24 }}>
      <h2>Complete Your Purchase</h2>
      <p>Get lifetime access to the platform</p>
      <h1>₹4,999</h1>
      <button
        onClick={handlePay}
        disabled={loading}
        style={{ padding: '14px 32px', fontSize: 18, cursor: 'pointer' }}
      >
        {loading ? 'Processing...' : 'Pay ₹4,999'}
      </button>
      <p style={{ color: 'gray', fontSize: 12, marginTop: 8 }}>
        This is a simulated payment. No real money involved.
      </p>
    </div>
  );
}