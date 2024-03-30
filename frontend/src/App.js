import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Cart from "./pages/CartPage/Cart";
import Categories from "./pages/CategoriesPage/Categories";
import Subcategories from "./pages/SubcategoriesPage/Subcategories";
import Login from "./pages/LoginPage/Login";
import Signup from "./pages/SignUpPage/Signup";
import ResetPassword from "./pages/ResetPasswordPage/ResetPassword";
import PageNotFound from "./pages/pageNotFoundPage/PageNotFound";
import ExternalRedirect from "./components/ExternalRedirect";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./pages/ProductsPage/Products";
import About from "./pages/AboutPage/About";
import Contact from "./pages/ContactPage/Contact";
import Policy from "./pages/PrivacyPolicyPage/Policy";
import Checkout from "./pages/CheckoutPage/Checkout";
import Orders from "./pages/OrdersPage/Orders";
import Profile from "./pages/ProfilePage/Profile";
import PrivateRoute from "./PrivateRoute";
import SearchResults from "./pages/SearchResultsPage/SearchResults";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/:categoryslug/subcategories"
            element={<Subcategories />}
          />
          <Route
            path="/:categoryslug/:subcategoryslug/products"
            element={<Products />}
          />
          <Route
            path="/products/search/:productslug"
            element={<SearchResults />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="user/:userId" element={<Profile />} />
          </Route>
          <Route path="/orders" element={<PrivateRoute />}>
            <Route path="user/:userId" element={<Orders />} />
          </Route>
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/privacy-policy" element={<Policy />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/amazon-prime" element={<ExternalRedirect />} />
        </Routes>
        <ToastContainer autoClose={1500} />
      </div>
    </Router>
  );
}

export default App;
