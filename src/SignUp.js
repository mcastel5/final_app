// src/SignUp.js
import React from 'react';
import './SignUp.css';

function SignUp() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Signed up!');
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}

export default SignUp;
