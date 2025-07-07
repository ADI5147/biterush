import React, { useState } from "react";

const modalOverlayStyle = {
  position: "fixed",
  top: 0, left: 0, width: "100vw", height: "100vh",
  background: "rgba(0,0,0,0.25)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2000
};
const modalStyle = {
  background: "#fff",
  borderRadius: 16,
  boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
  padding: "32px 32px 24px 32px",
  minWidth: 340,
  position: "relative",
  textAlign: "center"
};
const googleBtnStyle = {
  background: "#fff",
  color: "#444",
  border: "1.5px solid #CB202D",
  borderRadius: 8,
  padding: "12px 0",
  fontWeight: 600,
  fontSize: 16,
  cursor: "pointer",
  width: "100%",
  marginBottom: 18
};
const inputStyle = {
  border: "1.5px solid #eee",
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 15,
  marginBottom: 4
};
const submitBtnStyle = {
  background: "#CB202D",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "12px 0",
  fontWeight: 600,
  fontSize: 16,
  width: "100%",
  marginTop: 8,
  cursor: "pointer"
};
const closeBtnStyle = {
  position: "absolute",
  top: 10,
  right: 16,
  background: "none",
  border: "none",
  fontSize: 26,
  cursor: "pointer"
};

function LoginModal({ open, onClose, onLogin }) {
  const [googleSignedIn, setGoogleSignedIn] = useState(false);
  const [form, setForm] = useState({ phone: "", gmail: "", name: "", address: "" });

  const handleGoogleSignIn = () => {
    setGoogleSignedIn(true);
    setForm({ ...form, gmail: "user@gmail.com" });
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (googleSignedIn && form.phone && form.name && form.address) {
      onLogin(form);
      onClose();
    }
  };

  if (!open) return null;
  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ marginBottom: 16, fontWeight: 700 }}>Sign In / Sign Up</h2>
        {!googleSignedIn ? (
          <button onClick={handleGoogleSignIn} style={googleBtnStyle}>
            <span style={{ marginRight: 8 }}>🔒</span> Continue with Google
          </button>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input name="gmail" value={form.gmail} disabled style={inputStyle} />
            <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} style={inputStyle} required />
            <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} style={inputStyle} required />
            <input name="address" placeholder="Address" value={form.address} onChange={handleChange} style={inputStyle} required />
            <button type="submit" style={submitBtnStyle}>Continue</button>
          </form>
        )}
        <button onClick={onClose} style={closeBtnStyle}>×</button>
      </div>
    </div>
  );
}

export default LoginModal;
