import React from "react";
import Header from "../components/Header";
import AIFeatures from "../components/AIFeatures";
import Categories from "../components/Categories";
import Recommendations from "../components/Recommendations";
import RestaurantGrid from "../components/RestaurantGrid";
import CategoryNav from "../components/CategoryNav";
import { appData } from "../data/appData";

function HomePage({
  onCartClick,
  onLoginClick,
  user,
  onOrderNow,
  onFilterClick,
  handleOffersClick,
}) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 32 }}>
      <Header onCartClick={onCartClick} onLoginClick={onLoginClick} user={user} />
      <div style={{ margin: "32px 0" }}>
        <AIFeatures features={appData.aiFeatures} onOffersClick={handleOffersClick} />
      </div>
      <Categories categories={appData.categories} />
      <Recommendations
        restaurants={appData.restaurants.slice(0, 5)}
        onOrderNow={onOrderNow}
      />
      <RestaurantGrid
        restaurants={appData.restaurants}
        onOrderNow={onOrderNow}
        onFilterClick={onFilterClick}
      />
      <CategoryNav categories={appData.categories} />
    </div>
  );
}

export default HomePage;