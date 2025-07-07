import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import Chatbot from "./components/Chatbot";
import CartSidebar from "./components/CartSidebar";
import OffersModal from "./components/OffersModal";
import FilterModal from "./components/FilterModal";
import LoginModal from "./components/LoginModal";
import SmartMealPlanner from "./components/SmartMealPlanner";
import { appData } from "./data/appData";
import Header from "./components/Header";
import AIFeatures from "./components/AIFeatures";


// function HomePage({
//   onCartClick,
//   onLoginClick,
//   user,
//   onOrderNow,
//   onFilterClick,
//   handleOffersClick,
// }) {
//   return (
//     <div style={{ maxWidth: 1200, margin: "0 auto", padding: 32 }}>
//       <Header onCartClick={onCartClick} onLoginClick={onLoginClick} user={user} />
//       <div style={{ margin: "32px 0" }}>
//         <AIFeatures features={appData.aiFeatures} onOffersClick={handleOffersClick} />
//       </div>
//       <Categories categories={appData.categories} />
//       <Recommendations
//         restaurants={appData.restaurants.slice(0, 5)}
//         onOrderNow={onOrderNow}
//       />
//       <RestaurantGrid
//         restaurants={appData.restaurants}
//         onOrderNow={onOrderNow}
//         onFilterClick={onFilterClick}
//       />
//       <CategoryNav categories={appData.categories} />
//     </div>
//   );
// }

function App() {
  const [cart, setCart] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [offersOpen, setOffersOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [mealPlannerOpen, setMealPlannerOpen] = useState(false);

  // Add to cart logic with login enforcement
  const handleOrderNow = (restaurant) => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    setCart((prev) => {
      const exists = prev.find((item) => item.id === restaurant.id);
      if (exists) return prev;
      return [...prev, { ...restaurant, quantity: 1, price: restaurant.price }];
    });
    setAddedItem(restaurant);
    setShowAddModal(true);
    setTimeout(() => setShowAddModal(false), 1800);
  };

  return (
    <BrowserRouter>
      {/* Global Modals and Floating Buttons */}
      <Chatbot
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        messages={appData.chatMessages}
      />
      <SmartMealPlanner
        open={mealPlannerOpen}
        onClose={() => setMealPlannerOpen(false)}
        userId={user && user.id}
      />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />
      <OffersModal open={offersOpen} onClose={() => setOffersOpen(false)} offers={appData.offers} />
      <FilterModal open={filterOpen} onClose={() => setFilterOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={setUser} />

      {/* Floating Smart Meal Planner button */}
      <button
        onClick={() => setMealPlannerOpen(true)}
        style={{
          position: "fixed",
          bottom: 120,
          right: 40,
          background: "#2D2D2D",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: 56,
          height: 56,
          fontSize: 28,
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          cursor: "pointer",
          zIndex: 1100
        }}
        aria-label="Open Smart Meal Planner"
      >
        🥗
      </button>
      {/* Floating Food Assistant button */}
      <button
        onClick={() => setChatOpen(true)}
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          background: "#CB202D",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: 64,
          height: 64,
          fontSize: 32,
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          cursor: "pointer",
          zIndex: 1100
        }}
        aria-label="Open Food Assistant"
      >
        🤖
      </button>

      {/* Add-to-cart modal */}
      {showAddModal && addedItem && (
        <div style={{
          position: "fixed", top: 80, right: 40, background: "#fff", borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)", padding: 32, zIndex: 1200, minWidth: 320, textAlign: "center"
        }}>
          <div style={{ fontSize: 48 }}>{addedItem.image}</div>
          <div style={{ fontWeight: 600, fontSize: 20, margin: "12px 0" }}>{addedItem.name}</div>
          <div style={{ color: "#CB202D", fontWeight: 600, fontSize: 18 }}>₹{addedItem.price}</div>
          <button
            style={{
              marginTop: 16, background: "#CB202D", color: "#fff", border: "none",
              borderRadius: 8, padding: "10px 24px", fontWeight: 500, cursor: "pointer"
            }}
            onClick={() => { setCartOpen(true); setShowAddModal(false); }}
          >
            Go to Cart
          </button>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onCartClick={() => setCartOpen(true)}
              onLoginClick={() => setLoginOpen(true)}
              user={user}
              onOrderNow={handleOrderNow}
              onFilterClick={() => setFilterOpen(true)}
              handleOffersClick={() => setOffersOpen(true)}
            />
          }
        />
        <Route path="/category/:category" element={<CategoryPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
