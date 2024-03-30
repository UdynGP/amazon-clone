import React from "react";
import "./CartProduct.css";
import { useStateValue } from "../../context/StateProvider";
import ProductImageDisplay from "../Product/ProductImageDisplay";

function CartProduct({ id, name, price, description, hideRemoveButton }) {
  // eslint-disable-next-line no-unused-vars
  const [{ cart }, dispatch] = useStateValue();

  const removeFromCart = () => {
    // remove the item from the cart
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  return (
    <div className="cartProduct">
      <div className="cartProduct__info">
        <p className="cartProduct__title">{name}</p>
        <p className="cartProduct__title">{description}</p>
        <p className="cartProduct__price">
          <strong>
            <h2>${price}</h2>
          </strong>
        </p>
        <ProductImageDisplay productId={id} className="cartProduct__image" />
        {!hideRemoveButton && <button onClick={removeFromCart}>Remove</button>}
      </div>
    </div>
  );
}

export default CartProduct;
