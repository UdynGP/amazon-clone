import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Signup.css";
import amazon_whitelogo from "../../images/logo_white.png";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setConfirmPassword] = useState("");
  const [secretanswer, setSecretAnswer] = useState("");

  const navigate = useNavigate();

  // HandleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/signup`,
        { name, email, contact, address, password, cpassword, secretanswer }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="signup">
      <Link to="/">
        <img
          className="signup__logo"
          src={amazon_whitelogo}
          alt="amazon_whitelogo"
        />
      </Link>
      <div className="signup__container">
        <h2>Create an Account</h2>

        <form method="POST" onSubmit={handleSubmit}>
          <h5>Name</h5>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            required
          />

          <h5>E-mail</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            required
          />

          <h5>Contact</h5>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter country code"
            id="contact"
            required
          />

          <h5>Address</h5>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            id="address"
            required
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            id="password"
            required
          />

          <h5>Confirm Password</h5>
          <input
            type="password"
            value={cpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="cpassword"
            required
          />

          <h5>Secret Answer</h5>
          <input
            type="text"
            value={secretanswer}
            onChange={(e) => setSecretAnswer(e.target.value)}
            placeholder="Which city were you born in"
            id="secretanswer"
            required
          />

          <button type="submit" className="signup__signUpButton">
            Create Account
          </button>
        </form>

        <div className="signup_info">
          <p>
            Already on Amazon?
            <span>
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
