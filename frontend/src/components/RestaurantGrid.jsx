import React from "react";

const filterBarStyle = {
  display: "flex",
  gap: 12,
  marginBottom: 24,
  flexWrap: "wrap",
  alignItems: "center"
};

const filterBtnStyle = {
  background: "#fff",
  border: "none",
  borderRadius: 20,
  padding: "8px 18px",
  fontWeight: 500,
  fontSize: 15,
  color: "#2D2D2D",
  boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
  cursor: "pointer",
  transition: "background 0.2s"
};

function RestaurantGrid({ restaurants, onOrderNow, onFilterClick }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ marginBottom: 12, fontSize: 24, fontWeight: 700, letterSpacing: 0.5 }}>Restaurants near you</h2>
      <div style={filterBarStyle}>
        <button style={filterBtnStyle}>🧠 Recommended</button>
        <button style={filterBtnStyle}>🔥 Most Loved</button>
        <button style={filterBtnStyle}>⭐ Rating</button>
        <button style={filterBtnStyle}>⏰ Delivery Time</button>
        <button style={filterBtnStyle}>📍 Distance</button>
        <button style={{ ...filterBtnStyle, background: "#CB202D", color: "#fff" }} onClick={onFilterClick}>
          ⚙️ Filters
        </button>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 28
      }}>
        {restaurants.map((rest) => (
          <div
            key={rest.id}
            style={{
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              overflow: "hidden",
              cursor: "pointer",
              transition: "box-shadow 0.2s",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1.5px solid #F0F0F0"
            }}
          >
            <div style={{ fontSize: 64, textAlign: "center", padding: 24, background: "#f5f5f5" }}>
              {rest.image}
            </div>
            <div style={{ padding: 20, flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 18 }}>{rest.name}</span>
                <span style={{
                  background: "#72A613",
                  color: "#fff",
                  padding: "4px 10px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500
                }}>{rest.rating}</span>
              </div>
              <div style={{ color: "#CB202D", fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                ₹{rest.price}
              </div>
              <div style={{ color: "#626C71", fontSize: 15, marginBottom: 8 }}>
                {rest.cuisine.join(", ")}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#626C71", marginBottom: 12 }}>
                <span>{rest.deliveryTime}</span>
                <span>{rest.distance}</span>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {rest.tags.map((tag, i) => (
                  <span key={i} style={{
                    padding: "4px 8px",
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#fff",
                    background: tag.color
                  }}>
                    {tag.icon} {tag.label}
                  </span>
                ))}
              </div>
              <button
                style={{
                  width: "100%",
                  background: "#CB202D",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "12px 0",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  marginTop: 8,
                  boxShadow: "0 1px 4px rgba(203,32,45,0.08)"
                }}
                onClick={() => onOrderNow(rest)}
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RestaurantGrid;
