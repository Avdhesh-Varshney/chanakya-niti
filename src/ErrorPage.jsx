// src/ErrorPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.message}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <button onClick={handleBackToHome} style={styles.button}>Go to Home</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'serif',
  },
  title: {
    fontSize: '3rem',
    color: '#2c3e50',
  },
  message: {
    fontSize: '1.2rem',
    color: '#7f8c8d',
    textAlign: 'center',
    maxWidth: '600px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#2c3e50',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ErrorPage;
