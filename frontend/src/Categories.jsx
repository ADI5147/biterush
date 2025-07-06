import React from "react";
import { useNavigate } from "react-router-dom";

function Categories({ categories }) {
  const navigate = useNavigate();
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ marginBottom: 20, fontWeight: 700, fontSize: 22, letterSpacing: 0.5 }}>Categories</h2>
      <div style={{
        display: "flex",
        gap: 18,
        overflowX: "auto",
        paddingBottom: 10,
        scrollbarWidth: "thin"
      }}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/category/${cat.name.toLowerCase()}`)}
            style={{
              minWidth: 110,
              textAlign: "center",
              padding: "18px 0 10px 0",
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: 16,
              border: "1.5px solid #F0F0F0",
              transition: "box-shadow 0.15s, border 0.15s"
            }}
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && navigate(`/category/${cat.name.toLowerCase()}`)}
          >
            <div style={{ fontSize: 36, marginBottom: 8 }}>{cat.icon}</div>
            <div>{cat.name}</div>
          </div>
        ))}
      </div>
      <style>
        {`
          section div::-webkit-scrollbar {
            height: 8px;
            background: #f0f0f0;
            border-radius: 8px;
          }
          section div::-webkit-scrollbar-thumb {
            background: #e0e0e0;
            border-radius: 8px;
          }
        `}
      </style>
    </section>
  );
}

export default Categories;
