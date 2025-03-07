"use client";

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Briefcase, Users, Palette, Calendar, Globe, 
  ArrowRight, ChevronRight, Coffee, Laptop
} from "lucide-react"
import { useIsMobile } from "@/hooks/useIsMobile"

// Member benefit highlights with Vietnamese cultural connections
const highlights = [
  {
    id: "freelancers",
    icon: <Laptop className="w-8 h-8 text-black" />,
    title: "Freelancers & Remote Workers",
    description: "A comfortable, productive environment with high-speed internet and endless coffee to power your workday.",
    color: "yellow",
    features: [
      "Flexible desk options",
      "Quiet focus areas",
      "Networking opportunities",
      "Professional meeting spaces"
    ]
  },
  {
    id: "startups",
    icon: <Briefcase className="w-8 h-8 text-black" />,
    title: "Startups & Small Teams",
    description: "Private studios and meeting rooms for growing businesses that need a professional base without high overhead.",
    color: "orange",
    features: [
      "Private office studios",
      "Scalable workspace solutions",
      "Business support services",
      "Investor connection events"
    ]
  },
  {
    id: "creatives",
    icon: <Palette className="w-8 h-8 text-black" />,
    title: "Creatives & Designers",
    description: "Inspiring spaces bathed in natural light, perfect for creative thinking and artistic collaboration.",
    color: "red",
    features: [
      "Natural lighting environment",
      "Collaboration spaces",
      "Exhibition opportunities",
      "Creative community events"
    ]
  },
  {
    id: "community",
    icon: <Users className="w-8 h-8 text-black" />,
    title: "Community & Events",
    description: "A vibrant hub for workshops, cultural events, and building connections with like-minded professionals.",
    color: "beige",
    features: [
      "Versatile event spaces",
      "Community workshops",
      "Networking meetups",
      "Cultural celebrations"
    ]
  },
  {
    id: "digital-nomads",
    icon: <Globe className="w-8 h-8 text-black" />,
    title: "Digital Nomads & Travelers",
    description: "A welcoming space to work and connect while experiencing Vietnamese culture and hospitality.",
    color: "yellow",
    features: [
      "Daily and weekly passes",
      "Local city guides",
      "Cultural experiences",
      "International community"
    ]
  },
  {
    id: "coffee-lovers",
    icon: <Coffee className="w-8 h-8 text-black" />,
    title: "Coffee Enthusiasts",
    description: "Enjoy premium Vietnamese coffee while you work, with our in-house café serving local specialties.",
    color: "orange",
    features: [
      "Vietnamese coffee selection",
      "Light meals and snacks",
      "Café working space",
      "Coffee tasting events"
    ]
  },
]

