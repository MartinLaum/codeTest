import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../graphql/queries";

const ProductPriceCalc = ({ sku }) => {
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { sku },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (data && data.getProduct) {
    const product = data.getProduct;
    const priceWithVat = product.priceExVat * 1.21; // Add 21% VAT
    const discount3Percent = (priceWithVat * 0.97).toFixed(2); // Subtract 3% and round to 2 decimal places
    const discount10Percent = (priceWithVat * 0.9).toFixed(2); // Subtract 10% and round to 2 decimal places
    const discount3PercentExVAT = (product.priceExVat * 0.97).toFixed(2); // Subtract 3% and round to 2 decimal places
    const discount10PercentExVAT = (product.priceExVat * 0.9).toFixed(2); // Subtract 10% and round to 2 decimal places

    return {
      priceWithVat,
      discount3Percent,
      discount10Percent,
      discount3PercentExVAT,
      discount10PercentExVAT,
    };
  }

  return null;
};

export default ProductPriceCalc;
