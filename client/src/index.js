import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import ProductListVat from "./components/productListVat";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import NotFound from "./pages/NotFound";
import OrderComplete from "./pages/OrderComplete";
import { CartContextProvider } from "./contexts/CartContext";

// If the Node server displays a different URL than what's currently written here, then change uri value to Node server's provided URL.
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const cartItemsInitialState = [];

const Index = () => {
  const [cartItems, setCartItems] = useState(cartItemsInitialState);

  return (
    <ApolloProvider client={client}>
      <CartContextProvider>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<ProductListVat />} />
            <Route
              exact
              path="/product/:sku"
              element={
                <ProductDetail
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              }
            />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/complete" element={<OrderComplete />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </CartContextProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
