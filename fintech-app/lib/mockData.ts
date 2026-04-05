export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  emoji: string;
}

export const PRODUCTS: Product[] = [
  // Drinks
  { id: "d1", name: "Sparkling Water", price: 4.0, category: "Drinks", image: "", emoji: "💧" },
  { id: "d2", name: "Orange Juice", price: 5.5, category: "Drinks", image: "", emoji: "🍊" },
  { id: "d3", name: "Green Tea", price: 3.5, category: "Drinks", image: "", emoji: "🍵" },
  { id: "d4", name: "Cold Brew", price: 6.0, category: "Drinks", image: "", emoji: "☕" },
  { id: "d5", name: "Lemonade", price: 4.5, category: "Drinks", image: "", emoji: "🍋" },

  // Meat & Poultry
  { id: "m1", name: "Chicken Breast", price: 8.99, category: "Meat & Poultry", image: "", emoji: "🍗" },
  { id: "m2", name: "Ground Beef", price: 9.5, category: "Meat & Poultry", image: "", emoji: "🥩" },
  { id: "m3", name: "Salmon Fillet", price: 12.99, category: "Meat & Poultry", image: "", emoji: "🐟" },
  { id: "m4", name: "Turkey Slices", price: 7.5, category: "Meat & Poultry", image: "", emoji: "🦃" },
  { id: "m5", name: "Pork Chops", price: 10.0, category: "Meat & Poultry", image: "", emoji: "🐷" },

  // Produce
  { id: "p1", name: "Avocados", price: 3.0, category: "Produce", image: "", emoji: "🥑" },
  { id: "p2", name: "Strawberries", price: 4.99, category: "Produce", image: "", emoji: "🍓" },
  { id: "p3", name: "Spinach", price: 2.5, category: "Produce", image: "", emoji: "🥬" },
  { id: "p4", name: "Tomatoes", price: 3.5, category: "Produce", image: "", emoji: "🍅" },
  { id: "p5", name: "Broccoli", price: 2.99, category: "Produce", image: "", emoji: "🥦" },
];

export const CATEGORIES = ["Drinks", "Meat & Poultry", "Produce"];

export const TAX_RATE = 0.13;
