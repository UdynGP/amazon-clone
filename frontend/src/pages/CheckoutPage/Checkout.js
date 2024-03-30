import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./Checkout.css";
import "../../components/Cart/CartTotal.css";
import { useAuth } from "../../context/AuthProvider";
import { useStateValue } from "../../context/StateProvider";
import CartProduct from "../../components/Cart/CartProduct";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { NumericFormat } from "react-number-format";
import { getCartTotal } from "../../Reducer";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Checkout() {
  const [auth] = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [{ cart }, dispatch] = useStateValue();
  const totalamount = getCartTotal(cart);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  const navigate = useNavigate();

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: totalamount,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      // eslint-disable-next-line no-unused-vars
      const { payer } = details;
      setSuccess(true);
    });
  };

  //capture likely error
  // eslint-disable-next-line no-unused-vars
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment");
  };

  useEffect(() => {
    if (success) {
      // alert("Payment successful!!");
      // console.log("Order successful . Your order id is--> ", orderID);
      axios.post(`${process.env.REACT_APP_API}/api/orders/create-order`, {
        products: cart.map((product) => product.id),
        paymentid: orderID,
        orderamount: totalamount,
        useremail: auth?.user?.email,
      });
      dispatch({
        type: "EMPTY_CART",
      });
      navigate(`/orders/user/${auth?.user?._id}`);
      toast.success("Order placed successfully!");
    }
  }, [
    success,
    orderID,
    totalamount,
    cart,
    auth?.user?._id,
    auth?.user?.email,
    dispatch,
    navigate,
  ]);

  // Handle Payment
  const handlePayment = () => {
    setShow(true);
  };

  return (
    <PayPalScriptProvider>
      <Layout>
        <div className="checkout">
          <div className="checkout__container">
            <h1>
              Checkout (<Link to="/cart">{cart?.length} item(s)</Link>)
            </h1>
            <div className="checkout__section">
              <div className="checkout__title">User Information</div>
              <div className="checkout__info">
                <p>{auth?.user?.name}</p>
                <p>{auth?.user?.email}</p>
                <p>{auth?.user?.contact}</p>
              </div>
            </div>
            <div className="checkout__section">
              <div className="checkout__title">Delivery Address</div>
              <div className="checkout__address">{auth?.user?.address}</div>
            </div>
            <div className="checkout__section">
              <div className="checkout__title">Review Order</div>
              <div className="checkout__items">
                {cart.map((item) => (
                  <CartProduct
                    key={item.slug}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    hideRemoveButton
                  />
                ))}
              </div>
            </div>
            <div className="checkout__section">
              <div className="checkout__title">Payment Method</div>
              <div className="checkout__details">
                <div>
                  <>
                    <div className="carttotal">
                      <NumericFormat
                        renderText={(value) => (
                          <>
                            {/* Part of the homework */}
                            Amount to be paid
                            <strong>
                              <h1>{value}</h1>
                            </strong>
                          </>
                        )}
                        decimalScale={2}
                        value={totalamount}
                        displayType="text"
                        thousandsGroupStyle="lakh"
                        thousandSeparator=","
                        prefix={"$"}
                      />
                      <button onClick={handlePayment} disabled={!totalamount}>
                        Make Payment
                        {show ? (
                          <PayPalButtons
                            style={{ layout: "vertical" }}
                            createOrder={createOrder}
                            onApprove={onApprove}
                          />
                        ) : null}
                      </button>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </PayPalScriptProvider>
  );
}

export default Checkout;
