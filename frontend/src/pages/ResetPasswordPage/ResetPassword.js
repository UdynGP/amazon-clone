import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./ResetPassword.css";
import amazon_whitelogo from "../../images/logo_white.png";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [secretanswer, setSecretAnswer] = useState("");

  const navigate = useNavigate();

  // HandleSubmit
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/reset-password`,
        { email, secretanswer, newpassword }
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
    <div className="resetpwd">
      <Link to="/">
        <img
          className="resetpwd__logo"
          src={amazon_whitelogo}
          alt="amazon_whitelogo"
        />
      </Link>
      <div className="resetpwd__container">
        <h2>Reset Password</h2>

        <form method="POST" onSubmit={handleReset}>
          <h5>E-mail</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
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

          <h5>New Password</h5>
          <input
            type="password"
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="At least 6 characters"
            id="password"
            required
          />

          <button type="submit" className="resetpwd__Button">
            Submit
          </button>
        </form>
        <Link to="/">
          <button className="resetpwd__backButton">Back to Home Page</button>
        </Link>
      </div>
    </div>
  );
}

export default ResetPassword;
