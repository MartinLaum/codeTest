import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      sku
      name
      priceExVat
      image
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($sku: String!) {
    getProduct(sku: $sku) {
      name
      priceExVat
      image
    }
  }
`;

export const UPDATE_CART = gql`
  mutation updateCart(
    $cartid: Int
    $productName: String
    $productSku: String
    $totalPrice: Float
    $quantity: Int
    $image: String
  ) {
    updateCart(
      cartid: $cartid
      productName: $productName
      productSku: $productSku
      totalPrice: $totalPrice
      quantity: $quantity
      image: $image
    ) {
      cartid
      productName
      productSku
      totalPrice
      quantity
    }
  }
`;

export const GET_CART = gql`
  query GetCart($cartid: Int!) {
    getCart(cartid: $cartid) {
      cartid
      productName
      productSku
      quantity
      totalPrice
      image
    }
  }
`;

export const DELETE_CART_ITEM = gql`
  mutation RemoveCartItem($cartid: Int, $productSku: String) {
    removeCartItem(cartid: $cartid, productSku: $productSku) {
      cartid
    }
  }
`;
export const DELETE_USER_CART = gql`
  mutation DeleteCart($cartid: Int) {
    deleteCart(cartid: $cartid)
  }
`;
