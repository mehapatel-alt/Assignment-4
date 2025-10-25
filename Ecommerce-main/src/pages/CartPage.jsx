import React from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // ✅ for Continue Shopping navigation

function CartPage({
  cart,
  removeFromCart,
  addToSaveForLater,
  saveForLater,
  addToCart,
  removeFromSaveForLater, // ✅ new handler
}) {
  const navigate = useNavigate(); // ✅ for navigation

  // Subtotal & fees
  const subtotal = cart.reduce((acc, p) => acc + p.price, 0);
  const deliveryFee = cart.length > 0 ? 40 : 0;
  const convenienceFee = cart.length > 0 ? 20 : 0;
  const total = subtotal + deliveryFee + convenienceFee;

  return (
    <div className="cart-page-container">
      <Container>
        {/* Header with gradient */}
        <div
          className="text-center text-white py-4 mb-5"
          style={{
            background: "linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)",


            borderRadius: "12px",
          }}
        >
          <h2 className="fw-bold text-uppercase mb-0">🛒 Your Shopping Cart</h2>
          <p className="mb-0">Everything you love, in one place — ready when you are 🛍️</p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center">
            <img
              src="https://via.placeholder.com/300x200?text=Empty+Cart"
              alt="Empty Cart"
              className="mb-3"
            />
            <p className="text-muted fs-5">
              Your cart is empty😒🫶🏻 — start shopping now!
            </p>
            <Button
              variant="dark"
              size="lg"
              onClick={() => navigate("/")} // ✅ Navigate to CustomerDashboard
            >
              🛍 Continue Shopping
            </Button>
          </div>
        ) : (
          <Row>
            {/* Cart Items */}
            <Col md={8}>
              {cart.map((p) => (
                <Card
                  key={p.id}
                  className="mb-3 shadow-sm border-0 rounded-4 cart-item-card"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <Row className="g-0">
                    <Col md={4}>
                      <Card.Img
                        src={p.img}
                        style={{
                          height: "200px",
                          objectFit: "cover",
                          borderTopLeftRadius: "12px",
                          borderBottomLeftRadius: "12px",
                        }}
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title className="fw-bold fs-5">{p.name}</Card.Title>
                        <Card.Text className="text-danger fw-bold fs-5">
                          ₹{p.price}
                        </Card.Text>
                        <div className="d-flex gap-2 mt-3">
                          <Button
                            variant="outline-danger"
                            className="flex-fill"
                            onClick={() => removeFromCart(p.id)}
                          >
                            ❌ Remove
                          </Button>
                          <Button
                            variant="outline-secondary"
                            className="flex-fill"
                            onClick={() => addToSaveForLater(p)}
                          >
                            💾 Save for Later
                          </Button>
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Col>

            {/* Bill Summary */}
            <Col md={4}>
              <Card
                className="shadow-sm border-0 rounded-4 sticky-top"
                style={{ top: "90px", backgroundColor: "#ffffff" }}
              >
                <Card.Body>
                  <h5 className="fw-bold text-center mb-3">💳 Price Details</h5>
                  <ListGroup variant="flush" className="mb-3 fs-6">
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Subtotal</span> <span>₹{subtotal}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Delivery Fee</span> <span>₹{deliveryFee}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Convenience Fee</span> <span>₹{convenienceFee}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between fw-bold fs-5">
                      <span>Total</span> <span>₹{total}</span>
                    </ListGroup.Item>
                  </ListGroup>
                  <Button
                    onClick={() => navigate("/checkout")} // ✅ Navigate to CheckOutPage
                    className="w-100 rounded-pill fw-bold btn btn-success"
                    size="lg"
                  >
                    ✅ Proceed to Checkout
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Save for Later */}
        {saveForLater.length > 0 && (
          <div
            className="mt-5 p-4 rounded-4"
            style={{ backgroundColor: "#fff3f7" }}
          >
            <h3 className="fw-bold mb-4 text-center text-dark">
              💾 Saved for Later
            </h3>
            <Row>
              {saveForLater.map((p) => (
                <Col md={3} sm={6} key={p.id} className="mb-4">
                  <Card className="shadow-sm border-0 h-100 rounded-4 save-later-card">
                    <Card.Img
                      src={p.img}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                      }}
                    />
                    <Card.Body className="text-center d-flex flex-column">
                      <Card.Title className="fw-semibold">{p.name}</Card.Title>
                      <Card.Text className="text-danger fw-bold fs-5">
                        ₹{p.price}
                      </Card.Text>
                      <Button
                        variant="dark"
                        className="mt-auto w-100 rounded-pill"
                        onClick={() => {
                          addToCart(p); // ✅ move to cart
                          removeFromSaveForLater(p.id); // ✅ remove from save later
                        }}
                      >
                        🛒 Move to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* Hover & Background Animation - scoped to cart page only */}
        <style>
          {`
            /* Background Animation */
            .cart-page-container {
              min-height: 100vh;
              padding-top: 40px;
              padding-bottom: 40px;
              background: linear-gradient(270deg, #ffe6f0, #e6f7ff, #e8ffe6, #fff3e6);
              background-size: 800% 800%;
              animation: pastelMove 15s ease infinite;
            }

            @keyframes pastelMove {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }

            /* Hover effects */
            .cart-page-container .cart-item-card,
            .cart-page-container .save-later-card {
              transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            }
            .cart-page-container .cart-item-card:hover,
            .cart-page-container .save-later-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 8px 20px rgba(0,0,0,0.15);
            }
          `}
        </style>
      </Container>
    </div>
  );
}

export default CartPage;
