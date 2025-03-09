import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Navbar = ({ onSignInClick, onSignUpClick }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/logo.jpeg" alt="Logo" width="40" height="40" className="me-2" />
          Artbid
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/dashboard" className="btn btn-outline-light me-2">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/postauction" className="btn btn-outline-light me-2">
                Post Auction
              </Link>
            </li>

            <li className="nav-item">
              <button className="btn btn-outline-light me-2" onClick={onSignInClick}>
                Sign In
              </button>
            </li>

            <li className="nav-item">
              <button className="btn btn-primary" onClick={onSignUpClick}>
                Sign Up
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;