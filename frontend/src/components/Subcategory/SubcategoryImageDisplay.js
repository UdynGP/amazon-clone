import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Subcategory.css";

const SubcategoryImageDisplay = ({ subcategoryId }) => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/subcategories/picture/${subcategoryId}`,
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
  }, [subcategoryId]);

  return (
    <div>
      {imageData ? (
        <img
          src={imageData}
          alt={`Subcategory ${subcategoryId}`}
          className="subcategory__image"
        />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default SubcategoryImageDisplay;
