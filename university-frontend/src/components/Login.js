import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '../store/api/AuthApi';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';



const LoginPage = () => {
    let navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [addLogin, { error, data, isLoading }] = useLoginMutation();
  
  useEffect(() => {
    if (data?.access) {
      Notification("login succesfull", "success");
      navigate("/home");
      window.location.reload();
      localStorage.setItem("token", data?.access);
    } else {
      Notification("login failed", "error");
    }
  }, [error, data, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', { username, password });
    if(username && password)
    {
        const logData = {
            username,
            password
        }
        await addLogin(logData)
    }
    else{
        alert("both username and password is required")
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#eafaf1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem 2.5rem',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '350px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#2e7d32', // dark green
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.3rem',
    fontSize: '0.9rem',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '0.6rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.7rem',
    backgroundColor: '#4f94d7',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  }
};

export default LoginPage;
