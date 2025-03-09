import React from "react";
import "./Footer.css"; // Ensure this file exists

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-3">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} Artbid. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
