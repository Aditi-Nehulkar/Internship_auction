import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Footer from "./Components/Footer";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";
import PostAuction from "./Components/PostAuction";

const App = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showPostAuction, setShowPostAuction] = useState(false);
  

  return (
    <>
      {/* Pass 'setShowSignIn' and 'setShowSignUp' to Navbar */}
      <Navbar 
       onDashboardToggle={() => setShowDashboard(!showDashboard)}
       onPostAuctionToggle={() => setShowPostAuction(!showPostAuction)}
        onSignInClick={() => setShowSignIn(true)} 
        onSignUpClick={() => setShowSignUp(true)} 
      />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/postauction" element={<PostAuction />} />
      </Routes>


      {/* Sign In Modal */}
      {showSignIn && <SignIn onClose={() => setShowSignIn(false)} />}
      
      {/* Sign Up Modal (optional) */}
      {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}

     

      <Footer />
    </>
  );
};

export default App;

