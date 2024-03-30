import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Categories.css";
import banner from "../../images/banner.jpg";
import Category from "../../components/Category/Category";
import Layout from "../../components/Layout/Layout";
// import { useAuth } from "../context/AuthProvider";

function Categories() {
  const [categories, setCategories] = useState([]);
  // const auth = useAuth();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/categories`)
      .then((response) => {
        const allCategories = response.data.categories;
        setCategories(allCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Split products into chunks of 3 for each row
  const chunkedCategories = Array.from(
    { length: Math.ceil(categories.length / 3) },
    (_, i) => categories.slice(i * 3, i * 3 + 3)
  );

  return (
    <>
      <Layout>
        <div className="home">
          <div className="home__container">
            <img src={banner} alt="amazon_banner" className="home__image" />
            {chunkedCategories.map((rowCategories) => (
              <div key={rowCategories[0]._id} className="home__row">
                {rowCategories.map((category) => (
                  <Category
                    key={category._id}
                    id={category._id}
                    name={category.name}
                    slug={category.slug}
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

export default Categories;
