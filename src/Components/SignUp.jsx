import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUp.css";

const SignUp = ({ onClose = () => {}, onSwitchToSignIn = () => {} }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: fullName, email, password }), // Updated key to match backend
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Signup successful! Please sign in.");
        onSwitchToSignIn(); // Redirect to sign-in form
      } else {
        alert(`⚠️ ${data.message}`);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center">
      <div className="signup-box row d-flex align-items-center">
        <div className="text-end p-2">
          <button className="close-btn btn btn-light" onClick={onClose}>&times;</button>
        </div>

        <div className="col-md-6 signup-image">
          <img src="/sign up.jpg" alt="Sign Up" className="img-fluid" />
        </div>

        <div className="col-md-6 signup-form p-4">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter your name" 
                required 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
              />
            </div>
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
                placeholder="Create a password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
          <p className="text-center mt-3">
            Already have an account?  
            <button className="btn btn-link p-0" onClick={onSwitchToSignIn}>
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
