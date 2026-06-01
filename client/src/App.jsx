import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from './api';

// Pages (we'll create these next)
import Signup from './pages/Signup';
import Login from './pages/Login';
import Payment from './pages/Payment';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';

// ─────────────────────────────────────────────────────
// ProtectedRoute: wraps any page that needs login
// If no token → redirect to login
// If loading → show spinner
// Otherwise → show the page
// ─────────────────────────────────────────────────────
function ProtectedRoute({ user, loading, children }) {
  if (!localStorage.getItem('token')) return <Navigate to="/login" />;
  if (loading) return <div>Loading...</div>;
  return children;
}

// ─────────────────────────────────────────────────────
// SmartRedirect: the "which page should I be on?" logic
// Runs when user visits "/" 
// ─────────────────────────────────────────────────────
function SmartRedirect({ user, loading }) {
  if (!localStorage.getItem('token')) return <Navigate to="/login" />;
  if (loading) return <div>Loading...</div>;
  if (!user.has_paid) return <Navigate to="/payment" />;
  if (!user.career_goal) return <Navigate to="/onboarding" />;
  return <Navigate to="/dashboard" />;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user data from server (called on load + after any state change)
  const fetchUser = async () => {
    try {
      const { data } = await api.get('/user/me');
      setUser(data);
    } catch {
      // Token invalid or expired — clean up
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <Routes>
      {/* "/" decides where to send you based on your state */}
      <Route path="/" element={<SmartRedirect user={user} loading={loading} />} />

      {/* Public routes */}
      <Route path="/signup" element={<Signup onAuth={fetchUser} />} />
      <Route path="/login"  element={<Login  onAuth={fetchUser} />} />

      {/* Payment: only if logged in AND not yet paid */}
      <Route path="/payment" element={
        <ProtectedRoute user={user} loading={loading}>
          {user?.has_paid
            ? <Navigate to="/onboarding" />
            : <Payment onPay={fetchUser} />}
        </ProtectedRoute>
      } />

      {/* Onboarding: only if paid AND not yet onboarded */}
      <Route path="/onboarding" element={
        <ProtectedRoute user={user} loading={loading}>
          {!user?.has_paid      ? <Navigate to="/payment" />   :
           user?.career_goal    ? <Navigate to="/dashboard" /> :
           <Onboarding onSubmit={fetchUser} />}
        </ProtectedRoute>
      } />

      {/* Dashboard: only if fully onboarded */}
      <Route path="/dashboard" element={
        <ProtectedRoute user={user} loading={loading}>
          {!user?.has_paid   ? <Navigate to="/payment" />   :
           !user?.career_goal? <Navigate to="/onboarding" /> :
           <Dashboard user={user} onLogout={handleLogout} />}
        </ProtectedRoute>
      } />
    </Routes>
  );
}
