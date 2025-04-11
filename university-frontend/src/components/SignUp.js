import React, { useEffect, useState } from 'react';
import {  useRegisterMutation } from '../store/api/AuthApi';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';


const SignupPage = () => {
    let navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [register, { error, data, isLoading }] = useRegisterMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (data?.username) {
      Notification("login succesfull", "success");
      navigate("/login");
    } else {
      Notification("login failed", "error");
    }
  }, [error, data, navigate]);

  const handleSignup = async(e) => {
    e.preventDefault();
    console.log(formData.password,formData.password_confirmation)
    if (formData.password !== formData.password_confirmation) {
      alert("Passwords do not match");
      return;
    }

    console.log('Signing up with:', formData);
    // Call your signup API here
    if(formData.username && formData.email && formData.password)
        {
            await register(formData)
        }
        else{
            alert("both username , email and password is required")
        }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Sign Up</button>
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
    width: '380px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#2e7d32',
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
  },
};

export default SignupPage;
