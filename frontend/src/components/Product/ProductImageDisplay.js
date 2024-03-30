import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Product.css";

const ProductImageDisplay = ({ productId }) => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/products/picture/${productId}`,
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
  }, [productId]);

  return (
    <div>
      {imageData ? (
        <img
          src={imageData}
          alt={`Product ${productId}`}
          className="product__image"
        />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default ProductImageDisplay;
