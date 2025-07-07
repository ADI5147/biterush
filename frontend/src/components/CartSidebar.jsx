import React from "react";

function CartSidebar({ open, onClose, cart }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.10);
  let delivery = 0;
  if (subtotal < 500) delivery = 150;
  else if (subtotal < 1000) delivery = 90;
  else delivery = 30;
  const total = subtotal + gst + delivery;

  return !open ? null : (
    <div style={{
      position: "fixed",
      top: 0,
      right: 0,
      width: 420,
      height: "100vh",
      background: "#fff",
      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{
        padding: 24, borderBottom: "1px solid #eee", display: "flex", alignItems: "center"
      }}>
        <div style={{ fontWeight: 700, fontSize: 22 }}>Your Cart</div>
        <button onClick={onClose} style={{ marginLeft: "auto", background: "none", border: "none", fontSize: 28, cursor: "pointer" }}>×</button>
      </div>
      <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888" }}>Your cart is empty</div>
        ) : (
          cart.map((item, idx) => (
            <div key={idx} style={{
              display: "flex", alignItems: "center", marginBottom: 20, background: "#f9f9f9",
              borderRadius: 12, padding: 16
            }}>
              <div style={{ fontSize: 36, marginRight: 16 }}>{item.image}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{item.name}</div>
                <div style={{ color: "#CB202D", fontWeight: 500 }}>₹{item.price} × {item.quantity}</div>
              </div>
              <div style={{ fontWeight: 600, fontSize: 16 }}>₹{item.price * item.quantity}</div>
            </div>
          ))
        )}
        
      </div>
      <div style={{ padding: 24, borderTop: "1px solid #eee", background: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span>GST (10%)</span>
          <span>₹{gst}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span>Delivery</span>
          <span>₹{delivery}</span>
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 18, marginTop: 12
        }}>
          <span>Total</span>
          <span>₹{total}</span>
        </div>
        <button style={{
          width: "100%", background: "#CB202D", color: "#fff", border: "none",
          padding: 16, borderRadius: 8, fontSize: 18, fontWeight: 600, cursor: "pointer", marginTop: 20
        }}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartSidebar;
