import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Login(){
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
        setError(error.message);
        return;
    }

    if (data.user) {
        navigate('/dashboard');
    }
    }
return (
  <div className="login-page">
    <div className="login-card">
      <h1 className="login-title">Login</h1>

      <form onSubmit={handleLogin} className="login-form">
        <div className="input-wrapper">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='login-btn-wrapper'>
          <button 
            className='login-btn'
            type="submit" 
            disabled={loading}
          >
            {loading ? 'Logging...' : 'Login'}
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}
      </form>

      <p className="signup-text">
        Don’t have an account? 
        <Link to='/signup'> Sign up</Link>
      </p>
    </div>
  </div>
);
}