export default function DetailsSection() {
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [visibleCard, setVisibleCard] = useState<string | null>(null)
  const isMobile = useIsMobile()
  
  // Get color class based on highlight color
  const getColorClass = (color: string, element: "bg" | "border" | "text" = "bg") => {
    switch (color) {
      case "yellow":
        return element === "bg" ? "bg-chung-yellow" : 
               element === "border" ? "border-chung-yellow" : 
               "text-chung-yellow"
      case "orange":
        return element === "bg" ? "bg-chung-orange" : 
               element === "border" ? "border-chung-orange" : 
               "text-chung-orange"
      case "red":
        return element === "bg" ? "bg-chung-red" : 
               element === "border" ? "border-chung-red" : 
               "text-chung-red"
      case "beige":
        return element === "bg" ? "bg-chung-beige" : 
               element === "border" ? "border-chung-beige" : 
               "text-chung-beige"
      default:
        return element === "bg" ? "bg-chung-yellow" : 
               element === "border" ? "border-chung-yellow" : 
               "text-chung-yellow"
    }
  }

  // Mobile view uses a card swiper approach
  const mobileView = () => {
    // Current visible card for mobile
    const currentHighlight = highlights.find(h => h.id === visibleCard) || highlights[0]
    
    return (
      <>
        {/* Horizontally scrollable card layout for mobile */}
        <div className="overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
          <div className="flex space-x-4 w-max">
            {highlights.map((highlight) => (
              <div 
                key={highlight.id} 
                className={`w-80 p-6 rounded-2xl transition-all cursor-pointer ${
                  visibleCard === highlight.id 
                    ? `${getColorClass(highlight.color)} shadow-lg -translate-y-1` 
                    : "bg-white border border-gray-200"
                }`}
                onClick={() => setVisibleCard(highlight.id)}
              >
                <div className={`p-3 rounded-full inline-block mb-4 ${
                  visibleCard === highlight.id 
                    ? "bg-white/90" 
                    : `${getColorClass(highlight.color, "bg")}`
                }`}>
                  {highlight.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  visibleCard === highlight.id ? "text-black" : ""
                }`}>
                  {highlight.title}
                </h3>
                <p className={visibleCard === highlight.id ? "text-black/80" : "text-gray-600"}>
                  {highlight.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className={`text-sm font-medium ${
                    visibleCard === highlight.id ? "text-black" : getColorClass(highlight.color, "text")
                  }`}>
                    Learn more
                  </span>
                  <ChevronRight className={`w-5 h-5 ${
                    visibleCard === highlight.id ? "text-black" : getColorClass(highlight.color, "text")
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pagination indicator for mobile */}
        <div className="flex justify-center mt-4 space-x-2">
          {highlights.map((highlight, index) => (
            <button
              key={index}
              onClick={() => setVisibleCard(highlight.id)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                visibleCard === highlight.id 
                  ? getColorClass(highlight.color) 
                  : "bg-gray-300"
              }`}
              aria-label={`View ${highlight.title}`}
            />
          ))}
        </div>
        
        {/* Features section for the selected card on mobile */}
        <AnimatePresence mode="wait">
          {visibleCard && (
            <motion.div
              key={visibleCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8 p-6 bg-white border border-gray-100 rounded-2xl shadow-md"
            >
              <h4 className="font-bold text-lg mb-4 flex items-center">
                <span className={`w-3 h-3 rounded-full mr-2 ${getColorClass(currentHighlight.color)}`}></span>
                Key Features
              </h4>
              <ul className="space-y-3">
                {currentHighlight.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className={`w-5 h-5 flex items-center justify-center rounded-full mt-0.5 mr-3 ${getColorClass(currentHighlight.color)}`}>
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`mt-6 px-6 py-2.5 rounded-full text-white ${getColorClass(currentHighlight.color)}`}>
                Join Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Desktop view uses a grid layout with hover effects
  const desktopView = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {highlights.map((highlight) => {
          const isActive = activeCard === highlight.id
          
          return (
            <motion.div 
              key={highlight.id}
              className={`p-6 rounded-2xl transition-all duration-300 card card-hover border border-transparent ${
                isActive ? `${getColorClass(highlight.color, "border")} shadow-lg` : "hover:border-gray-200"
              }`}
              onMouseEnter={() => setActiveCard(highlight.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className={`p-3 rounded-full inline-block mb-4 ${getColorClass(highlight.color, "bg")}`}>
                {highlight.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{highlight.title}</h3>
              <p className="text-gray-600 mb-4">{highlight.description}</p>
              
              <ul className="space-y-2 mb-6">
                {highlight.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${getColorClass(highlight.color)}`}></span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <motion.div
                className="mt-auto flex items-center font-medium"
                animate={{ x: isActive ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className={getColorClass(highlight.color, "text")}>Learn more</span>
                <ArrowRight className={`ml-2 w-4 h-4 ${getColorClass(highlight.color, "text")}`} />
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50 relative">
      {/* Vietnamese pattern background */}
      <div className="absolute inset-0 vietnamese-pattern-overlay"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="font-sans text-xl text-chung-orange mb-2 block">Who We Serve</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">A Space for Everyone</h2>
          <p className="text-gray-600">
            CHUNG Workspace welcomes a diverse community of professionals, creatives, and entrepreneurs.
            Our flexible spaces are designed to meet your unique needs, whether you're working solo or with a team.
          </p>
        </div>
        
        {isMobile ? mobileView() : desktopView()}
      </div>
    </section>
  )
}

