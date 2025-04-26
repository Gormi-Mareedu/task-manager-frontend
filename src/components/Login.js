import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';  // ADD THIS

const Login = () => {
  const navigate = useNavigate(); // ADD THIS

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Email:', email);
      console.log('Password:', password);
  
      localStorage.setItem('token', 'dummyToken');
      navigate('/tasks');
      window.location.reload(); // 👉 reloads to refresh isLoggedIn state
  
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to right, #8EC5FC, #E0C3FC)',
    }}>
      <motion.form 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          width: '320px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#4B0082' }}>
          Welcome Back 👋
        </h2>

        {error && (
          <div style={{
            backgroundColor: '#ffdddd',
            color: '#d8000c',
            padding: '8px',
            marginBottom: '15px',
            borderRadius: '6px',
            textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
          required
        />

        <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Password:</label>
        <div style={{ position: 'relative' }}>
          <input 
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              width: '100%',
            }}
            required
          />
          <span 
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#555',
            }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>

        <button 
          type="submit"
          disabled={loading}
          style={{
            padding: '10px',
            backgroundColor: loading ? '#ccc' : '#6a11cb',
            backgroundImage: loading ? 'none' : 'linear-gradient(to right, #2575fc, #6a11cb)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '10px',
            transition: 'background 0.3s',
          }}
          onMouseOver={(e) => {
            if (!loading) e.target.style.backgroundImage = 'linear-gradient(to right, #6a11cb, #2575fc)';
          }}
          onMouseOut={(e) => {
            if (!loading) e.target.style.backgroundImage = 'linear-gradient(to right, #2575fc, #6a11cb)';
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <a href="#" style={{ fontSize: '14px', color: '#6a11cb', textDecoration: 'none' }}>
            Forgot Password?
          </a>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
