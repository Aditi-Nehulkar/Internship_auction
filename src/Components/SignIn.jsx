import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignIn.css";

const SignIn = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", { // Fixed API endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Removed incorrect 'username' key
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Sign-in successful!");
        localStorage.setItem("token", data.token); // Save token for authentication
        setEmail("");
        setPassword("");
        onClose();
      } else {
        alert(`⚠️ ${data.message}`);
      }
    } catch (error) {
      alert("❌ Error signing in. Please try again.");
    }
  };

  return (
    <div className="signin-backdrop" onClick={onClose}>
      <div className="signin-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Left Side: Image */}
        <div className="signin-image">
          <img src="/signin 1.jpg" alt="Sign In" />
        </div>

        {/* Right Side: Form */}
        <div className="signin-form">
          <button className="close-btn" onClick={onClose}>&times;</button>
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Enter your email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Enter your password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
