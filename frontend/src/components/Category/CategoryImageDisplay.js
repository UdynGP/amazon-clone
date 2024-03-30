import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Category.css";

const CategoryImageDisplay = ({ categoryId }) => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/categories/picture/${categoryId}`,
          {
            responseType: "blob",
          }
        );
        const blob = response.data;
        setImageData(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchImage();
  }, [categoryId]);

  return (
    <div>
      {imageData ? (
        <img
          src={imageData}
          alt={`Category ${categoryId}`}
          className="category__image"
        />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default CategoryImageDisplay;
