import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import amazon_whitelogo from "../../images/logo_white.png";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // HandleSubmit
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        console.log(res);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src={amazon_whitelogo}
          alt="amazon_whitelogo"
        />
      </Link>
      <div className="login__container">
        <h2>Sign-in</h2>

        <form method="POST" onSubmit={handleLogin}>
          <h5>E-mail</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login__signInButton">
            Sign In
          </button>
        </form>

        <p>
          By signing in you agree to Amazon's conditions of Use & Sale. Please
          see our Privacy Notice, our Cookies Notice and our Interest-Based Ads
          Notice.
        </p>
        <Link to="/signup">
          <button className="login__signUpButton">
            Create your Amazon Account
          </button>
        </Link>
        <div className="login_info">
          <p>
            Forgot Password?
            <span>
              <Link to="/reset-password">Reset Now</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
