import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useMutation } from "@apollo/client";
import { UPDATE_CART } from "../graphql/queries";

export const useUpdateCart = () => {
  const { carts, updateCart } = useContext(CartContext);
  const [cartUpdate, { error: cartError }] = useMutation(UPDATE_CART);

  return async function updateCartHandler(product, quantity) {
    let cartId = localStorage.getItem("cartId");
    if (!cartId) {
      cartId = Math.round(Math.random() * 1000000000);
      localStorage.setItem("cartId", cartId);
    }

    const { name, image, sku, priceExVat } = product;
    const priceWithVat = priceExVat * 1.21; // Add 21% VAT
    const discount3Percent = (priceWithVat * 0.97).toFixed(2); // Subtract 3% and round to 2 decimal places
    const discount10Percent = (priceWithVat * 0.9).toFixed(2); // Subtract 10% and round to 2 decimal places

    const existingProduct = carts.find((cart) => cart.productSku === sku);

    if (existingProduct) {
      quantity += existingProduct.quantity;
    }

    let totalPrice = 0;
    if (quantity < 10) {
      totalPrice = priceWithVat * quantity;
    } else if (quantity < 20 && quantity >= 10) {
      console.log(discount3Percent);
      totalPrice = discount3Percent * quantity;
    } else {
      totalPrice = discount10Percent * quantity;
    }

    try {
      await cartUpdate({
        variables: {
          cartid: parseInt(cartId),
          productName: name,
          image: image,
          productSku: sku,
          totalPrice: totalPrice,
          quantity: quantity,
        },
      });
      updateCart({
        cartid: cartId,
        productName: name,
        image: image,
        productSku: sku,
        totalPrice: totalPrice,
        quantity: quantity,
      });
      console.log({
        cartid: cartId,
        productName: name,
        image: image,
        productSku: sku,
        totalPrice: totalPrice,
        quantity: quantity,
      });
    } catch {
      console.log(cartError);
    }
  };
};
