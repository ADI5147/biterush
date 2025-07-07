export const appData = {
  restaurants: [
    {
      id: "1",
      name: "Pizza Paradise",
      image: "🍕",
      rating: 4.5,
      cuisine: ["Italian", "Pizza"],
      deliveryTime: "25-30 min",
      distance: "2.1 km",
      tags: [{ type: "trending", label: "Trending", icon: "🌟", color: "#FF9F09" }],
      price: 299
    },
    {
      id: "2",
      name: "Burger Bistro",
      image: "🍔",
      rating: 4.3,
      cuisine: ["American", "Fast Food"],
      deliveryTime: "20-25 min",
      distance: "1.8 km",
      tags: [{ type: "quick", label: "Quick Delivery", icon: "⏰", color: "#72A613" }],
      price: 249
    },
    {
      id: "3",
      name: "Spice Route",
      image: "🍛",
      rating: 4.8,
      cuisine: ["Indian", "Spicy"],
      deliveryTime: "30-35 min",
      distance: "3.2 km",
      tags: [{ type: "popular", label: "Most Loved", icon: "🔥", color: "#CB202D" }],
      price: 349
    },
    {
      id: "4",
      name: "Sushi Zen",
      image: "🍣",
      rating: 4.7,
      cuisine: ["Japanese", "Sushi"],
      deliveryTime: "35-40 min",
      distance: "4.1 km",
      tags: [{ type: "weather", label: "Perfect for Today", icon: "🌦️", color: "#5875AD" }],
      price: 399
    },
    {
      id: "5",
      name: "Taco Fiesta",
      image: "🌮",
      rating: 4.4,
      cuisine: ["Mexican", "Tacos"],
      deliveryTime: "25-30 min",
      distance: "2.8 km",
      tags: [{ type: "trending", label: "Trending", icon: "🌟", color: "#FF9F09" }],
      price: 279
    },
    {
      id: "6",
      name: "Wok Express",
      image: "🥡",
      rating: 4.6,
      cuisine: ["Chinese", "Asian"],
      deliveryTime: "30-40 min",
      distance: "3.5 km",
      tags: [{ type: "new", label: "New", icon: "🆕", color: "#00B8D9" }],
      price: 320
    },
    {
      id: "7",
      name: "Sweet Treats",
      image: "🍰",
      rating: 4.9,
      cuisine: ["Desserts", "Bakery"],
      deliveryTime: "20-30 min",
      distance: "1.2 km",
      tags: [{ type: "dessert", label: "Dessert", icon: "🍰", color: "#FFB6C1" }],
      price: 180
    },
    {
      id: "8",
      name: "Pasta Palace",
      image: "🍝",
      rating: 4.2,
      cuisine: ["Italian", "Pasta"],
      deliveryTime: "30-35 min",
      distance: "3.5 km",
      tags: [{ type: "quick", label: "Quick Delivery", icon: "⏰", color: "#72A613" }],
      price: 310
    }
  ],
  categories: [
    { id: "1", name: "Pizza", icon: "🍕" },
    { id: "2", name: "Burgers", icon: "🍔" },
    { id: "3", name: "Indian", icon: "🍛" },
    { id: "4", name: "Chinese", icon: "🥡" },
    { id: "5", name: "Italian", icon: "🍝" },
    { id: "6", name: "Mexican", icon: "🌮" },
    { id: "7", name: "Desserts", icon: "🍰" },
    { id: "8", name: "Sushi", icon: "🍣" },
    { id: "9", name: "Bakery", icon: "🥐" },
    { id: "10", name: "Healthy", icon: "🥗" },
    { id: "11", name: "Drinks", icon: "🥤" }
  ],
  offers: [
    {
      id: "1",
      title: "50% OFF",
      description: "On orders above ₹299",
      code: "BITE50",
      validUntil: "2024-12-31",
      color: "#CB202D"
    },
    {
      id: "2",
      title: "Free Delivery",
      description: "On all orders today",
      code: "FREEDEL",
      validUntil: "2024-12-31",
      color: "#72A613"
    }
  ],
  chatMessages: [
    {
      id: "1",
      type: "bot",
      message: "Hi! I'm your food assistant. What are you craving today? 🍕"
    }
  ],
  aiFeatures: [
    {
      id: "1",
      icon: "🎤",
      title: "Voice Order",
      description: "Order with your voice",
      button: "Start Voice Order"
    },
    {
      id: "2",
      icon: "📷",
      title: "Image Search",
      description: "Find food by photo",
      button: "Upload Image"
    },
    {
      id: "3",
      icon: "🎁",
      title: "Today's Offers",
      description: "Save more on orders",
      button: "View Offers"
    }
  ]
};
