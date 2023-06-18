import React, { useState, useEffect, } from "react";
import { useParams } from "react-router-dom";
import {  useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../graphql/queries";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductPriceCalc from "./ProductPriceCalc";
import { useUpdateCart } from "../hooks/useUpdateCart";

const ProductDetail = ({ sku, priceWithVat }) => {
  const udpateCartHandler = useUpdateCart()
  const { sku: paramSku } = useParams();
  const [quantities, setQuantities] = useState({});
  const productPrice = ProductPriceCalc({ sku: paramSku });
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { sku: paramSku },
  });

  const handleDecrease = () => {
    if (quantities[paramSku] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [paramSku]: prevQuantities[paramSku] - 1,
      }));
    }
  };

  const handleIncrease = () => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [paramSku]: (prevQuantities[paramSku] || 0) + 1,
    }));
  };

  useEffect(() => {
    // Retrieve quantity values from localStorage
    const savedQuantities =
      JSON.parse(localStorage.getItem("quantities")) || {};
    setQuantities(savedQuantities);
    // Check if there is cartId
    let cartId = localStorage.getItem('cartId');
    if(!cartId){
      cartId = Math.round(Math.random()*1000000000);
      localStorage.setItem('cartId', cartId);
    }
  }, []);

  useEffect(() => {
    // Save quantity values to localStorage
    localStorage.setItem("quantities", JSON.stringify(quantities));
  }, [quantities]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (data && data.getProduct) {
    const product = data.getProduct;
    const productQuantity = quantities[paramSku] || 1;
    const {
      priceWithVat,
      discount3Percent,
      discount10Percent,
      discount3PercentExVAT,
      discount10PercentExVAT,
    } = productPrice;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex align-items-center justify-content-center h-100">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-md-6">
            <h2 style={{ fontWeight: "bold", textDecoration: "underline" }}>
              {product.name}
            </h2>
            <p>
              <strong>SKU:</strong> {paramSku}
            </p>
            <p>
              Price: <strong>${priceWithVat.toFixed(2)}</strong> (ex. VAT: $
              {product.priceExVat.toFixed(2)})
            </p>
            <hr />
            <p>
              <strong>Bulk Deals:</strong>
            </p>
            {discount3PercentExVAT && (
              <p>
                10 items = -3% discount - ${discount3Percent} (ex. VAT: $
                {discount3PercentExVAT})
              </p>
            )}
            {discount10PercentExVAT && (
              <p>
                20 items = -10% discount - ${discount10Percent} (ex. VAT: $
                {discount10PercentExVAT})
              </p>
            )}
            <div className="d-flex align-items-center">
              <button
                className="btn btn-sm btn-secondary rounded-0 mr-1"
                onClick={handleDecrease}
              >
                -
              </button>
              <input
                type="number"
                value={productQuantity}
                onChange={() => {}}
                className="form-control form-control-sm rounded-0 flex-grow-1"
                style={{ maxWidth: "70px" }}
              />
              <button
                className="btn btn-sm btn-secondary rounded-0 mr-1"
                onClick={handleIncrease}
              >
                +
              </button>
              <button className="btn btn-primary mx-5" onClick={()=>udpateCartHandler({...product, sku: paramSku}, quantities[paramSku] || 1)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <p>Product not found.</p>;
};

export default ProductDetail;
