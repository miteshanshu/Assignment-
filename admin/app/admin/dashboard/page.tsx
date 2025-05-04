"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { GripVertical, Save, LogOut } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// Define section types
interface Section {
  _id: string
  name: string
  title: string
  content: string
  order: number
  isVisible: boolean
}

export default function Dashboard() {
  const router = useRouter()
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null
    if (!storedToken) {
      router.push("/admin/login")
      return
    }

    setToken(storedToken)
    fetchSections(storedToken)
  }, [router])

  const fetchSections = async (authToken: string) => {
    setError(null)
    try {
      const response = await fetch("http://localhost:5000/api/sections", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch sections")
      }

      const data = await response.json()

      // If no sections exist, create default ones
      if (data.length === 0) {
        await createDefaultSections(authToken)
        return
      }

      setSections(data.sort((a: Section, b: Section) => a.order - b.order))
    } catch (error) {
      console.error("Error fetching sections:", error)
      setError("Failed to load content. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const createDefaultSections = async (authToken: string) => {
    try {
      const defaultSections = [
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

      for (const section of defaultSections) {
        await fetch("http://localhost:5000/api/sections", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(section),
        })
      }

      // Fetch the newly created sections
      fetchSections(authToken)
    } catch (error) {
      console.error("Error creating default sections:", error)
      setError("Failed to create default sections. Please try again.")
    }
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
    router.push("/admin/login")
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(sections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order property
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }))

    setSections(updatedItems)
  }

  const handleInputChange = (id: string, field: keyof Section, value: string | boolean) => {
    setSections((prev) => prev.map((section) => (section._id === id ? { ...section, [field]: value } : section)))
  }

  const handleSave = async () => {
    if (!token) return

    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("http://localhost:5000/api/sections/update-all", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sections }),
      })

      if (!response.ok) {
        throw new Error("Failed to save sections")
      }

      setSuccess("Content saved successfully!")

      // Refresh data
      fetchSections(token)
    } catch (error) {
      console.error("Error saving sections:", error)
      setError("Failed to save changes. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Website Content Management</h1>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="sections">
        <TabsList className="mb-4">
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="sections">
          <Card>
            <CardHeader>
              <CardTitle>Website Sections</CardTitle>
              <CardDescription>Drag and drop to reorder sections. Edit content and toggle visibility.</CardDescription>
            </CardHeader>
            <CardContent>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="sections">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {sections.map((section, index) => (
                        <Draggable key={section._id} draggableId={section._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="border rounded-lg p-4 bg-card"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                  <div {...provided.dragHandleProps} className="mr-2 cursor-grab">
                                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <h3 className="font-medium">{section.name}</h3>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Label htmlFor={`visible-${section._id}`} className="mr-2">
                                    Visible
                                  </Label>
                                  <input
                                    type="checkbox"
                                    id={`visible-${section._id}`}
                                    checked={section.isVisible}
                                    onChange={(e) => handleInputChange(section._id, "isVisible", e.target.checked)}
                                    className="h-4 w-4"
                                  />
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor={`title-${section._id}`}>Title</Label>
                                  <Input
                                    id={`title-${section._id}`}
                                    value={section.title}
                                    onChange={(e) => handleInputChange(section._id, "title", e.target.value)}
                                  />
                                </div>

                                <div>
                                  <Label htmlFor={`content-${section._id}`}>Content</Label>
                                  <Textarea
                                    id={`content-${section._id}`}
                                    value={section.content}
                                    onChange={(e) => handleInputChange(section._id, "content", e.target.value)}
                                    rows={4}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Website Settings</CardTitle>
              <CardDescription>Manage global website settings and configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="site-title">Website Title</Label>
                  <Input id="site-title" defaultValue="Mitesh Patel - Life & Business Coach" />
                </div>
                <div>
                  <Label htmlFor="site-description">Website Description</Label>
                  <Textarea
                    id="site-description"
                    defaultValue="Discover your inner strength and create a life you love with our transformational coaching services."
                    rows={3}
                  />
                </div>
                <Separator className="my-4" />
                <div>
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" defaultValue="contact@miteshpatel.com" />
                </div>
                <div>
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input id="contact-phone" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  )
}
