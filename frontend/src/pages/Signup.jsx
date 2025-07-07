import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Signup({ setUser }) {
  const [form, setForm] = useState({ username: "", email: "", password1: "", password2: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (form.password1 !== form.password2) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/api/auth/registration/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Signup failed");
      const data = await res.json();
      localStorage.setItem("authToken", data.key);
      setUser({ username: form.username });
      navigate(from, { replace: true });
    } catch (err) {
      setError("Signup failed. Try a different username/email.");
    }
  };

  // Placeholder handlers for social signups
  const handleSocial = (provider) => {
    alert(`Social signup with ${provider} is not implemented yet.`);
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", background: "#fff", borderRadius: 16, boxShadow: "0 4px 32px rgba(0,0,0,0.18)", padding: 32 }}>
      <h2 style={{ marginBottom: 16, fontWeight: 700 }}>Sign Up</h2>
      <button onClick={() => handleSocial("Google")} style={{ background: "#fff", color: "#444", border: "1.5px solid #CB202D", borderRadius: 8, padding: "12px 0", fontWeight: 600, fontSize: 16, width: "100%", marginBottom: 10 }}>
        <span style={{ marginRight: 8 }}>🔒</span> Continue with Google
      </button>
      <button onClick={() => handleSocial("TikTok")} style={{ background: "#fff", color: "#111", border: "1.5px solid #111", borderRadius: 8, padding: "12px 0", fontWeight: 600, fontSize: 16, width: "100%", marginBottom: 10 }}>
        <span style={{ marginRight: 8 }}>🎵</span> Continue with TikTok
      </button>
      <button onClick={() => handleSocial("Facebook")} style={{ background: "#1877f3", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600, fontSize: 16, width: "100%", marginBottom: 18 }}>
        <span style={{ marginRight: 8 }}>📘</span> Continue with Facebook
      </button>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required style={{ padding: 10, borderRadius: 8, border: "1.5px solid #eee" }} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ padding: 10, borderRadius: 8, border: "1.5px solid #eee" }} />
        <input name="password1" type="password" placeholder="Password" value={form.password1} onChange={handleChange} required style={{ padding: 10, borderRadius: 8, border: "1.5px solid #eee" }} />
        <input name="password2" type="password" placeholder="Confirm Password" value={form.password2} onChange={handleChange} required style={{ padding: 10, borderRadius: 8, border: "1.5px solid #eee" }} />
        <button type="submit" style={{ background: "#CB202D", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600, fontSize: 16, width: "100%", marginTop: 8, cursor: "pointer" }}>Sign Up</button>
      </form>
      {error && <div style={{ color: "#CB202D", marginTop: 12 }}>{error}</div>}
      <div style={{ marginTop: 16 }}>
        Already have an account? <a href="/login" style={{ color: "#CB202D" }}>Login</a>
      </div>
    </div>
  );
}

export default Signup;