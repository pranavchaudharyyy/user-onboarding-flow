import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Onboarding({ onSubmit }) {
  const [form, setForm] = useState({
    college: '',
    graduation_year: '',
    career_goal: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await api.post('/user/onboarding', form);
      await onSubmit(); // Re-fetch user in App.jsx
      navigate('/dashboard');
    } catch (e) {
      setError(e.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 24 }}>
      <h2>Tell us about yourself</h2>
      <p>Just 3 quick questions to personalize your experience</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          placeholder="College Name"
          value={form.college}
          onChange={e => setForm({ ...form, college: e.target.value })}
        />
        <input
          placeholder="Graduation Year (e.g. 2025)"
          value={form.graduation_year}
          onChange={e => setForm({ ...form, graduation_year: e.target.value })}
        />
        <input
          placeholder="What is your career goal?"
          value={form.career_goal}
          onChange={e => setForm({ ...form, career_goal: e.target.value })}
        />
        <button onClick={handleSubmit}>Submit & Continue</button>
      </div>
    </div>
  );
}