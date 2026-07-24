# Student Management System - Deployment Guide

This document contains step-by-step instructions for deploying the backend to Render, the frontend to Vercel, and the database to Railway.

## Step 1: Database Setup (Railway)
1. Go to [Railway.app](https://railway.app/) and login.
2. Click **New Project** and select **Provision PostgreSQL** or **Provision MySQL** (since the app uses MySQL, make sure it's a MySQL database).
3. Once provisioned, click on your MySQL service, go to the **Variables** tab, and note down the connection variables: `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, and `MYSQL_DATABASE`.
4. Connect to your MySQL database using a tool like DBeaver, MySQL Workbench, or the Railway CLI and execute the contents of the `student_management.sql` file to create the tables.

## Step 2: Backend Deployment (Render)
1. Go to [Render.com](https://render.com/) and login.
2. Click **New** -> **Web Service**.
3. Connect your GitHub repository containing the project.
4. Fill in the deployment details:
   - **Root Directory**: Leave blank (or `/` if you didn't move it).
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Scroll down to **Environment Variables** and add the following keys using the details from Railway:
   - `DB_HOST`: (Your Railway host)
   - `DB_PORT`: (Your Railway port)
   - `DB_USER`: (Your Railway user)
   - `DB_PASSWORD`: (Your Railway password)
   - `DB_NAME`: (Your Railway database name)
   - `JWT_SECRET`: (Any secure random string for tokens)
6. Click **Create Web Service**. Note down the Render URL (e.g. `https://student-mangenet-system.onrender.com`).
*(Note: I have already updated all your frontend JS code to point to `https://student-mangenet-system.onrender.com`. If your final Render URL is different, you must update the URLs in `frontend/js/*.js` files before pushing to GitHub).*

## Step 3: Frontend Deployment (Vercel)
1. Go to [Vercel.com](https://vercel.com/) and login.
2. Click **Add New Project** and import your GitHub repository.
3. In the project configuration, under **Framework Preset**, choose `Other`.
4. **CRITICAL STEP**: Change the **Root Directory** to `frontend`. This ensures Vercel only serves the frontend HTML, JS, and CSS files, instead of trying to build the Node.js backend.
5. Click **Deploy**. Vercel will automatically serve your `index.html` and the static assets.

## Step 4: GitHub Push / Pull Instructions
Since the code was fixed locally, here are the steps to push the changes back to GitHub so Render and Vercel can automatically redeploy:

1. Open your terminal in the project directory.
2. Ensure you have the latest code from remote just in case:
   ```bash
   git pull origin main
   ```
   *(If you get a merge conflict, resolve it by keeping these new changes).*
3. Add the fixed files (JS folder moved to frontend, URLs updated, token bugs fixed):
   ```bash
   git add .
   ```
4. Commit your changes:
   ```bash
   git commit -m "Fix: Moved js to frontend, updated Render API URLs, fixed localStorage token bugs"
   ```
5. Push the changes to GitHub:
   ```bash
   git push origin main
   ```
Once pushed, Render and Vercel will automatically trigger a new deployment. Wait for both to finish, and your Student Register & Login will start working flawlessly!
