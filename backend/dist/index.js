"use strict";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import sectionRoutes from "./routes/sections";
import User from "./models/User";
import bcrypt from "bcryptjs";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Allowed CORS origins
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3000/admin/dashboard",
];

// CORS setup
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

// Middleware
app.use(express.json());

// MongoDB URI from .env
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI not found in .env");
    process.exit(1); // Exit app if URI is missing
}

// Connect to MongoDB
mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sections", sectionRoutes);

// Health check route
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is running" });
});

// Create default admin user
const createDefaultAdmin = async () => {
    try {
        const adminExists = await User.findOne({ email: "admin@example.com" });
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("password123", salt);
            const admin = new User({
                name: "Admin User",
                email: "admin@example.com",
                password: hashedPassword,
                role: "admin",
            });
            await admin.save();
            console.log("👤 Default admin user created");
        }
    } catch (error) {
        console.error("❌ Error creating default admin:", error);
    }
};

// Start server
mongoose.connection.once("open", async () => {
    await createDefaultAdmin();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});
