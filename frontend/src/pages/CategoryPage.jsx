import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categoryData } from "../data/categoryData";

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const items = categoryData[category] || [];

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "#CB202D",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "8px 20px",
          fontWeight: 600,
          fontSize: 15,
          marginBottom: 24,
          cursor: "pointer"
        }}
      >
        ← Back
      </button>
      <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 20, color: "#CB202D" }}>
        {category.charAt(0).toUpperCase() + category.slice(1)} Menu
      </h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: 12, fontSize: 16, color: "#888" }}>Name</th>
            <th style={{ textAlign: "left", padding: 12, fontSize: 16, color: "#888" }}>Brand</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={2} style={{ padding: 20, color: "#CB202D", textAlign: "center" }}>No items found for this category.</td>
            </tr>
          ) : (
            items.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #F0F0F0" }}>
                <td style={{ padding: 12, fontWeight: 600 }}>{item.name}</td>
                <td style={{ padding: 12 }}>{item.brand}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryPage;
