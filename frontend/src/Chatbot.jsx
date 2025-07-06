// src/Chatbot.jsx
import React, { useState } from "react";

function Chatbot({ open, onClose, messages }) {
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState(messages);

  const handleSend = () => {
    if (input.trim() === "") return;
    setChatMessages([...chatMessages, { id: Date.now(), type: "user", message: input }]);
    setInput("");
    setTimeout(() => {
      setChatMessages((msgs) => [
        ...msgs,
        { id: Date.now() + 1, type: "bot", message: "I'm still learning! 🍔" }
      ]);
    }, 1000);
  };

  if (!open) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 80,
      right: 20,
      width: 320,
      height: 400,
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      display: "flex",
      flexDirection: "column",
      zIndex: 1000
    }}>
      <div style={{
        background: "#CB202D",
        color: "#fff",
        padding: 16,
        borderRadius: "12px 12px 0 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <span>🤖 Food Assistant</span>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer" }}>×</button>
      </div>
      <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            style={{
              alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
              background: msg.type === "user" ? "#CB202D" : "#f5f5f5",
              color: msg.type === "user" ? "#fff" : "#2D2D2D",
              padding: "8px 12px",
              borderRadius: 8,
              maxWidth: "80%"
            }}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", padding: 16, gap: 8, borderTop: "1px solid #eee" }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          style={{ flex: 1, padding: 8, border: "1px solid #eee", borderRadius: 8, fontSize: 14 }}
        />
        <button onClick={handleSend} style={{ background: "#CB202D", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 500, cursor: "pointer" }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
