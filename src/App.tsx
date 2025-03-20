// src/App.tsx
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';

function App() {
  const [token, setToken] = useState<string | null>(null);

  const handleLoginSuccess = (receivedToken: string) => {
    // Store the token in localStorage
    localStorage.setItem('token', receivedToken);
    setToken(receivedToken);
  };

  return (
    <div>
      {!token ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <h2>Welcome!</h2>
          <p>You are logged in. Your token: {token}</p>
        </div>
      )}
    </div>
  );
}

export default App;
