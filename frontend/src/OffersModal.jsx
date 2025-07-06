// src/OffersModal.jsx
import React from "react";

function OffersModal({ open, onClose, offers }) {
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
        maxWidth: 600,
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
          <span style={{ fontWeight: 600, fontSize: 18 }}>🎉 Today's Offers</span>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ padding: 20 }}>
          {offers.map((offer) => (
            <div key={offer.id} style={{
              background: `linear-gradient(135deg, ${offer.color}, #FF9F09)`,
              color: "#fff",
              padding: 20,
              borderRadius: 12,
              marginBottom: 16,
              position: "relative"
            }}>
              <div style={{ fontSize: 20, fontWeight: 600 }}>{offer.title}</div>
              <div style={{ marginBottom: 8 }}>{offer.description}</div>
              <div style={{ fontWeight: 500, background: "rgba(255,255,255,0.2)", padding: "8px 12px", borderRadius: 8, display: "inline-block" }}>
                Code: {offer.code}
              </div>
              <div style={{ fontSize: 12, marginTop: 8, opacity: 0.8 }}>Valid until: {offer.validUntil}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OffersModal;
