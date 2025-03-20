// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Adjust the URL as needed for your backend
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      const { token } = response.data;
      if (token) {
        onLoginSuccess(token);
      } else {
        setError('Login failed: no token returned');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login error');
    }
  };

  return (
    <motion.div 
      className="login-container" 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '2rem',
        background: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>Login</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2c3e50' }}>
            Email:
          </label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #dfe6e9',
              borderRadius: '4px'
            }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2c3e50' }}>
            Password:
          </label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #dfe6e9',
              borderRadius: '4px'
            }}
          />
        </div>
        <motion.button 
          type="submit"
          variants={buttonVariants}
          whileHover="hover"
          style={{
            width: '100%',
            padding: '0.75rem',
            background: '#3498db',
            border: 'none',
            borderRadius: '4px',
            color: '#ffffff',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Login
        </motion.button>
      </form>
    </motion.div>
  );
};

export default LoginForm;
