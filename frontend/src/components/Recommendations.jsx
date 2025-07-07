import React from "react";

function Recommendations({ restaurants, onOrderNow }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{
        marginBottom: 20,
        fontWeight: 700,
        fontSize: 22,
        letterSpacing: 0.5
      }}>
        Recommended for you
      </h2>
      <div
        style={{
          display: "flex",
          gap: 24,
          overflowX: "auto",
          paddingBottom: 10,
          scrollbarWidth: "thin",
          msOverflowStyle: "auto"
        }}
      >
        {restaurants.map((rest) => (
          <div
            key={rest.id}
            style={{
              minWidth: 260,
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              overflow: "hidden",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              border: "1.5px solid #F0F0F0"
            }}
          >
            <div style={{
              fontSize: 48,
              textAlign: "center",
              padding: 20,
              background: "#f5f5f5"
            }}>
              {rest.image}
            </div>
            <div style={{ padding: 16, flex: 1 }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8
              }}>
                <span style={{ fontWeight: 600, fontSize: 17 }}>{rest.name}</span>
                <span style={{
                  background: "#72A613",
                  color: "#fff",
                  padding: "4px 10px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500
                }}>{rest.rating}</span>
              </div>
              <div style={{
                color: "#CB202D",
                fontWeight: 600,
                fontSize: 15,
                marginBottom: 6
              }}>
                ₹{rest.price}
              </div>
              <div style={{
                color: "#626C71",
                fontSize: 14,
                marginBottom: 6
              }}>
                {rest.cuisine.join(", ")}
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                color: "#626C71",
                marginBottom: 10
              }}>
                <span>{rest.deliveryTime}</span>
                <span>{rest.distance}</span>
              </div>
              <div style={{
                display: "flex",
                gap: 8,
                marginBottom: 10
              }}>
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
                  padding: "10px 0",
                  fontSize: 15,
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

export default Recommendations;
