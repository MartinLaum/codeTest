import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUpdateCart } from "../hooks/useUpdateCart";

  const ProductList = ({ products }) => {
    const updateCartHandler = useUpdateCart();

    function handleButtonClick(e, product){
      e.preventDefault();
      updateCartHandler(product,1);
    }

    if (!products || products.length === 0) {
      return <p>No products found.</p>;
    }

    return (
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 justify-content-center g-3">
          {products.map((product) => (
            <div key={product.sku} className="col">
              <Link
                to={`/product/${product.sku}`}
                style={{ textDecoration: "none" }}
              >
                <Card className="h-100 border p-3">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ objectFit: "contain", height: "200px" }}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      Price: ${product.priceWithVat.toFixed(2)} (w VAT)
                    </Card.Text>
                    <Button variant="primary" onClick={(e)=>handleButtonClick(e,product)}>
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default ProductList;
