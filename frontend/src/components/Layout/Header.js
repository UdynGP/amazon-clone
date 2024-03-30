import React from "react";
import { Link, useNavigate } from "react-router-dom";
import amazonlogo from "../../images/logo.png";
import "./Header.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStateValue } from "../../context/StateProvider";
import { useAuth } from "../../context/AuthProvider";
import { useSearch } from "../../context/SearchProvider";
import { toast } from "react-toastify";
import axios from "axios";

function Header() {
  // eslint-disable-next-line no-unused-vars
  const [{ cart }, dispatch] = useStateValue();
  const [auth, setAuth] = useAuth();
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.clear();
    toast.success("Logged Out Successfully!");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/products/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate(`/products/search/${data[0].slug}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={amazonlogo} className="header__logo" alt="amazon_logo" />
      </Link>
      <div className="header__search">
        <input
          type="text"
          className="header__searchInp"
          placeholder="Search Products"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="header__searchBtn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="header__nav">
        <Link to="/categories" className="header__navlink">
          <div className="header__singleoption">Categories</div>
        </Link>
        {!auth?.user ? (
          <>
            <Link to="/login" className="header__navlink">
              <div className="header__singleoption">Sign In</div>
            </Link>
            <Link to="/signup" className="header__navlink">
              <div className="header__singleoption">Sign Up</div>
            </Link>
            <Link to="/login" className="header__navlink">
              <div className="header__option">
                <span className="header__optionLineOne">Amazon</span>
                <span className="header__optionLineTwo">Prime</span>
              </div>
            </Link>
            <Link to="/login" className="header__navlink">
              <div className="header__optionCart">
                <ShoppingCartIcon fontSize="large" />
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link
              to={`/profile/user/${auth?.user?._id}`}
              className="header__navlink"
            >
              <div className="header__option">
                <span className="header__optionLineOne">Hello</span>
                <span className="header__optionLineTwo">
                  {auth?.user?.name}
                </span>
              </div>
            </Link>

            <Link
              to={`/orders/user/${auth?.user?._id}`}
              className="header__navlink"
            >
              <div className="header__option">
                <span className="header__optionLineOne">Your</span>
                <span className="header__optionLineTwo">Orders</span>
              </div>
            </Link>
            <Link to="/amazon-prime" className="header__navlink">
              <div className="header__option">
                <span className="header__optionLineOne">Your</span>
                <span className="header__optionLineTwo">Prime</span>
              </div>
            </Link>
            <Link to="/cart" className="header__navlink">
              <div className="header__optionCart">
                <ShoppingCartIcon fontSize="large" />
                <span className="header__cartCount">{cart?.length}</span>
              </div>
            </Link>
            <Link onClick={handleLogout} to="/" className="header__navlink">
              <div className="header__singleoption">Logout</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
