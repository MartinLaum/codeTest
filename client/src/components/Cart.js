import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { useMutation } from "@apollo/client";
import { DELETE_CART_ITEM, DELETE_USER_CART } from "../graphql/queries";

const Cart = () => {
  const {carts, deleteCartItem, setCart} = useContext(CartContext);
  const [deleteCartItemServer] = useMutation(DELETE_CART_ITEM)
  const [deleteUserCart] = useMutation(DELETE_USER_CART)
  const cartid = parseInt(localStorage.getItem('cartId'));
  const navigate = useNavigate();
  const handleBuyNow = async () => {
    try{
      await deleteUserCart({variables: {cartid: cartid}});
      setCart([]);
      navigate("/complete");
    }catch{}
  };

  const cartItems = carts;

  // Calculate the total price, VAT total, and final price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );
  const VATamount = 0.21;
  const VATtotal = totalPrice * VATamount;
  const finalPrice = totalPrice + VATtotal;

  // Delete cart item

  const handleDelete = async (cartid, productSku)=>{
    try{
      await deleteCartItemServer({variables:{
        "cartid": cartid,
        "productSku": productSku
      }});
      deleteCartItem(cartid, productSku);
    }catch{}
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="cart-items">
            {cartItems.length === 0 ? <p className="mt-5">No cart items found.</p>:""}
            {cartItems.map((item) => (
              <div className="item d-flex justify-content-between align-items-center m-4" key={item.productSku}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="item-image img-thumbnail"
                  style={{ width: "100px", height: "1 00px" }}
                />
                <div className="item-info ml-3 d-flex gap-5 align-items-center justify-content-center">
                  <div>
                    <p>Name: {item.productName}</p>
                    <p>SKU: {item.productSku}</p>
                  </div>
                  <div>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ${item.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
                <div>
                <button type="button" className="btn btn-danger" onClick={()=>handleDelete(cartid,item.productSku)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <div className="cart-summary">
            <div className="total">
              <p className="total-text">Total:</p>
              <hr />
              <p>Prod. total: ${totalPrice.toFixed(2)}</p>
              <p>Prod. VAT total: ${VATtotal.toFixed(2)}</p>
              <hr />
              <p>VAT total: ${VATtotal.toFixed(2)}</p>
              <hr />
              <p>Final price: ${finalPrice.toFixed(2)}</p>
            </div>
            <button
              className="buy-now-button btn btn-primary mt-3"
              onClick={handleBuyNow}
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
