import React from "react";

function AIFeatures({ features, onOffersClick }) {
  return (
    <section style={{
      maxWidth: 1200,
      margin: "0 auto 36px auto",
      padding: "0 16px"
    }}>
      <h2 style={{
        marginBottom: 24,
        fontWeight: 700,
        fontSize: 24,
        letterSpacing: 0.5,
        color: "#222"
      }}>
        AI-Powered Features
      </h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 28,
        alignItems: "stretch"
      }}>
        {features.map((feature) => (
          <div
            key={feature.id}
            style={{
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
              padding: "36px 24px 28px 24px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.18s, box-shadow 0.18s",
              border: "1.5px solid #F0F0F0",
              minHeight: 220,
              cursor: "pointer"
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(203,32,45,0.10)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)";
            }}
          >
            <div style={{
              fontSize: 44,
              marginBottom: 14,
              background: "linear-gradient(135deg, #CB202D 60%, #FF9F09 100%)",
              color: "#fff",
              borderRadius: "50%",
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(203,32,45,0.10)"
            }}>
              {feature.icon}
            </div>
            <div style={{
              fontWeight: 700,
              fontSize: 18,
              marginBottom: 8,
              color: "#222"
            }}>
              {feature.title}
            </div>
            <div style={{
              color: "#666",
              fontSize: 15,
              marginBottom: 18,
              minHeight: 38
            }}>
              {feature.description}
            </div>
            <button
              style={{
                background: feature.title === "Today's Offers" ? "#FF9F09" : "#CB202D",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 0",
                fontWeight: 600,
                fontSize: 15,
                width: "100%",
                boxShadow: "0 1px 4px rgba(203,32,45,0.08)",
                letterSpacing: 0.2,
                cursor: "pointer",
                transition: "background 0.18s"
              }}
              onClick={feature.title === "Today's Offers" ? onOffersClick : undefined}
            >
              {feature.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AIFeatures;
