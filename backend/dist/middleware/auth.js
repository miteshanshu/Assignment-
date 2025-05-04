"use strict";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Authentication middleware
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Use JWT_SECRET from .env, throw error if not set
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            return res.status(500).json({ message: "JWT_SECRET not found in .env" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Add decoded user info to request
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

// Admin check middleware
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next(); // Proceed if user is an admin
    } else {
        res.status(403).json({ message: "Access denied. Admin role required." });
    }
};
