// File: SmartMealPlanner.jsx

import React, { useState } from "react";

const demoPlan = [
  { day: "Monday", meals: ["Oatmeal & berries", "Grilled tofu salad", "Lentil soup"] },
  { day: "Tuesday", meals: ["Avocado toast", "Keto chicken bowl", "Salmon & greens"] },
  { day: "Wednesday", meals: ["Protein pancakes", "Vegan Buddha bowl", "Chickpea curry"] },
  { day: "Thursday", meals: ["Egg muffins", "Turkey lettuce wraps", "Zucchini noodles"] },
  { day: "Friday", meals: ["Smoothie bowl", "Quinoa salad", "Grilled shrimp"] },
  { day: "Saturday", meals: ["Yogurt parfait", "Cauliflower rice bowl", "Steak & broccoli"] },
  { day: "Sunday", meals: ["Fruit salad", "Stuffed peppers", "Chicken stir fry"] }
];

const dietOptions = [
  { label: "Vegan", value: "vegan" },
  { label: "Keto", value: "keto" },
  { label: "High Protein", value: "high_protein" },
  { label: "Low Carb", value: "low_carb" }
];

function SmartMealPlanner({ open, onClose, userId }) {
  const [chat, setChat] = useState([
    { type: "bot", text: "Hi! I can help you plan your meals for next week. Select your preferences and click 'Regenerate Plan'." }
  ]);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [mealPlan, setMealPlan] = useState(demoPlan);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setChat([...chat, { type: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setChat(c => [
        ...c,
        { type: "bot", text: "I'm generating a new meal plan for you..." }
      ]);
    }, 700);
  };

  const toggleDiet = (diet) => {
    setSelectedDiets(prev =>
      prev.includes(diet)
        ? prev.filter(d => d !== diet)
        : [...prev, diet]
    );
  };

  const handleRegenerate = async () => {
  setLoading(true);
  setChat(c => [
    ...c,
    { type: "user", text: "Regenerate plan with: " + selectedDiets.map(d => dietOptions.find(opt => opt.value === d).label).join(", ") }
  ]);
  try {
    // Change this to your backend endpoint
    const res = await fetch("http://localhost:8000/api/meal-planner/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, dietPreferences: selectedDiets })
    });
    if (!res.ok) throw new Error("Failed to fetch meal plan");
    const data = await res.json();
    setMealPlan(data.plan); // assuming API returns { plan: [...] }
    setChat(c => [...c, { type: "bot", text: "Here's your updated weekly meal plan!" }]);
  } catch {
    setChat(c => [...c, { type: "bot", text: "Sorry, something went wrong. Please try again." }]);
  }
  setLoading(false);
};

  if (!open) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 120,
      right: 32,
      width: 380,
      maxHeight: 600,
      background: "#fff",
      borderRadius: 18,
      boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
      zIndex: 1200,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      {/* Header */}
      <div style={{
        background: "#2D2D2D",
        color: "#fff",
        padding: "16px 20px",
        fontWeight: 700,
        fontSize: 18,
        letterSpacing: 0.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <span>Smart Meal Planner</span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 22,
            cursor: "pointer"
          }}
          aria-label="Close Smart Meal Planner"
        >
          ×
        </button>
      </div>
      {/* Chat Bubbles */}
      <div style={{
        flex: 1,
        padding: 18,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        background: "#FAFAFB"
      }}>
        {chat.map((msg, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
              background: msg.type === "user" ? "#CB202D" : "#f1f1f1",
              color: msg.type === "user" ? "#fff" : "#2D2D2D",
              padding: "9px 15px",
              borderRadius: 14,
              maxWidth: "80%",
              fontSize: 15,
              boxShadow: msg.type === "user" ? "0 2px 8px rgba(203,32,45,0.08)" : "0 1px 4px rgba(0,0,0,0.06)"
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      {/* Chat Input */}
      <div style={{ padding: "10px 18px", borderTop: "1px solid #eee", background: "#fff" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Type your meal planning request..."
          style={{
            width: "100%",
            border: "1.5px solid #eee",
            borderRadius: 8,
            padding: "10px 12px",
            fontSize: 15
          }}
        />
      </div>
      {/* Diet Filters */}
      <div style={{
        padding: "12px 18px",
        borderTop: "1px solid #eee",
        background: "#FAFAFB",
        display: "flex",
        gap: 10,
        flexWrap: "wrap"
      }}>
        {dietOptions.map(opt => (
          <button
            key={opt.value}
            onClick={() => toggleDiet(opt.value)}
            style={{
              background: selectedDiets.includes(opt.value) ? "#CB202D" : "#fff",
              color: selectedDiets.includes(opt.value) ? "#fff" : "#CB202D",
              border: "1.5px solid #CB202D",
              borderRadius: 20,
              padding: "6px 16px",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              transition: "background 0.18s"
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {/* Regenerate Button */}
      <div style={{
        padding: "14px 18px",
        borderTop: "1px solid #eee",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <button
          onClick={handleRegenerate}
          disabled={loading || selectedDiets.length === 0}
          style={{
            background: "#CB202D",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 22px",
            fontWeight: 700,
            fontSize: 15,
            cursor: loading || selectedDiets.length === 0 ? "not-allowed" : "pointer",
            opacity: loading || selectedDiets.length === 0 ? 0.7 : 1
          }}
        >
          {loading ? "Generating..." : "Regenerate Plan"}
        </button>
      </div>
      {/* Weekly Meal Plan */}
      <div style={{
        background: "#FAFAFB",
        padding: "12px 18px",
        borderTop: "1px solid #eee",
        maxHeight: 180,
        overflowY: "auto"
      }}>
        <div style={{
          fontWeight: 600,
          fontSize: 15,
          marginBottom: 6,
          color: "#CB202D"
        }}>Your Weekly Meal Plan</div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 7
        }}>
          {mealPlan.map(day => (
            <div key={day.day} style={{
              background: "#fff",
              borderRadius: 10,
              boxShadow: "0 1px 4px rgba(203,32,45,0.04)",
              padding: "8px 12px"
            }}>
              <div style={{
                fontWeight: 600,
                color: "#CB202D",
                marginBottom: 3,
                fontSize: 14
              }}>{day.day}</div>
              <ul style={{ margin: 0, padding: "0 0 0 15px", fontSize: 14 }}>
                {day.meals.map((meal, i) => (
                  <li key={i}>{meal}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SmartMealPlanner;
