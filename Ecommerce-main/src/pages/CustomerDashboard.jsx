import React from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";

function CustomerDashboard({ addToCart, addToWishlist }) {
  const products = [
      { id: 1, name: "Fit and Flare Dress", price: 500, img: "https://imgs.search.brave.com/tQcMGAJMK46u8UASCzpDvY4_wAO3kDJAiG0XWvuuBAA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bGliYXMuaW4vY2Ru/L3Nob3AvZmlsZXMv/Mjk0MzRPXzdNYWlu/LmpwZz92PTE3NTU5/NDc5MDUmd2lkdGg9/MTA4MA"},
      { id: 2, name: "Women high Heels", price: 1000, img: "https://imgs.search.brave.com/gnaK0-2tT_A_Uq6_vmChTci9LtqiY_t36TLHcK5cbRs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDk4OTU3My9waG90/by93b21hbi13ZWFy/aW5nLXllbGxvdy1o/ZWVscy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9TnNDQk1S/ekNUVXZZandCMEx6/Sm52SkdWM0lzTGpq/cHBwQjUzWE5JTlcw/az0"},
      { id: 3, name: "Textured Handheld Handbag", price: 1500, img: "https://imgs.search.brave.com/qpyiSDcjkRZsOpAZoJ1U2XL4pgqbr_dOW07F1mCEhFM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzA3LzE2LzE3/LzM2MF9GXzEwMDcx/NjE3MjNfVVF2SWxX/ZmxhQ3N2cHlzamdn/aE1GMUdpcndoTEtV/VDcuanBn"},
      { id: 4, name: "Gold Plated Finger Ring", price: 2000, img: "https://imgs.search.brave.com/X66hus_qTALz_f7V1xm5LyjQFaNq3t9LFxa0ADpoECo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9jYWxlY2xlY3Rp/Yy5jb20vY2RuL3No/b3AvZmlsZXMvQmly/dGhzdG9uZV9KZXdl/bHJ5XzEuanBnP3Y9/MTczOTU3MDgxOSZ3/aWR0aD0xNTAw"},
      { id: 5, name: "Colorful Indian Bangles", price: 2000, img: "https://imgs.search.brave.com/8Fv7koIQGiuBljrpY1de6jR6vNLmg9OyzNtCAeryJ0g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE2LzMwLzU5LzY5/LzM2MF9GXzE2MzA1/OTY5MTlfN0ZpRlBx/bVJnNGtmaVdGU0hS/MXA1bERtSTdiN3l3/S0wuanBn"},
      { id: 6, name: "Women Analogue Watch", price: 2000, img: "https://imgs.search.brave.com/PfLmR6-x4iAbsXu4GCXfHYyiM51j6j6nFEebTeGaFMc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YnJlaXRsaW5nLmNv/bS9hcGkvaW1hZ2Ut/cHJveHkvaW1hZ2Vz/LmN0ZmFzc2V0cy5u/ZXQvMTF5dTVqNWIx/NGt4LzZ1M1hNcmE4/N2F2dllmWHp1NGVX/a2IvNWQ1NzVmNzY4/ZWM3OWMyM2ZmNDE4/NzUxYTQ1MzA2MTAv/SFAtbG9jYWwtQVUu/anBnP2ltPVJlZ2lv/bk9mSW50ZXJlc3RD/cm9wLHdpZHRoPTM0/OTUsaGVpZ2h0PTI3/NDUscmVnaW9uT2ZJ/bnRlcmVzdD0oNTgy/LjUsNDU3LjUpJmZv/cm1hdD1hdXRv"},
      { id: 7, name: "New LessBerry Cargo Jeans", price: 1200, img: "https://imgs.search.brave.com/OdsVHtgWCwOoZgY1nz629ODZJTXLEn7u53psXB1xKRk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuYmxvb21pbmdk/YWxlc2Fzc2V0cy5j/b20vaXMvaW1hZ2Uv/QkxNL3Byb2R1Y3Rz/LzYvb3B0aW1pemVk/LzEzNzE2NzU2X2Zw/eC50aWY_JDIwMTRf/QlJPV1NFX0ZBU0hJ/T04kJnFsdD04MCww/JnJlc01vZGU9c2hh/cnAyJm9wX3VzbT0x/Ljc1LDAuMywyLDAm/Zm10PWpwZWcmd2lk/PTM0MiZoZWk9NDI4" },
      { id: 7, name: "Women Sneakers", price: 1200, img:"https://imgs.search.brave.com/wcPz5cy2VV4dtaVXl_L5ybV9s8GELTc0gPsqn0PgS6I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9r/aGFraS1jYW52YXMt/c25lYWtlcnMtd29t/ZW4tcy1zaG9lcy1h/cHBhcmVsLXNob290/XzUzODc2LTEwNTUz/OS5qcGc_c2VtdD1h/aXNfaHlicmlkJnc9/NzQw" },
  ];
  // ✅ define categories here
  const categories = [
    { name: "Clothing", img: "https://imgs.search.brave.com/75voEL5YbyGPV-X5OYz_idNXQ5mbjyu_1gspMj03P60/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50aGVldmVyeWdp/cmwuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDI1LzA5L3Ro/ZS1ldmVyeWdpcmwt/ZmVhdHVyZS1tYWRl/d2VsbC1mYWxsLWNv/bGxlY3Rpb24tNDc0/eDMxNi5qcGc" },
    { name: "FootWear", img: "https://imgs.search.brave.com/Ch0ceXwfUc_mXuaTGG58JtWznUfIfqY4YczwZY9UvhA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI3/OTEwODE5Ny9waG90/by92YXJpZXR5LW9m/LXdvbWVucy1mYXNo/aW9uLWNvbWZvcnRh/YmxlLXNob2VzLW9m/LWFsbC1zZWFzb25z/LW9uLWEtbGlnaHQt/YmFja2dyb3VuZC10/b3Atdmlldy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9X21k/VU1vMnRzdWZnaWxx/djhJUWVXNmhwOFlq/SUNUUjhfdEYtWVAx/Wmd4az0" },
    { name: "Accessories", img: "https://imgs.search.brave.com/4EfQ3f7_G1FTn8YZK9PunD5QhJcuriQkElDmNiOgoAM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzEwLzI0LzMz/LzM2MF9GXzExMDI0/MzMzNF9VSGJXRDZk/dDNldlVjZ3I1SmYz/YU9XeE1CdVUzUTA4/ay5qcGc" },
    { name: "Beauty", img: "https://imgs.search.brave.com/WzH-uHCVs1ZtOy--ovaogmu7dKxQsJ-O_ED-a4iLbn0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9iZWF1dHktZmFj/ZS1ibGFjay13b21h/bi13aXRoLWZsb3dl/ci1hcnQtY3JlYXRp/dmUtcG9ydHJhaXQt/bmF0dXJhbC1jb3Nt/ZXRpY3MtYWR2ZXJ0/aXNpbmctYWdhaW5z/dC1zdHVkaW8tYmFj/a2dyb3VuZC1za2lu/Y2FyZS1jb3NtZXRp/Yy10cmVhdG1lbnQt/bmF0dXJlLWFlc3Ro/ZXRpYy1jbGVhbi1v/cmdhbmljLW1ha2V1/cF81OTA0NjQtMTEy/MzUwLmpwZz9zZW10/PWFpc19pbmNvbWlu/ZyZ3PTc0MCZxPTgw" },
    { name: "New Arrivals", img: "https://imgs.search.brave.com/VJ_-g_sCs66vYwFF7VW4wz78SbyleISv_xwOy2bdRbE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODUz/Mjc0NjQwL3ZlY3Rv/ci9uZXctYXJyaXZh/bHMuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPW00NHp2bHBZ/eFl6Q1pCRU9jR1Ra/NVplN0cwSG1HS2Ns/LUhWUVlpcEZIa3c9" },
  ];

  return (
    <div className="customer-dashboard-page">
      <Container className="py-5 text-center">
        <h2 className="fw-bold">Welcome back to Lady Luxe💃</h2>
        <p className="text-muted">Discover the latest styles & trends</p>
      </Container>
      {/* Carousel */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://imgs.search.brave.com/AbrrW407qogyH6RxS-xq9E3uWC3VMEV3ivKlyAF2LAo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jbXNp/bWFnZXMuc2hvcHBl/cnNzdG9wLmNvbS9T/dGF0aWNfd2ViX1dv/bWVuX1dlc3Rlcm5f/V2Vhcl8yMWM1ZTFj/YmRlL1N0YXRpY193/ZWJfV29tZW5fV2Vz/dGVybl9XZWFyXzIx/YzVlMWNiZGUucG5n"
            alt="Slide 1"
            style={{ height: "400px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://imgs.search.brave.com/9oaNWKZkV_jyeeB12zVdMBPs7HZWPg90XmwuSQbfjzo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGczc1/YzlZTFEvMi8wLzE2/MDB3L2NhbnZhLXdo/aXRlLW1vZGVybi1z/a2luY2FyZS1wcm9k/dWN0cy1wcmVzZW50/YXRpb24tS3ZnOExI/Skp3T1EuanBn"
            alt="Slide 2"
            style={{ height: "400px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://imgs.search.brave.com/VuIUw6Ed4up4r7yJ91kKFIJ0p65XxDDlynmlp3yg-bE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jbXNp/bWFnZXMuc2hvcHBl/cnNzdG9wLmNvbS9T/dGF0aWNfd2ViX1dv/bWVuX2E3NGZhNDI1/MTkvU3RhdGljX3dl/Yl9Xb21lbl9hNzRm/YTQyNTE5LnBuZw"
            alt="Slide 3"
            style={{ height: "400px", objectFit: "cover" }}
          />
        </Carousel.Item>

      </Carousel>
      

      {/* Categories */}
<Container className="my-5">
  <h3 className="mb-4 text-center fw-bold">🛍 Shop by Category</h3>
  <Row className="justify-content-center">
    {categories.map((cat, idx) => (
      <Col key={idx} md={2} sm={6} xs={12} className="mb-4 d-flex justify-content-center">
        <Card
          className="shadow-sm border-0 text-center category-card"
          style={{ width: "180px", borderRadius: "12px", backgroundColor: "#fff" }}
        >
          <Card.Img
            src={cat.img}
            style={{ height: "160px", objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
          />
          <Card.Body>
            <Card.Title className="fw-semibold">{cat.name}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>

  {/* Hover effect */}
  <style>
    {`
      .category-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .category-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 6px 18px rgba(0,0,0,0.15);
      }
    `}
  </style>
</Container>


    

      {/* Featured Products */}
      <Container className="my-5">
        <h3 className="mb-4 text-center fw-bold">✨ Products</h3>
        <Row>
          {products.map((p) => (
            <Col key={p.id} md={3} sm={6} className="mb-4">
              <Card className="shadow-sm border-0 h-100 rounded-4 product-card">
                <Card.Img
                  src={p.img}
                  style={{
                    height: "280px",
                    objectFit: "cover",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-semibold">{p.name}</Card.Title>
                  <Card.Text className="text-danger fw-bold fs-5">
                    ₹{p.price}
                  </Card.Text>

                  <div className="mt-auto">
                    <Button
                      variant="dark"
                      className="w-100 mb-2"
                      onClick={() => addToCart(p)}
                    >
                      🛒 Add to Cart
                    </Button>

                    <Button
                      variant="outline-danger"
                      className="w-100"
                      onClick={() => addToWishlist(p)}
                    >
                      ❤️ Wishlist
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        </Container>

      {/* Background animation styles - scoped to customer dashboard only */}
      <style>
        {`
          .customer-dashboard-page {
            min-height: 100vh;
            background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #a1c4fd, #c2e9fb);
            background-size: 400% 400%;
            animation: gradientBG 15s ease infinite;
          }

          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .customer-dashboard-page .category-card,
          .customer-dashboard-page .product-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .customer-dashboard-page .category-card:hover,
          .customer-dashboard-page .product-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          }
        `}
      </style>
    </div>
  );
}

export default CustomerDashboard;   
