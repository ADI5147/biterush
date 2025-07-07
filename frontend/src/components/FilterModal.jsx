// src/FilterModal.jsx
import React from "react";

function FilterModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 12,
        maxWidth: 400,
        width: "90%",
        maxHeight: "80vh",
        overflowY: "auto"
      }}>
        <div style={{
          padding: 20,
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span style={{ fontWeight: 600, fontSize: 18 }}>Filter Restaurants</span>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ color: "#888", textAlign: "center" }}>Filter options coming soon!</div>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
