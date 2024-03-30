import React from "react";
import SubcategoryImageDisplay from "./SubcategoryImageDisplay";
import { Link } from "react-router-dom";
import "./Subcategory.css";

function Subcategory({ id, name, categoryslug, subcategoryslug }) {
  return (
    <div className="subcategory">
      <div className="subcategory__info">
        <h2>{name}</h2>
      </div>
      <SubcategoryImageDisplay subcategoryId={id} />
      <Link to={`/${categoryslug}/${subcategoryslug}/products`}>
        <button className="subcategory__viewbtn">View Products</button>
      </Link>
    </div>
  );
}

export default Subcategory;
