# Smart Service - E-Commerce Platform

Hey there! This is a full-stack MERN e-commerce application I built for my CSE-3532 course project. It's got a pretty solid admin panel, user authentication, shopping cart, and all the usual e-commerce stuff you'd expect.

## What's Inside?

This is a complete online shopping platform with:

- **Customer-facing store** with product browsing, cart, and checkout
- **Admin dashboard** for managing products, orders, and featured images
- **User authentication** with separate roles (admin/customer)
- **Order management** with status tracking
- **Payment integration** ready (uses PayPal)
- **Responsive design** that works on mobile and desktop

The UI is designed with a premium, architectural aesthetic using glassmorphism and modern typography. Think high-end boutique vibes but for any e-commerce use case.

## Tech Stack

**Frontend:**

- React 18 with Vite
- Redux Toolkit for state management
- TailwindCSS + shadcn/ui components
- React Router for navigation

**Backend:**

- Node.js + Express
- MongoDB with Mongoose
- JWT authentication
- Bcrypt for password hashing

## Getting Started

### Prerequisites

Make sure you have these installed:

- Node.js (v16 or higher)
- MongoDB (running locally or a MongoDB Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd mern-ecommerce-2024
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies (for concurrently running both servers)
   npm install

   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `server` folder with these values:

   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   CLIENT_BASE_URL=http://localhost:5173
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_client_secret
   ```

4. **Seed the database**

   This step is important! It creates the admin user and some sample data.

   ```bash
   # From the server folder, run:
   node seedAdmin.js
   node seedFeatures.js
   node seedProducts.js
   ```

### Running the Application

**Option 1: Run everything at once (recommended)**

```bash
# From the root folder
npm run dev
```

This will start both the client (port 5173) and server (port 5000) simultaneously.

**Option 2: Run client and server separately**

```bash
# Terminal 1 - Start the server
cd server
npm run dev

# Terminal 2 - Start the client
cd client
npm run dev
```

The app should now be running at:

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

## Admin Access & Test Accounts

**IMPORTANT:** The application is now connected to MongoDB Atlas cloud database.

**Database Connection:**

- MongoDB Atlas Cluster: `main-cluster.lv1bpus.mongodb.net`
- Database Name: `smart-service-ecommerce`
- Connection authenticated automatically via environment variables

After running the seed scripts, you have these accounts available:

### **Admin Account (Full Access)**

- **Email:** `admin@gmail.com`
- **Password:** `admin123`
- **Access:** Admin Dashboard, Product Management, Order Management, Featured Images

### **Test Customer Account**

- **Email:** `customer@test.com`
- **Password:** `customer123`
- **Access:** Shopping, Cart, Checkout, Order History

### **Create Your Own Account**

You can also create new customer accounts through the registration page at `/auth/register`

## Project Structure

```
mern-ecommerce-2024/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   └── config/        # Configuration files
│   └── ...
├── server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── helpers/          # Utility functions
│   └── ...
└── README.md
```

## Key Features Breakdown

### For Customers:

- Browse products by category, brand
- Add items to cart
- Multiple address management
- Secure checkout with PayPal
- Order history and tracking
- Product reviews and ratings

### For Admins:

- Dashboard with analytics
- Product management (CRUD)
- Order management with status updates
- Featured images carousel management
- User overview

## Common Issues & Fixes

**Port already in use?**

- Make sure nothing else is running on ports 5173 or 5000
- Kill the process or change the port in the config

**MongoDB connection failed?**

- Check your MONGODB_URI in the .env file
- Make sure MongoDB is running (if local)
- Check your network connection (if using Atlas)

**Images not loading?**

- The app uses Unsplash URLs for images, so you need an internet connection
- Product images are stored as URLs in the database

**Admin panel not accessible?**

- Make sure you seeded the admin user (`node seedAdmin.js`)
- Clear your browser cache and local storage
- Try logging out and logging back in

## Notes

- This project uses the **Bangladeshi Taka (৳)** as the currency. You can change this in the product display components if needed.
- The design is optimized for modern browsers (Chrome, Firefox, Safari, Edge)
- PayPal integration is in test mode - you'll need to set up your own PayPal developer account for production

## Credits

Built by Saiful for CSE-3532: Tools and Technologies for Internet Programming.

The UI design follows modern web standards with inspiration from high-end e-commerce platforms, using glassmorphism, strong typography, and architectural spacing principles.

---

If you run into any issues or have questions, feel free to reach out. Happy coding! 🚀
