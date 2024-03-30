import React from "react";
import CategoryImageDisplay from "./CategoryImageDisplay";
import { Link } from "react-router-dom";
import "./Category.css";

function Category({ id, name, slug }) {
  return (
    <div className="category">
      <div className="category__info">
        <h2>{name}</h2>
      </div>
      <CategoryImageDisplay categoryId={id} />
      <Link to={`/${slug}/subcategories`}>
        <button className="category__viewbtn">View {name}</button>
      </Link>
    </div>
  );
}

export default Category;
