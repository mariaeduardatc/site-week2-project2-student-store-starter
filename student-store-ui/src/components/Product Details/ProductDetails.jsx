import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./ProductDetails.css";

import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [products, setProducts] = useState({});
  const [count, setCount] = useState(0);
  

  useEffect(() => {
    axios
      .get(`http://localhost:3001/store/${id}`)
      .then((response) => {
        setProducts(response.data.product);
      });
  }, []);

  function renderDetails() {
    if (!products) {
      return <h1 className="loading">Loading...</h1>;
    }
    if (products === -1) {
      return <NotFound />;
    } else {
      return (
        <div className="general-grid">
          <div className="product-view">
            <div className="image-view">
              <img src={products.image} alt="" />
            </div>

            <div className="product-info">
              <div className="general-info">
                <div className="description-line">
                  <p>{products.name}</p>
                </div>
                <p>${products.price}</p>
              </div>
              <div className="product-description">
                <p>{products.description}</p>
              </div>
            </div>

            <div className="back-home">
              <button>
                <a href="/">Back home</a>
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
  return renderDetails();
}
