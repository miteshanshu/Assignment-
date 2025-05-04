import mongoose from "mongoose"
import dotenv from "dotenv"
import User from "./models/User"
import Section from "./models/Section"

// Load environment variables
dotenv.config()

// MongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://miteshk846:anshu123@admin.tb90soy.mongodb.net/?retryWrites=true&w=majority&appName=admin"

// Seed data
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Section.deleteMany({})

    // Create admin user
    const adminUser = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: "password123",
      role: "admin",
    })

    await adminUser.save()
    console.log("Admin user created")

    // Create sections
    const sections = [
      {
        name: "Hero Section",
        title: "Discover Your Inner Strength and Create A Life You Love",
        content:
          "We coaches will guide you through a transformational journey of self-discovery, helping you identify your unique gifts and talents.",
        order: 0,
        isVisible: true,
      },
      {
        name: "About Section",
        title: "Our Story",
        content:
          "At MiteshPatel, we believe in the limitless potential of individuals and the power of collaboration to build lives we can all be proud of.",
        order: 1,
        isVisible: true,
      },
      {
        name: "Services Section",
        title: "Our Core Coaching Services",
        content:
          "We offer a range of coaching services including Life Coaching, Business Coaching, Business Consultancy, Mental Health, and Spiritual Awareness.",
        order: 2,
        isVisible: true,
      },
      {
        name: "Team Section",
        title: "Meet Our Awesome Coach",
        content:
          "Our experienced coaches have helped thousands of individuals and businesses reach their full potential.",
        order: 3,
        isVisible: true,
      },
    ]

    await Section.insertMany(sections)
    console.log("Sections created")

    console.log("Database seeded successfully")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

// Run the seed function
seedDatabase()
