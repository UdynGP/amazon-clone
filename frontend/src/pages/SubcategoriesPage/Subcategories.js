import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Subcategories.css";
import banner from "../../images/banner.jpg";
import Layout from "../../components/Layout/Layout";
import Subcategory from "../../components/Subcategory/Subcategory";
// import { useAuth } from "../context/AuthProvider";

function Subcategories() {
  const [subcategories, setSubcategories] = useState([]);
  const { categoryslug } = useParams();
  // const auth = useAuth();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API}/api/subcategories/category/${categoryslug}`
      )
      .then((response) => {
        const allSubcategories = response.data.subcategories;
        setSubcategories(allSubcategories);
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
      });
  }, [categoryslug]);

  // Split products into chunks of 3 for each row
  const chunkedSubcategories = Array.from(
    { length: Math.ceil(subcategories.length / 3) },
    (_, i) => subcategories.slice(i * 3, i * 3 + 3)
  );

  return (
    <>
      <Layout>
        <div className="home">
          <div className="home__container">
            <img src={banner} alt="amazon_banner" className="home__image" />
            {chunkedSubcategories.map((rowSubcategories) => (
              <div key={rowSubcategories[0]._id} className="home__row">
                {rowSubcategories.map((subcategory) => (
                  <Subcategory
                    key={subcategory._id}
                    id={subcategory._id}
                    name={subcategory.name}
                    subcategoryslug={subcategory.slug}
                    categoryslug={categoryslug}
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

export default Subcategories;
