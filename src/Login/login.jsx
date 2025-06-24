import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Make sure this file exists in the same folder

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // try {
    // await signInWithEmailAndPassword(auth, email, password);
    // alert("Login successful!");
    // } catch (err) {
    // console.error(err.message);
    // }
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Welcome to BizTrackr</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Log In</button>
        </form>
        <p className="login-footer">© {new Date().getFullYear()} BizTrackr</p>
      </div>
    </div>
  );
};

export default LoginPage;
