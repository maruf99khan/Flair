require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding admin...");

    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("Admin user already exists.");
    } else {
      const hashPassword = await bcrypt.hash("admin123", 12);
      const adminUser = new User({
        userName: "Admin",
        email: "admin@gmail.com",
        password: hashPassword,
        role: "admin",
      });

      await adminUser.save();
      console.log("Admin user created successfully!");
      console.log("Email: admin@gmail.com");
      console.log("Password: admin123");
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
