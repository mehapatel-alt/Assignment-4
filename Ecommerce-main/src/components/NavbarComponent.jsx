import React from "react";
import { Navbar, Container, Nav, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaSearch, FaUser } from "react-icons/fa";

function NavbarComponent({ cartCount, wishlistCount }) {
  const location = useLocation();
  const isCustomerLoggedIn = localStorage.getItem('isCustomerLoggedIn') === 'true';
  const isVendorLoggedIn = localStorage.getItem('isVendorLoggedIn') === 'true';

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/">Lady Luxe💃👜</Navbar.Brand>

        {/* Search bar - only show for customer pages */}
        {location.pathname.includes('customer') && (
          <Form className="d-flex mx-auto w-50">
            <FormControl type="search" placeholder="Search for fashion..." className="me-2" />
            <Button variant="outline-light">
              <FaSearch />
            </Button>
          </Form>
        )}

        {/* Navigation Links */}
        <Nav>
          {/* Customer Navigation */}
          {isCustomerLoggedIn && (
            <>
              <Nav.Link as={Link} to="/customer-dashboard">Home</Nav.Link>
              <Nav.Link as={Link} to="/wishlist">
                <FaHeart /> ({wishlistCount})
              </Nav.Link>
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart /> ({cartCount})
              </Nav.Link>
            </>
          )}

          {/* Vendor Navigation */}
          {isVendorLoggedIn && (
            <>
              <Nav.Link as={Link} to="/vendor-home">Vendor Home</Nav.Link>
              <Nav.Link as={Link} to="/vendor-dashboard">Dashboard</Nav.Link>
            </>
          )}

          {/* Login/Register - only show if not logged in */}
          {!isCustomerLoggedIn && !isVendorLoggedIn && (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          )}

          {/* User Menu */}
          {(isCustomerLoggedIn || isVendorLoggedIn) && (
            <Dropdown>
              <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                <FaUser />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/login" onClick={() => {
                  localStorage.removeItem('isCustomerLoggedIn');
                  localStorage.removeItem('isVendorLoggedIn');
                  localStorage.removeItem('customerData');
                  localStorage.removeItem('vendorData');
                }}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;