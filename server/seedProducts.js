require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  // Men
  {
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2070&auto=format&fit=crop", // Flat lay T-shirt
    title: "Men's Graphic T-Shirt",
    description: "Premium cotton graphic tee for a casual look.",
    category: "men",
    brand: "nike",
    price: 30,
    salePrice: 25,
    totalStock: 100,
    averageReview: 4.5
  },
  {
    image: "https://images.unsplash.com/photo-1624371414361-e6e0f19c33c2?q=80&w=2070&auto=format&fit=crop", // Clean folded trousers
    title: "Slim Fit Chinos",
    description: "Versatile chinos that transition from office to evening.",
    category: "men",
    brand: "levi",
    price: 60,
    salePrice: 45,
    totalStock: 80,
    averageReview: 4.3
  },
  {
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=2070&auto=format&fit=crop", // Denim jacket flat lay
    title: "Levi's Denim Jacket",
    description: "A classic denim jacket that lasts a lifetime.",
    category: "men",
    brand: "levi",
    price: 90,
    salePrice: 70,
    totalStock: 50,
    averageReview: 4.7
  },
  // Women
  {
    image: "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?q=80&w=2070&auto=format&fit=crop", // Distinct modest outfit flat lay
    title: "Premium Modest Abaya",
    description: "Elegant and breathable fabric for all-day comfort.",
    category: "women",
    brand: "h&m",
    price: 85,
    salePrice: 65,
    totalStock: 30,
    averageReview: 4.9
  },
  {
    image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=1964&auto=format&fit=crop", // Minimalist bag/accessory
    title: "Luxury Silk Hijab",
    description: "Soft silk accessories in neutral tones.",
    category: "women",
    brand: "zara",
    price: 40,
    salePrice: 30,
    totalStock: 100,
    averageReview: 4.7
  },
  {
    image: "https://images.unsplash.com/photo-1612730871336-659822129dec?q=80&w=1974&auto=format&fit=crop", // Modest footwear/set
    title: "Women's Palazzo Pants",
    description: "Wide-leg modest trousers for a sophisticated silhouette.",
    category: "women",
    brand: "levi",
    price: 75,
    salePrice: 55,
    totalStock: 40,
    averageReview: 4.8
  },
  // Kids
  {
    image: "https://images.unsplash.com/photo-1621454523226-eb4f525c8ffd?q=80&w=2070&auto=format&fit=crop", // Kids hoodie flat lay
    title: "Kids' Sport Hoodie",
    description: "Cozy and durable hoodie for active kids.",
    category: "kids",
    brand: "adidas",
    price: 35,
    salePrice: 28,
    totalStock: 120,
    averageReview: 4.8
  },
  {
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2070&auto=format&fit=crop", // Baby clothes stack
    title: "Baby Sleepsuit Set",
    description: "Ultra-soft cotton sleepsuits for maximum comfort.",
    category: "kids",
    brand: "h&m",
    price: 25,
    salePrice: 20,
    totalStock: 150,
    averageReview: 4.9
  },
  {
    image: "https://images.unsplash.com/photo-1519233924372-9ed80004314c?q=80&w=2070&auto=format&fit=crop", // Kids denim flat lay
    title: "Kids' Denim Dungarees",
    description: "Classic dungarees for a playful and sturdy outfit.",
    category: "kids",
    brand: "levi",
    price: 50,
    salePrice: 40,
    totalStock: 80,
    averageReview: 4.5
  },
  // Accessories
  {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    title: "Classic Watch",
    description: "A timeless timepiece with a leather strap.",
    category: "accessories",
    brand: "zara",
    price: 120,
    salePrice: 95,
    totalStock: 40,
    averageReview: 4.7
  },
  {
    image: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?q=80&w=2070&auto=format&fit=crop",
    title: "Leather Wallet",
    description: "Genuine leather wallet with multiple card slots.",
    category: "accessories",
    brand: "levi",
    price: 40,
    salePrice: 30,
    totalStock: 100,
    averageReview: 4.4
  },
  {
    image: "https://images.unsplash.com/photo-1509692252745-0d45a7ef6420?q=80&w=1974&auto=format&fit=crop",
    title: "Canvas Backpack",
    description: "Spacious and durable backpack for daily use.",
    category: "accessories",
    brand: "nike",
    price: 55,
    salePrice: 45,
    totalStock: 60,
    averageReview: 4.6
  },
  // Footwear
  {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    title: "Nike Air Max 270",
    description: "Iconic Nike Air Max cushioning for all-day comfort.",
    category: "footwear",
    brand: "nike",
    price: 150,
    salePrice: 120,
    totalStock: 50,
    averageReview: 4.8
  },
  {
    image: "https://images.unsplash.com/photo-1566677914817-56426959ae9c?q=80&w=2070&auto=format&fit=crop",
    title: "Puma Suede Classic",
    description: "The street-style legend that never goes out of fashion.",
    category: "footwear",
    brand: "puma",
    price: 70,
    salePrice: 60,
    totalStock: 90,
    averageReview: 4.5
  },
  {
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop",
    title: "Adidas Running Shoes",
    description: "Lightweight and responsive shoes for the ultimate run.",
    category: "footwear",
    brand: "adidas",
    price: 110,
    salePrice: 85,
    totalStock: 60,
    averageReview: 4.7
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding products...");

    // Clear existing products to ensure we have exactly 3 per category
    await Product.deleteMany({});
    console.log("Existing products cleared.");

    await Product.insertMany(products);
    console.log("Products seeded successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
