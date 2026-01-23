# 🚀 Step-by-Step Deployment Guide

This guide covers deploying the **Backend to Render** and the **Frontend to Vercel**.

---

## ✅ Part 1: Deploy Backend (Render)

We deploy the server first because the frontend needs the backend URL to communicate.

1.  **Sign Up / Login**: Go to [render.com](https://render.com/) and log in with your GitHub account.
2.  **Create New Service**:
    - Click the **"New +"** button.
    - Select **"Web Service"**.
3.  **Connect Repository**:
    - Find your repo `Flair` (or `mern-ecommerce-2024`) in the list.
    - Click **"Connect"**.
4.  **Configure Settings**:
    - **Name**: `smart-service-backend` (or any unique name).
    - **Region**: Choose the one closest to you (e.g., Singapore or Frankfurt).
    - **Branch**: `main`.
    - **Root Directory**: Leave blank (important!).
    - **Runtime**: **Node**.
    - **Build Command**:
      ```bash
      cd server && npm install
      ```
    - **Start Command**:
      ```bash
      cd server && node server.js
      ```
5.  **Environment Variables**:
    - Scroll down to the "Environment Variables" section.
    - Click "Add Environment Variable" for each of the following (copy values from your local `.env` or the list below):

    | Key                     | Value                                                                                                                                           |
    | :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
    | `MONGODB_URI`           | `mongodb+srv://marufkhansiddiqui_db_user:eQZMwjiPKBtc2jZj@main-cluster.lv1bpus.mongodb.net/smart-service-ecommerce?retryWrites=true&w=majority` |
    | `PORT`                  | `5000`                                                                                                                                          |
    | `JWT_SECRET`            | `smart_service_jwt_secret_key_2024_cse3532_project_secure`                                                                                      |
    | `PAYPAL_MODE`           | `sandbox`                                                                                                                                       |
    | `PAYPAL_CLIENT_ID`      | _(Your PayPal ID)_                                                                                                                              |
    | `PAYPAL_CLIENT_SECRET`  | _(Your PayPal Secret)_                                                                                                                          |
    | `CLOUDINARY_CLOUD_NAME` | _(Your Cloudinary Name)_                                                                                                                        |
    | `CLOUDINARY_API_KEY`    | _(Your Cloudinary Key)_                                                                                                                         |
    | `CLOUDINARY_API_SECRET` | _(Your Cloudinary Secret)_                                                                                                                      |
    | `CLIENT_BASE_URL`       | `*` (We will update this later, for now put `*` or `http://localhost:5173`)                                                                     |

6.  **Deploy**:
    - Click **"Create Web Service"**.
    - Wait for the deployment to finish. You should see "MongoDB connected" in the logs.
    - **COPY YOUR BACKEND URL** (e.g., `https://smart-service-backend.onrender.com`). You will need this for the frontend.

---

## ✅ Part 2: Deploy Frontend (Vercel)

Now we deploy the React client.

1.  **Sign Up / Login**: Go to [vercel.com](https://vercel.com/) and log in with GitHub.
2.  **Add New Project**:
    - Click **"Add New..."** -> **"Project"**.
    - Import your `Flair` repository.
3.  **Configure Project**:
    - **Framework Preset**: It should auto-detect **Vite**.
    - **Root Directory**: Click "Edit" and select the **`client`** folder. **This is crucial!**
4.  **Build Settings** (Should auto-fill, but verify):
    - Build Command: `npm run build`
    - Output Directory: `dist`
5.  **Environment Variables**:
    - Click "Environment Variables".
    - Add the following:

    | Key            | Value                                                                           |
    | :------------- | :------------------------------------------------------------------------------ |
    | `VITE_API_URL` | `https://your-backend-name.onrender.com` (Paste the URL you copied from Step 1) |

6.  **Deploy**:
    - Click **"Deploy"**.
    - Wait for it to build. Once done, you will get a domain like `https://flair-frontend.vercel.app`.

---

## ✅ Part 3: Connect Them & Finalize

Now that both are online, we need to tell the backend to trust the specific Vercel frontend URL.

1.  **Copy your Vercel Frontend URL** (e.g., `https://flair-ecommerce.vercel.app`).
2.  **Go back to Render Dashboard**:
    - Select your Backend Web Service.
    - Go to **"Environment"** tab.
    - Find `CLIENT_BASE_URL`.
    - **Edit** the value to be your Vercel URL (e.g., `https://flair-ecommerce.vercel.app`).
    - **Save Changes**.
3.  Render will automatically restart the server.

---

## 🛠 Troubleshooting

**1. MongoDB Connection Error?**

- Go to MongoDB Atlas -> Network Access.
- Ensure IP Whitelist includes **`0.0.0.0/0`** (Allow from Anywhere).

**2. Frontend shows "Network Error" or Login Fails?**

- Check that `VITE_API_URL` in Vercel is correct (no trailing slash is usually best, e.g. `...onrender.com`).
- Check that `CLIENT_BASE_URL` in Render matches your Vercel URL exactly.
- Check Render logs to ensure server is running without crashing.

**3. Images not loading?**
    
- Ensure Cloudinary credentials are correct in Render Environment Variables.

---

**You are done! Your MERN app is live! 🚀**
