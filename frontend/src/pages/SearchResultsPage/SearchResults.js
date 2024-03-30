import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SearchResults.css";
import banner from "../../images/banner.jpg";
import Layout from "../../components/Layout/Layout";
import Product from "../../components/Product/Product";
// import { useAuth } from "../context/AuthProvider";

function SearchResults() {
  const [product, setProduct] = useState({});
  const { productslug } = useParams();
  // const auth = useAuth();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/products/${productslug}`)
      .then((response) => {
        const Product = response.data.product;
        setProduct(Product);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [productslug]);

  return (
    <>
      <Layout>
        <div className="home">
          <div className="home__container">
            <img src={banner} alt="amazon_banner" className="home__image" />
            <div key={product._id} className="home__row">
              <Product
                key={product._id}
                id={product._id}
                name={product.name}
                desc={product.description}
                price={product.price}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default SearchResults;
