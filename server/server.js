const demoProducts = require("./demoProducts.js");
const { ApolloServer, gql } = require("apollo-server");

// Define an object to store the cart data for each client
const clientCarts = {};

const typeDefs = gql`
  type Product {
    sku: String!
    name: String!
    priceExVat: Float!
    image: String
  }

  type Cart {
    cartid: Int!
    productName: String!
    productSku: String!
    totalPrice: Float!
    quantity: Int!
    image: String!
  }

  type Query {
    getProducts: [Product!]!
    getProduct(sku: String!): Product
    getCart(cartid: Int!): [Cart!]!
  }

  type Mutation {
    updateCart(
      cartid: Int
      productName: String
      productSku: String
      totalPrice: Float
      quantity: Int
      image: String
    ): Cart
    removeCartItem(cartid: Int, productSku: String): Cart
    deleteCart(cartid: Int): String
  }
`;

const resolvers = {
  Query: {
    getProducts: () => {
      return demoProducts;
    },
    getProduct: (_, { sku }) => {
      const product = demoProducts.find((product) => product.sku === sku);
      if (!product) {
        throw new Error(`Product with SKU ${sku} not found.`);
      }
      return product;
    },
    getCart: (_, { cartid }) => {
      // Retrieve the cart data for the specific client
      const cartItems = clientCarts[cartid];
      if (!cartItems) {
        throw new Error(`Cart with ID ${cartid} not found.`);
      }
      return cartItems;
    },
  },
  Mutation: {
    updateCart: (
      _,
      { cartid, productName, productSku, totalPrice, quantity, image }
    ) => {
      // Retrieve the cart data for the specific client
      let cartItems = clientCarts[cartid];
      if (!cartItems) {
        cartItems = [];
        clientCarts[cartid] = cartItems;
      }

      const cartItemIndex = cartItems.findIndex(
        (item) => item.productSku === productSku
      );
      if (cartItemIndex !== -1) {
        // Update existing cart item
        cartItems[cartItemIndex] = {
          cartid,
          productName,
          productSku,
          totalPrice,
          quantity,
          image,
        };
      } else {
        // Add new cart item
        cartItems.push({
          cartid,
          productName,
          productSku,
          totalPrice,
          quantity,
          image,
        });
      }
      return cartItems.find((item) => item.productSku === productSku);
    },
    removeCartItem: (_, { cartid, productSku }) => {
      // Retrieve the cart data for the specific client
      const cartItems = clientCarts[cartid];
      if (!cartItems) {
        throw new Error(`Cart with ID ${cartid} not found.`);
      }

      let deletedCart = {};
      const updateCart = cartItems.filter((cart) => {
        if (cart.productSku !== productSku) {
          return cart;
        } else {
          deletedCart = cart;
        }
      });
      clientCarts[cartid] = updateCart;
      return deletedCart;
    },
    deleteCart: (_, { cartid }) => {
      // Delete the cart data for the specific client
      delete clientCarts[cartid];
      return "Cart Deleted.";
    },
  },
};

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
