import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import MiniCart from "./MiniCart";
import { CartContext } from "../contexts/CartContext";

const Header = () => {
  const {carts} = useContext(CartContext)

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap Demo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/404">404</Nav.Link>
            <div className="d-flex align-items-center">
              <Nav.Link href="/cart">Cart</Nav.Link>
              {carts.length >= 0 && <MiniCart cartItems={carts} />}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
