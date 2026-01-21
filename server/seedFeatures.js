require("dotenv").config();
const mongoose = require("mongoose");
const Feature = require("./models/Feature");

const featureImages = [
  {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop", // Clean red sneaker flat lay
  },
  {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop", // Professional watch/lifestyle item
  },
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop", // Minimalist clean storefront/interior
  }
];

const seedFeatures = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding features...");

    // Clear existing features
    await Feature.deleteMany({});
    console.log("Existing features removed.");

    await Feature.insertMany(featureImages);
    console.log("Feature images seeded successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding features:", error);
    process.exit(1);
  }
};

seedFeatures();
