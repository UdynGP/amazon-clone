import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <h4 className="text-center">
        All rights reserved &copy; {new Date().getFullYear()} | Amazon.com
      </h4>
      <p className="text-center">
        <Link to="/about-us">About Amazon</Link>|
        <Link to="/contact-us">Contact Us</Link>|
        <Link to="/privacy-policy">Privacy Policy</Link>
      </p>
    </footer>
  );
};

export default Footer;
