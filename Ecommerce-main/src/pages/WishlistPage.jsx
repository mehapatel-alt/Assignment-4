import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function WishlistPage({ wishlist, removeFromWishlist }) {
  const navigate = useNavigate();

  return (
    <div className="wishlist-page">
      <Container>
        {/* Gradient Header */}
        <div
          className="text-center text-white py-4 mb-5"
          style={{
            background: "linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)",



            borderRadius: "12px",
          }}
        >
          <h2 className="fw-bold text-uppercase mb-0">
            ❤️ Your Wishlist
          </h2>
          <p className="mb-0">Save your favourite items and shop them later ✨</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center">
            <img
              src="https://via.placeholder.com/300x200?text=Empty+Wishlist"
              alt="Empty Wishlist"
              className="mb-3"
            />
            <p className="text-muted fs-5">
                          Your Whishlist is empty💔 — start shopping now!
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
            {wishlist.map((p) => (
              <Col key={p.id} md={3} sm={6} className="mb-4">
                <Card className="shadow-sm h-100 rounded-4 wishlist-card">
                  <Card.Img
                    src={p.img}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />
                  <Card.Body className="d-flex flex-column text-center">
                    <Card.Title className="fw-semibold">{p.name}</Card.Title>
                    <Card.Text className="fw-bold text-danger fs-5">
                      ₹{p.price}
                    </Card.Text>
                    <Button
                      variant="outline-danger"
                      className="mt-auto rounded-pill"
                      onClick={() => removeFromWishlist(p.id)}
                    >
                      ❌ Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* CSS for animations */}
        <style>
          {`
            /* Full page animated gradient */
            .wishlist-page {
              min-height: 100vh;
              padding: 40px 0;
              background: linear-gradient(270deg, #ffe6f0, #e6f7ff, #e8ffe6, #fff3e6);
              background-size: 400% 400%;
              animation: gradientBG 15s ease infinite;
              position: relative;
              overflow: hidden;
            }

            @keyframes gradientBG {
              0% {background-position: 0% 50%;}
              50% {background-position: 100% 50%;}
              100% {background-position: 0% 50%;}
            }

            /* Floating shapes */
            .wishlist-page::before,
            .wishlist-page::after {
              content: '';
              position: absolute;
              width: 300px;
              height: 300px;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 50%;
              filter: blur(100px);
              animation: float 12s infinite ease-in-out alternate;
            }
            .wishlist-page::before {
              top: -100px;
              left: -100px;
            }
            .wishlist-page::after {
              bottom: -100px;
              right: -100px;
              animation-delay: 6s;
            }
            @keyframes float {
              0% {transform: translate(0, 0) rotate(0deg);}
              50% {transform: translate(50px, -30px) rotate(45deg);}
              100% {transform: translate(0, 0) rotate(0deg);}
            }

            /* Wishlist card hover */
            .wishlist-card {
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .wishlist-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 12px 25px rgba(0,0,0,0.2);
            }
          `}
        </style>
      </Container>
    </div>
  );
}

export default WishlistPage;