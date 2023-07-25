import { useQuery } from "@apollo/client";
import { createContext, useEffect, useState } from "react";
import { GET_CART } from "../graphql/queries";

export const CartContext = createContext([]);

export const CartContextProvider = ({ children }) => {
  const cartId = parseInt(localStorage.getItem('cartId'));
  const { data } = useQuery(GET_CART, {
    variables: {
      cartid: cartId
    },
    skip: isNaN(cartId) // Skip the query if cartId is not a valid number
  });
  const [carts, setCart] = useState([]);

  useEffect(() => {
    if (data?.getCart) {
      setCart(data.getCart);
    }
  }, [data]);

  const updateCart = (val) => {
    let isExist = false;
    let newCart = carts.map((cart) => {
      if (cart.productSku === val.productSku) {
        isExist = true;
        return val;
      } else {
        return cart;
      }
    });

    if (isExist) {
      setCart(newCart);
    } else {
      setCart((prevCart) => [...prevCart, val]);
    }
  };

  const deleteCartItem = (cartId, productSku) => {
    setCart((prevCart) =>
      prevCart.filter((cart) => !(cart.cartid === cartId && cart.productSku === productSku))
    );
  };

  const value = {
    carts,
    setCart,
    updateCart,
    deleteCartItem
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
