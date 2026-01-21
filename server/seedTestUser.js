require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const seedTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding test user...");

    // Clear existing test user
    await User.deleteOne({ email: "customer@test.com" });

    const hashPassword = await bcrypt.hash("customer123", 12);
    const testUser = new User({
      userName: "Test Customer",
      email: "customer@test.com",
      password: hashPassword,
      role: "user",
    });

    await testUser.save();
    console.log("Test customer user created successfully!");
    console.log("Email: customer@test.com");
    console.log("Password: customer123");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding test user:", error);
    process.exit(1);
  }
};

seedTestUser();
