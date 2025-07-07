import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Login({ setUser }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      localStorage.setItem("authToken", data.key);
      setUser({ username: form.username });
      navigate(from, { replace: true });
    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  };

  // Placeholder handlers for social logins
  const handleSocial = (provider) => {
    alert(`Social login with ${provider} is not implemented yet.`);
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", background: "#fff", borderRadius: 16, boxShadow: "0 4px 32px rgba(0,0,0,0.18)", padding: 32 }}>
      <h2 style={{ marginBottom: 16, fontWeight: 700 }}>Login</h2>
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
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{ padding: 10, borderRadius: 8, border: "1.5px solid #eee" }} />
        <button type="submit" style={{ background: "#CB202D", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600, fontSize: 16, width: "100%", marginTop: 8, cursor: "pointer" }}>Login</button>
      </form>
      {error && <div style={{ color: "#CB202D", marginTop: 12 }}>{error}</div>}
      <div style={{ marginTop: 16 }}>
        Don't have an account? <a href="/signup" style={{ color: "#CB202D" }}>Sign up</a>
      </div>
    </div>
  );
}

export default Login;