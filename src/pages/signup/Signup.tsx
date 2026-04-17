import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

   
    if (!data.session) {
      setMessage('Check your email to confirm your account.');
      return;
    }

    
    if (data.user) {
      navigate('/dashboard');
    }
  };

return (
  <div className="login-page">
    <div className="login-card">
      <h1 className="login-title">Create Account</h1>

      <form onSubmit={handleSignup} className="login-form">
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

        <div className='login-btn-wrapper signup'>
          <button 
            className='login-btn signup'
            type="submit" 
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}
        {message && <p className="success-text">{message}</p>}
      </form>

      <p className="signup-text">
        Already have an account?
        <Link to='/login'> Login</Link>
      </p>
    </div>
  </div>
);
}