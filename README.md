

```markdown
# 🧠 Life Coaching Website – Full-Stack Project Setup Guide

Welcome! This guide will help you set up and run the **Life Coaching Website**, which includes:

- 🌐 A public-facing website (Next.js 14)
- 🔐 An admin panel (Next.js + ShadCN UI)
- ⚙️ A backend API (Node.js + Express + TypeScript)
- 🗃️ MongoDB database (Atlas or local)

---

## 📦 Prerequisites

- Node.js v16 or higher
- npm (comes with Node.js)
- MongoDB Atlas account (or use a local MongoDB)
- Basic terminal knowledge

---

## 📁 Project Structure

After extracting the project ZIP, you’ll see:

```

life-coaching-website/
├── frontend/   → Main website (Next.js)
├── admin/      → Admin dashboard (Next.js)
└── backend/    → API server (Node.js + Express)

````

---

## ⚙️ Quick Setup (Recommended)

### 🐧 macOS/Linux

```bash
cd life-coaching-website
chmod +x setup-project.sh
./setup-project.sh
````

### 🪟 Windows

Manual setup required (see below).

---

## 🛠️ Manual Setup (If Auto Script Fails)

### 1️⃣ Backend Setup

```bash
cd backend
npm install
npm run build
npm run seed
npm run dev
```

📍 Runs at: `http://localhost:5000`

---

### 2️⃣ Frontend Website Setup

```bash
cd frontend
npm install
npm run dev
```

📍 Runs at: `http://localhost:3000`

---

### 3️⃣ Admin Panel Setup

```bash
cd admin
npm install
npm run dev -- -p 3001
```

📍 Runs at: `http://localhost:3001/admin`

---

## ✅ Verifying Setup

1. Visit [http://localhost:3000](http://localhost:3000) → You should see the homepage.
2. Visit [http://localhost:3001/admin](http://localhost:3001/admin)

Login credentials:

```
Email: admin@example.com  
Password: password123
```

🔓 Admin Dashboard lets you:

* Edit all homepage sections
* Reorder sections (drag-and-drop)
* Toggle section visibility

---

## 🧯 Troubleshooting

### Backend

* **MongoDB Error**: Check `.env` → `MONGODB_URI`, whitelist IPs
* **Port Conflict (5000)**: Change `PORT` in `.env`
* **JWT Error**: Add `JWT_SECRET=your_secret` in `.env`

### Frontend/Admin

* **Missing Modules**: Run `npm install` and verify UI components
* **Missing ShadCN Components**: Fixed versions are included
* **Next.js Errors**: Fix TypeScript errors or run with `--no-lint`

---

## 🧠 Project Structure Overview

```plaintext
frontend/
├── app/               → App Router pages
├── components/ui/     → ShadCN UI components
├── lib/               → Utility functions
└── public/            → Static assets

admin/
├── app/admin/         → Dashboard & login
├── components/ui/     → Admin UI components
└── lib/               → Utilities

backend/
├── src/
│   ├── models/        → MongoDB models
│   ├── routes/        → API routes
│   ├── middleware/    → Auth & helpers
│   └── index.ts       → Entry point
└── dist/              → Compiled output
```

---

## 🚀 Deployment Guide

### Backend

```bash
cd backend
npm run build
```

📤 Deploy using:

* Heroku
* AWS / DigitalOcean
* Render / Railway

📌 Set env vars:

* `MONGODB_URI`
* `JWT_SECRET`
* `PORT`

---

### Frontend & Admin

```bash
cd frontend && npm run build
cd ../admin && npm run build
```

📤 Deploy to Vercel (recommended):

* Connect GitHub
* Set environment variables
* Set root as `/frontend` or `/admin`

Other options:

* Netlify
* AWS Amplify
* Custom VPS

---

## 🔧 Advanced Configuration

* **Change Ports**:

  * Backend: edit `backend/.env`
  * Frontend/Admin: use `npm run dev -- -p <port>`

* **Environment Variables**:

  * Use `.env` files in each directory
  * Access via `process.env.YOUR_KEY`

* **Custom DB**:

  * Update `MONGODB_URI` in `.env`

---

## ✨ Extend This Project

### 1. 🖼️ Image Upload

* Integrate Cloudinary or AWS S3
* Update admin to upload images
* Store image URLs in DB

### 2. ✍️ Blog System

* Add blog models + routes
* Admin blog management
* Frontend blog pages

### 3. 📬 Contact Form

* Form component on homepage
* Email service (e.g., Nodemailer)
* Backend route to handle form

---

## 🎨 Design & Styling

* Tailwind: Customize in `tailwind.config.js`
* Global styles: Edit `globals.css`
* ShadCN Components: Edit `components/ui/`

---

## 📌 Homepage Sections

* Hero Section (title, subtitle, CTA)
* About Section (intro + image)
* Logos Section (scrolling brands)
* CTA/Footer Section (final message)

---

## 🧩 Admin Features

* Edit all 4 sections
* Drag-and-drop reordering
* Save layout to MongoDB
* Real-time preview via API

---

## 🏁 Conclusion

You're now ready to run and expand a complete full-stack project using:

* Frontend: **Next.js + TailwindCSS + ShadCN UI**
* Backend: **Node.js + TypeScript + MongoDB**
* Admin Panel: **Fully integrated with your backend**

🧪 Built for learning, launching, and scaling.

Happy coding! 🚀

```
```
