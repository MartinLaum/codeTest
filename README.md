## Project Setup and Execution Instructions

This project is a coding test that demonstrates the implementation of a ReactJS application with a GraphQL server using Apollo Server and Apollo Client. The application allows users to view product details, add items to a shopping cart, and manage the cart.

### Requirements

To run this project, ensure you have the following dependencies installed:

- Node.js (version 14 or above)
- NPM (Node Package Manager)

### Server Setup

1. Extract the project ZIP file to a directory of your choice.
2. Navigate to the server directory by running the following command:

   ```
   cd client
   ```
3. Install the required server dependencies by running the following command:

   ```
   npm install
   ```

4. Once the dependencies are installed, start the Node server by running the following command:

   ```
   node server
   ```

   The server will start running and display a message indicating the server's URL (e.g., `Server ready at http://localhost:4000`).

### React App Setup

1. Open a new terminal or command prompt window (while keeping the server running in the previous window).
2. Navigate to the project's root directory if you're not already there.
3. Navigate to the client directory by running the following command:

   ```
   cd client
   ```

4. Install the required client dependencies by running the following command:

   ```
   npm install
   ```

5. Once the dependencies are installed, start the React app by running the following command:

   ```
   npm start
   ```

   The React app will start running and automatically open in your default web browser. If it doesn't open automatically, you can access it by navigating to `http://localhost:3000` in your browser.

### Usage

1. After the React app has loaded in your browser, you will be presented with the homepage.
2. The homepage displays the currently available list of demo products and displays their respective information such as name, sku, price etc.
3. By clicking on "Add to Cart" button the site adds 1 quantity of the selected product to the cart and by clicking on any of the product list boxes it redirects you to the product detail page.
4. The product detail page displays information about a specific product, including its name, SKU, price (including VAT), and tier pricing discounts.
5. Use the input field provided to enter the quantity of the product you wish to purchase.
6. Click the "Add to Cart" button to add the product to your shopping cart. The item will be added, and the cart total will be updated accordingly.
7. To view your shopping cart, click on the "Cart" link in the navigation menu. The cart page will display a list of all items in your cart along with their details.
8. You can remove items from the cart as needed.
9. Clicking on "Buy Now" button it redirects you to a demo "order complete" page and also clears your cart inventory.

### Additional Details

- The server is built using Node.js, Apollo Server, and GraphQL. It provides the necessary APIs to fetch product and cart data, update the cart, and retrieve cart information.
- The React app is built using the latest stable version of ReactJS and utilizes Apollo Client to interact with the GraphQL server.
- The app's UI is styled using Bootstrap along side with a singular edge case where custom css was used.
- The product detail page fetches product data from the GraphQL server and displays it along with the tier pricing system discounts.
- The shopping cart component fetches cart data using the cartid stored in the user's session and displays a list of all items in the cart.

Please note that this project is intended for demonstration purposes and may not include production-level optimizations or error handling.
