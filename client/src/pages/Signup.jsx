import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Signup({ onAuth }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Update only the field that changed, keep rest the same
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await api.post('/auth/signup', form);
      localStorage.setItem('token', data.token); // Save token
      await onAuth();          // Fetch user data in App.jsx
      navigate('/payment');    // Move to next step
    } catch (e) {
      setError(e.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 24 }}>
      <h2>Create your account</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Sign Up</button>
      </div>

      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
}