import React from "react";

const loginBtnStyle = {
  background: "#fff",
  color: "#CB202D",
  border: "1.5px solid #CB202D",
  borderRadius: 24,
  padding: "8px 20px",
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer",
  marginRight: 4,
  transition: "background 0.18s"
};
const signupBtnStyle = {
  background: "#CB202D",
  color: "#fff",
  border: "none",
  borderRadius: 24,
  padding: "8px 20px",
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer",
  marginRight: 12,
  transition: "background 0.18s"
};
const userInfoStyle = {
  background: "#F5F4F6",
  borderRadius: 20,
  padding: "6px 16px",
  fontSize: 15,
  color: "#CB202D",
  fontWeight: 500,
  marginRight: 12
};
const cartBtnStyle = {
  background: "#FF9F09",
  color: "#fff",
  border: "none",
  borderRadius: 24,
  padding: "8px 16px",
  fontWeight: 500,
  fontSize: 16,
  cursor: "pointer"
};

function Header({ onCartClick, onLoginClick, user }) {
  return (
    <header style={{
      background: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      padding: "16px 0"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 16px"
      }}>
        <div>
          <h1 style={{ color: "#CB202D", fontSize: "24px", fontWeight: 700, margin: 0, letterSpacing: 1 }}>BITERUSH</h1>
          <div style={{ fontSize: 12, color: "#CB202D" }}>Bite into happiness</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{
            background: "#F5F4F6",
            borderRadius: 20,
            padding: "6px 16px",
            fontSize: 14,
            color: "#CB202D",
            fontWeight: 500
          }}>
            Delivering to Mumbai
          </div>
          <input
            type="text"
            placeholder="Search for restaurants, food..."
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              border: "1px solid #eee",
              fontSize: 14,
              width: 220,
              marginRight: 8
            }}
          />
          {/* Chatbot button REMOVED */}
          {!user ? (
            <>
              <button onClick={onLoginClick} style={loginBtnStyle}>Login</button>
              <button onClick={onLoginClick} style={signupBtnStyle}>Sign Up</button>
            </>
          ) : (
            <span style={userInfoStyle}>👤 {user.name}</span>
          )}
          <button onClick={onCartClick} style={cartBtnStyle}>🛒</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
