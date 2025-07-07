import React from "react";

function CategoryNav({ categories }) {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "center",
      gap: 32,
      margin: "36px 0 0 0",
      flexWrap: "wrap"
    }}>
      {categories.slice(0, 8).map((cat) => (
        <div key={cat.id} style={{ textAlign: "center", cursor: "pointer" }}>
          <div style={{ fontSize: 32 }}>{cat.icon}</div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>{cat.name}</div>
        </div>
      ))}
    </nav>
  );
}

export default CategoryNav;
