import express from "express"
import Section from "../models/Section"
import { authenticateToken } from "../middleware/auth"

const router = express.Router()

// Get all sections
router.get("/", async (req, res) => {
  try {
    const sections = await Section.find().sort({ order: 1 })
    res.json(sections)
  } catch (error) {
    console.error("Get sections error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get section by ID
router.get("/:id", async (req, res) => {
  try {
    const section = await Section.findById(req.params.id)
    if (!section) {
      return res.status(404).json({ message: "Section not found" })
    }

    res.json(section)
  } catch (error) {
    console.error("Get section error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create new section (admin only)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name, title, content, order, isVisible } = req.body

    // Get highest order if not provided
    let sectionOrder = order
    if (sectionOrder === undefined) {
      const highestSection = await Section.findOne().sort({ order: -1 })
      sectionOrder = highestSection ? highestSection.order + 1 : 0
    }

    const section = new Section({
      name,
      title,
      content,
      order: sectionOrder,
      isVisible: isVisible !== undefined ? isVisible : true,
    })

    await section.save()

    res.status(201).json(section)
  } catch (error) {
    console.error("Create section error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update section (admin only)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { name, title, content, order, isVisible } = req.body

    const section = await Section.findById(req.params.id)
    if (!section) {
      return res.status(404).json({ message: "Section not found" })
    }

    // Update fields
    if (name) section.name = name
    if (title) section.title = title
    if (content) section.content = content
    if (order !== undefined) section.order = order
    if (isVisible !== undefined) section.isVisible = isVisible

    section.updatedAt = new Date()

    await section.save()

    res.json(section)
  } catch (error) {
    console.error("Update section error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update all sections (for reordering)
router.put("/update-all", authenticateToken, async (req, res) => {
  try {
    const { sections } = req.body

    if (!Array.isArray(sections)) {
      return res.status(400).json({ message: "Sections must be an array" })
    }

    // Update each section
    const updatePromises = sections.map((section) =>
      Section.findByIdAndUpdate(
        section._id,
        {
          title: section.title,
          content: section.content,
          order: section.order,
          isVisible: section.isVisible,
          updatedAt: new Date(),
        },
        { new: true },
      ),
    )

    const updatedSections = await Promise.all(updatePromises)

    res.json(updatedSections)
  } catch (error) {
    console.error("Update all sections error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete section (admin only)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const section = await Section.findById(req.params.id)
    if (!section) {
      return res.status(404).json({ message: "Section not found" })
    }

    await section.deleteOne()

    // Reorder remaining sections
    const remainingSections = await Section.find().sort({ order: 1 })
    const updatePromises = remainingSections.map((section, index) =>
      Section.findByIdAndUpdate(section._id, { order: index }),
    )

    await Promise.all(updatePromises)

    res.json({ message: "Section deleted successfully" })
  } catch (error) {
    console.error("Delete section error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
