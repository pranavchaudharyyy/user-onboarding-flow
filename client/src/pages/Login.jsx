import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Login({ onAuth }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      await onAuth();
      navigate('/'); // Go to "/" which smartly redirects
    } catch (e) {
      setError(e.response?.data?.error || 'Invalid credentials');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 24 }}>
      <h2>Welcome back</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={handleSubmit}>Login</button>
      </div>

      <p>No account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}