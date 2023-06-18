import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";
import ProductList from "./ProductList";

const ProductListVat = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (data && data.getProducts) {
    const productsWithVAT = data.getProducts.map((product) => {
      const priceExVat = product.priceExVat;
      const priceWithVat = priceExVat * 1.21; // Add 21% VAT

      return {
        ...product,
        priceWithVat,
      };
    });

    return <ProductList products={productsWithVAT} />;
  }

  return <p>No products found.</p>;
};

export default ProductListVat;
