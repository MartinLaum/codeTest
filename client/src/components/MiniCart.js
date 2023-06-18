import React from "react";
import "./MiniCart.css";

const MiniCart = ({ cartItems }) => {
  // Calculate the total number of items in the cart
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="mini-cart">
      <span className="cart-badge">{cartItemCount}</span>
    </div>
  );
};

export default MiniCart;
