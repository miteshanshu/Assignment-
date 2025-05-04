import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth"
import sectionRoutes from "./routes/sections"

// Load environment variables
dotenv.config()

// Create Express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
)
app.use(express.json())

// MongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://miteshk846:anshu123@admin.tb90soy.mongodb.net/?retryWrites=true&w=majority&appName=admin"

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/sections", sectionRoutes)

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" })
})

// Create default admin user if none exists
import User from "./models/User"
import bcrypt from "bcryptjs"

const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@example.com" })

    if (!adminExists) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash("password123", salt)

      const admin = new User({
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      })

      await admin.save()
      console.log("Default admin user created")
    }
  } catch (error) {
    console.error("Error creating default admin:", error)
  }
}

// Start server
mongoose.connection.once("open", async () => {
  await createDefaultAdmin()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
