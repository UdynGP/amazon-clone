import React from "react";
import "./Cart.css";
import cartbanner from "../../images/cartbanner.jpg";
import CartTotal from "../../components/Cart/CartTotal";
import { useStateValue } from "../../context/StateProvider";
import CartProduct from "../../components/Cart/CartProduct";
import Layout from "../../components/Layout/Layout";

function Cart() {
  // eslint-disable-next-line no-unused-vars
  const [{ cart, user }, dispatch] = useStateValue();

  return (
    <>
      <Layout>
        <div className="cart">
          <div className="cart__left">
            <img className="cart__ad" src={cartbanner} alt="" />

            <div>
              {/* <h3>Hello, {user?.email}</h3> */}
              {cart?.length === 0 ? (
                <h2 className="cart__title">Your Shopping Cart is empty! 😢</h2>
              ) : (
                <h2 className="cart__title">Your Shopping Cart</h2>
              )}

              {cart.map((item) => (
                <CartProduct
                  key={item.slug}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                />
              ))}
            </div>
          </div>

          <div className="cart__right">
            <CartTotal />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Cart;
