import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async(e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        email: email,
        createdAt: new Date().toISOString(),
      });
      alert("User registered!");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Create an Account</h2>
        <form onSubmit={handleRegister} className="register-form">
          <input
            type="email"
            placeholder="Email"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="register-button">Register</button>
        </form>
        <p className="register-footer">Already have an account? <span onClick={() => navigate('/')} className="login-link">Log in</span></p>
      </div>
    </div>
  );
};

export default RegisterPage;
