import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <header className="hero-section">
      <div className="overlay">
        <div className="container text-center text-white">
          <h1 className="hero-title">Welcome to ArtBid</h1>
          <p className="lead">Where art is admiried and respected</p>
        </div>
      </div>
    </header>
  );
};

export default Hero;
