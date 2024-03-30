import React from "react";
import ProductImageDisplay from "./ProductImageDisplay";
import { useStateValue } from "../../context/StateProvider";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import "./Product.css";

function Product({ id, name, desc, price }) {
  // eslint-disable-next-line no-unused-vars
  const [{ cart }, dispatch] = useStateValue();
  const [auth] = useAuth();
  // const [count, setCount] = useState(1);

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id,
        name: name,
        description: desc,
        price: price,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <h2>{name}</h2>
        <p>{desc}</p>
        <p className="product__price">
          <strong>${price}</strong>
        </p>
      </div>
      <ProductImageDisplay productId={id} />
      {!auth?.user ? (
        <Link to="/login">
          <button className="addtoCartbutton">Add to Cart</button>
        </Link>
      ) : (
        <>
          <button onClick={addToCart} className="addtoCartbutton">
            Add to Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Product;
