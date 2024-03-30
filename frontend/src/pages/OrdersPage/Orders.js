import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Orders.css";
import Layout from "../../components/Layout/Layout";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/orders/user/${userId}`)
      .then((response) => {
        const sortedOrders = response.data.orders.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setOrders(sortedOrders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [userId]);
  return (
    <Layout>
      <div className="orders-container">
        <h1 className="orders-heading">Your Orders</h1>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Items</th>
              <th>Amount</th>
              <th>User Details</th>
              <th>Payment Status</th>
              <th>Transaction ID</th>
              <th>Order Status</th>
              <th>Created On</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td className="order-items">
                  {order.products.map((product) => (
                    <div key={product._id} className="order-item">
                      {product.name}
                    </div>
                  ))}
                </td>
                <td>${order.amount}</td>
                <td>{order.buyer.email}</td>
                <td>{order.paymentstatus}</td>
                <td>{order.paymentid}</td>
                <td>{order.orderstatus}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Orders;
