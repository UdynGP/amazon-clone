import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import banner from "../../images/banner.jpg";
import Product from "../../components/Product/Product";
import Layout from "../../components/Layout/Layout";
// import { useAuth } from "../context/AuthProvider";

function Home() {
  const [products, setProducts] = useState([]);
  // const auth = useAuth();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/products`)
      .then((response) => {
        const sortedProducts = response.data.products.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const displayedProducts = sortedProducts.slice(0, 9);
        setProducts(displayedProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Split products into chunks of 3 for each row
  const chunkedProducts = Array.from(
    { length: Math.ceil(products.length / 3) },
    (_, i) => products.slice(i * 3, i * 3 + 3)
  );

  return (
    <>
      <Layout>
        <div className="home">
          <div className="home__container">
            <img src={banner} alt="amazon_banner" className="home__image" />
            {chunkedProducts.map((rowProducts) => (
              <div key={rowProducts[0]._id} className="home__row">
                {rowProducts.map((product) => (
                  <Product
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    desc={product.description}
                    price={product.price}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Home;
