"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Brain, Users, Briefcase, Compass, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils" // Assuming you have a utils file for classname merging
import { Montserrat, Playfair_Display, Open_Sans } from "next/font/google"

// Font configuration
const montserrat = Montserrat({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat"
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair"
})

const openSans = Open_Sans({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-opensans"
})

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Navigation links array for DRY code
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#coaching", label: "Coaching" },
    { href: "#events", label: "Events & Retreat" },
    { href: "#about", label: "About Us" },
    { href: "#courses", label: "Courses" },
    { href: "#blogs", label: "Blogs" },
    { href: "#media", label: "Media & Press" },
    { href: "#contact", label: "Contact Us" },
  ]

  // Service cards data
  const services = [
    { icon: <Heart className="h-6 w-6" />, title: "Life Coaching" },
    { icon: <Briefcase className="h-6 w-6" />, title: "Business Coaching" },
    { icon: <Users className="h-6 w-6" />, title: "Business Consultancy" },
    { icon: <Brain className="h-6 w-6" />, title: "Mental Health" },
    { icon: <Compass className="h-6 w-6" />, title: "Spiritual Awareness" },
  ]

  // Coach data
  const coaches = [
    { name: "Dionne Russell", experience: "More than 10 years of experience working on projects up to $5M" },
    { name: "Michael Chen", experience: "Certified business coach with expertise in leadership development" },
    { name: "Sarah Johnson", experience: "Specializes in personal growth and mindfulness practices" },
    { name: "David Washington", experience: "Expert in organizational change and team dynamics" },
  ]

 // Client logos data
const clientLogos = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png", alt: "Facebook Logo" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", alt: "Amazon Logo" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg", alt: "Netflix Logo" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", alt: "Google Logo" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", alt: "Apple Logo" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", alt: "Microsoft Logo" },
]

  // Stats data
  const stats = [
    { value: "100+", label: "Expert Coaches" },
    { value: "30K+", label: "Lives Changed" },
    { value: "50+", label: "Workshops Conducted" },
  ]

  return (
    <main className={cn(
      "flex min-h-screen flex-col",
      montserrat.variable,
      playfair.variable,
      openSans.variable,
      "font-sans" // Default font
    )}>
      {/* Navigation */}
      <nav className="bg-gray-900 text-white py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="font-playfair text-xl font-bold" aria-label="Mitesh Anshu - Life & Business Coach">
              Mahapatra
              <span className="block text-xs font-montserrat font-light tracking-wider">Life & Business Coach</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.label}
                href={link.href} 
                className="hover:text-gray-300 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-white focus:outline-none" 
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-800 p-4 shadow-lg">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.label}
                  href={link.href} 
                  className="hover:text-gray-300 py-2 px-4 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Discover Your Inner Strength and Create A Life You Love
            </h1>
            <p className="font-opensans text-lg mb-8 text-gray-200 leading-relaxed">
              Our expert coaches will guide you through a transformational journey of self-discovery, 
              helping you identify your unique gifts and talents.
            </p>
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md transition-colors duration-200"
              aria-label="Get started with coaching services"
            >
              Get Started
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-blue-500/90 p-6 rounded-lg shadow-lg backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="text-3xl font-bold mr-2">10+</div>
                  <div className="text-sm">
                    Years
                    <br />
                    Experience
                  </div>
                </div>
                <p className="text-sm">
                  Our transformation approach balances mind, body, and emotions. We help you discover your true strengths,
                  guiding you through a process that liberates your potential and creates an extraordinary life.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="container mx-auto px-6 mt-16">
          <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {stat.value}
                </div>
                <div className="text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="font-playfair text-2xl font-bold text-center mb-8 text-gray-700">Trusted By</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {clientLogos.map((logo, index) => (
              <div key={index} className="transition-all duration-300 hover:scale-110">
                <Image
                  src={logo.src}
                  width={120}
                  height={40}
                  alt={logo.alt}
                  className="grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="font-playfair text-3xl font-bold mb-2">Our Story</h2>
              <h3 className="font-montserrat text-2xl font-semibold mb-6 text-blue-600">Who we are</h3>
              <p className="font-opensans mb-4 text-gray-700 leading-relaxed">
                At Mahapatra , we believe in the limitless potential of individuals and the power of collaboration to
                build lives we can all be proud of.
              </p>
              <p className="font-opensans mb-6 text-gray-700 leading-relaxed">
                Mitesh is dedicated to empowering individuals, businesses, and coaches to unlock their full
                potential through transformative coaching programs that help tackle obstacles that hinder personal and
                professional excellence.
              </p>
              <Button 
                variant="outline" 
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
              >
                Learn More
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative group">
                <div className="absolute -left-4 top-1/2 w-8 h-1 bg-blue-500"></div>
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src="https://api.hub.jhu.edu/factory/sites/default/files/styles/full_width/public/coaching-team-building-hub.jpg"
                    width={400}
                    height={400}
                    alt="Our Coaching Team Collaborating"
                    className="rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Services */}
      <section id="coaching" className="py-16 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="container mx-auto px-6">
          <h2 className="font-playfair text-3xl font-bold text-center mb-12">Our Core Coaching Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-4 hover:bg-blue-600/30 rounded-lg transition-colors duration-200"
              >
                <div className="bg-white text-blue-500 p-4 rounded-full mb-4 shadow-md">
                  {service.icon}
                </div>
                <h3 className="font-montserrat text-lg font-medium tracking-wide">{service.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Coach */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="font-playfair text-3xl font-bold text-center mb-12">Meet Our Awesome Coaches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {coaches.map((coach, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="flex justify-center pt-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={`/images/coaches/coach${index + 1}.jpg`}
                      width={96}
                      height={96}
                      alt={`${coach.name} Profile Picture`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-montserrat text-lg font-bold mb-1">{coach.name}</h3>
                  <p className="font-opensans text-sm text-gray-600 mb-4 leading-relaxed">
                    {coach.experience}
                  </p>
                  <Button variant="outline" size="sm" className="text-blue-500 border-blue-500 hover:bg-blue-50">
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-blue-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-playfair text-3xl font-bold mb-4">Ready to Transform Your Life?</h2>
          <p className="font-opensans text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Take the first step toward personal growth and professional success with our expert coaching team.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-white text-blue-500 hover:bg-gray-100 transition-colors duration-200">
              Book a Free Consultation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-blue-600 transition-colors duration-200">
              Explore Programs
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Mitesh Anshu</h3>
              <p className="text-gray-400">
                Transforming lives through expert coaching and personalized guidance.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navLinks.slice(0, 4).map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                {navLinks.slice(4).map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <address className="text-gray-400 not-italic">
                <p>123 New Delhi</p>
                <p>Chandani Chowk, IN 10001</p>
                <p className="mt-2">info@miteshsrivastava.com</p>
                <p>+91 852123XXX</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Mitesh Anshu Coaching. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Admin Login Button */}
      <div className="fixed bottom-4 right-4 z-10">
        <Link href="http://localhost:3001/admin" target="_blank" rel="noopener noreferrer">
          <Button 
            variant="outline" 
            className="bg-gray-800 text-white hover:bg-gray-700 shadow-lg transition-colors duration-200"
            aria-label="Login to Admin Panel"
          >
            Login to Admin
          </Button>
        </Link>
      </div>
    </main>
  )
}