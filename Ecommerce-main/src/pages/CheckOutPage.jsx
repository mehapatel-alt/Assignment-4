import React, { useState } from "react";

const CheckoutPage = ({ cart = [], clearCart }) => {
  const subtotal = cart.reduce((s, p) => s + (p.price || 0), 0);
  const deliveryFee = subtotal > 999 ? 0 : 49;
  const convenienceFee = Math.round(subtotal * 0.02);
  const total = subtotal + deliveryFee + convenienceFee;

  const [address, setAddress] = useState({
    fullName: "",
    addressLine: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod | card | upi
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(null);

  function handleAddressChange(e) {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  function handleCardChange(e) {
    setCard({ ...card, [e.target.name]: e.target.value });
  }

  function validate() {
    if (!address.fullName || !address.addressLine || !address.city || !address.postalCode) {
      alert("Please complete the shipping address fields.");
      return false;
    }
    if (paymentMethod === "card") {
      if (!card.number || !card.name) {
        alert("Please enter card number & cardholder name.");
        return false;
      }
    }
    if (paymentMethod === "upi" && !upiId) {
      alert("Please enter your UPI ID (e.g. yourid@bank).");
      return false;
    }
    return true;
  }

  function placeOrder(e) {
    e.preventDefault();
    if (!validate()) return;

    setPlacing(true);

    // Mock request
    setTimeout(() => {
      setPlacing(false);
      setSuccess({
        id: Math.floor(Math.random() * 900000) + 100000,
        total,
        when: new Date().toLocaleString(),
      });
      if (typeof clearCart === "function") clearCart();
    }, 1000);
  }

  return (
    <div className="checkout-root">
      <style>{`
        .checkout-root {
          padding: 28px 18px;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          color: #222;
        }
        .checkout-wrap {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media(min-width: 900px) {
          .checkout-wrap {
            grid-template-columns: 1fr 380px;
            align-items: start;
          }
        }
        .card-panel {
          background: #fff;
          border-radius: 12px;
          padding: 18px;
          box-shadow: 0 6px 20px rgba(20,20,30,0.06);
          border: 1px solid rgba(0,0,0,0.03);
        }
        h2.page-title {
          margin: 0 0 12px;
          font-size: 26px;
          letter-spacing: -0.2px;
        }
        .section-title {
          margin: 0 0 10px;
          font-weight: 600;
          color: #333;
        }
        .form-row {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
        }
        .form-row .field {
          flex: 1;
        }
        .field input {
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #d7d7df;
          outline: none;
          font-size: 14px;
          transition: box-shadow .15s ease;
        }
        .field input:focus { box-shadow: 0 6px 18px rgba(22,120,255,0.05); border-color: #b9d4ff; }
        .radio-row { display:flex; gap:12px; align-items:center; margin:10px 0 14px; }
        .payment-block { margin-top:8px; }
        .small-muted { color: #666; font-size: 13px; margin-top:6px; }
        .place-btn {
          display:inline-flex;
          align-items:center;
          justify-content:center;
          padding: 12px 18px;
          border-radius: 999px;
          background: linear-gradient(90deg,#2fa360,#1f8b4a);
          color: white;
          font-weight: 700;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(20,120,60,0.12);
        }
        .place-btn[disabled] { opacity: .6; cursor: not-allowed; }
        .order-summary { font-size: 15px; }
        .summary-row { display:flex; justify-content:space-between; padding:10px 0; border-bottom: 1px dashed #eee; }
        .summary-row.total { font-weight:700; font-size: 17px; border: none; }
        .success-box {
          margin-top: 18px;
          padding: 14px;
          border-radius: 10px;
          background: linear-gradient(180deg,#f0fff4,#e6fff0);
          border: 1px solid #c8f0d0;
          color: #115c2b;
        }
        .upi-qr {
          margin-top:8px;
          display:flex;
          gap:12px;
          align-items:center;
        }
        .upi-qr .qr {
          width:86px; height:86px; border-radius:8px;
          background: linear-gradient(180deg,#fafafa,#f5f5fd);
          border: 1px solid #eee;
          display:flex; align-items:center; justify-content:center; font-size:12px; color:#888;
        }
        .hint { color:#6b6b7a; font-size:13px; }
      `}</style>

      <h2 className="page-title">Checkout</h2>

      <div className="checkout-wrap">
        {/* Left column - Shipping + Payment */}
        <div>
          <div className="card-panel">
            <div className="section-title">Shipping Address</div>

            <form onSubmit={placeOrder}>
              <div className="form-row">
                <div className="field">
                  <input
                    name="fullName"
                    placeholder="Full name"
                    value={address.fullName}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="field">
                  <input
                    name="phone"
                    placeholder="Phone (optional)"
                    value={address.phone}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>

              <div className="field" style={{ marginBottom: 10 }}>
                <input
                  name="addressLine"
                  placeholder="Address line (flat, building, street)"
                  value={address.addressLine}
                  onChange={handleAddressChange}
                />
              </div>

              <div className="form-row">
                <div className="field">
                  <input
                    name="city"
                    placeholder="City"
                    value={address.city}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="field">
                  <input
                    name="postalCode"
                    placeholder="Postal code"
                    value={address.postalCode}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>

              <div style={{ marginTop: 8 }}>
                <div className="section-title">Payment</div>

                <div className="radio-row">
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />{" "}
                    &nbsp;Cash on Delivery
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />{" "}
                    &nbsp;Card / Debit
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                    />{" "}
                    &nbsp;UPI
                  </label>
                </div>

                {/* Payment detail blocks */}
                {paymentMethod === "card" && (
                  <div className="payment-block">
                    <div className="form-row">
                      <div className="field">
                        <input
                          name="number"
                          placeholder="Card number"
                          value={card.number}
                          onChange={handleCardChange}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="field">
                        <input
                          name="name"
                          placeholder="Name on card"
                          value={card.name}
                          onChange={handleCardChange}
                        />
                      </div>
                      <div style={{ width: 120 }}>
                        <input
                          name="expiry"
                          placeholder="MM/YY"
                          value={card.expiry}
                          onChange={handleCardChange}
                        />
                      </div>
                      <div style={{ width: 100 }}>
                        <input
                          name="cvv"
                          placeholder="CVV"
                          value={card.cvv}
                          onChange={handleCardChange}
                        />
                      </div>
                    </div>
                    <div className="small-muted">This is a mock card input — no real payments.</div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="payment-block">
                    <div className="form-row">
                      <div className="field">
                        <input
                          name="upi"
                          placeholder="Your UPI ID (e.g. you@bank)"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="upi-qr">
                      <div className="qr">QR</div>
                      <div>
                        <div className="hint">Scan the QR from your UPI app or copy the ID above.</div>
                        <div className="small-muted">UPI is mocked for demo. No real money moves.</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ marginTop: 18 }}>
                <button
                  type="submit"
                  className="place-btn"
                  disabled={placing}
                >
                  {placing ? "Placing order..." : `Place Order • ₹${total}`}
                </button>
              </div>
            </form>
          </div>

          {success && (
            <div className="success-box">
              <strong>Order placed! 🎉</strong>
              <div>Order ID: <code>{success.id}</code></div>
              <div>Amount: ₹{success.total}</div>
              <div className="small-muted">Placed: {success.when}</div>
            </div>
          )}
        </div>

        {/* Right column - Order summary */}
        <div>
          <div className="card-panel order-summary">
            <div className="section-title">Order Summary</div>

            {cart.length === 0 ? (
              <div className="small-muted">Your cart is empty — add items to see the summary.</div>
            ) : (
              <>
                {cart.map((p) => (
                  <div key={p.id || p.title} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ maxWidth: 220 }}>
                      <div style={{ fontWeight: 600 }}>{p.title}</div>
                      <div className="small-muted">{p.category}</div>
                    </div>
                    <div>₹{p.price}</div>
                  </div>
                ))}

                <div style={{ height: 8 }} />

                <div className="summary-row">
                  <div>Subtotal</div>
                  <div>₹{subtotal}</div>
                </div>
                <div className="summary-row">
                  <div>Delivery</div>
                  <div>₹{deliveryFee}</div>
                </div>
                <div className="summary-row">
                  <div>Convenience</div>
                  <div>₹{convenienceFee}</div>
                </div>

                <div className="summary-row total">
                  <div>Total</div>
                  <div>₹{total}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
