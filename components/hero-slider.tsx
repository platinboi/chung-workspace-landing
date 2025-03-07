"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useIsMobile } from "@/hooks/useIsMobile"
import { motion } from "framer-motion"

// Define slide type
type Slide = {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  alt: string
  overlay: string
}

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [windowHeight, setWindowHeight] = useState("100vh")
  const sliderRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  // Get window height on mount and on resize
  useEffect(() => {
    const calculateHeight = () => {
      // Fix for mobile viewport height issues
      setWindowHeight(`${window.innerHeight}px`)
    }

    // Initial calculation
    calculateHeight()

    // Recalculate on resize
    window.addEventListener('resize', calculateHeight)
    
    return () => window.removeEventListener('resize', calculateHeight)
  }, [])

  // Slides data with creative collective focus
  const slides: Slide[] = [
    {
      id: 1,
      title: "Create & Connect",
      subtitle: "Hanoi Creative Collective",
      description: "A vibrant space where artists, designers, and creators come together to spark ideas and make beautiful things.",
      image: "/images/hero/hero-1.jpg",
      alt: "CHUNG creative space with artists working in a collaborative environment",
      overlay: "yellow",
    },
    {
      id: 2,
      title: "Community",
      subtitle: "Find Your People",
      description: "Join a diverse community of passionate creators united by curiosity and a desire to make meaningful work.",
      image: "/images/hero/hero-2.jpg",
      alt: "CHUNG creative collective members collaborating on a project",
      overlay: "yellow",
    },
    {
      id: 3,
      title: "Vietnamese Culture",
      subtitle: "Rooted in Tradition",
      description: "Drawing inspiration from Vietnam's rich cultural heritage while creating contemporary art and design.",
      image: "/images/hero/hero-3.jpg",
      alt: "CHUNG creative space with Vietnamese cultural elements and modern art",
      overlay: "yellow",
    },
    {
      id: 4,
      title: "Workshops & Events",
      subtitle: "Learn & Experiment",
      description: "From silk screen printing to experimental music, our space hosts workshops, exhibitions, and performances.",
      image: "/images/hero/hero-4.jpg",
      alt: "Workshop in progress at CHUNG creative collective space",
      overlay: "yellow",
    },
  ]

  // Function to go to the next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [slides.length])

  // Function to go to the previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  // Auto-advance slides with useEffect
  useEffect(() => {
    let intervalId: NodeJS.Timeout
    
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        nextSlide()
      }, 5000) // Change slide every 5 seconds
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isAutoPlaying, nextSlide])

  // Pause auto-play on hover/focus
  const pauseAutoPlay = () => setIsAutoPlaying(false)
  const resumeAutoPlay = () => setIsAutoPlaying(true)

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    pauseAutoPlay()
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left, go to next slide
      nextSlide()
    }
    
    if (touchStart - touchEnd < -50) {
      // Swipe right, go to previous slide
      prevSlide()
    }
    
    resumeAutoPlay()
  }

  // Get the current slide data
  const activeSlide = slides[currentSlide]

  return (
    <section 
      ref={sliderRef}
      className="relative overflow-hidden bg-white"
      style={{ height: windowHeight }}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
      onFocus={pauseAutoPlay}
      onBlur={resumeAutoPlay}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Creative collective highlights carousel"
    >
      <div className="sr-only">
        <h2>CHUNG Creative Collective</h2>
        <p>Explore our creative spaces, community, and activities</p>
      </div>
      {/* Slides */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
            aria-hidden={index !== currentSlide}
          >
            {/* Image Background */}
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
                loading={index === 0 ? "eager" : "lazy"}
                quality={85}
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            
            {/* Content Overlay with more artistic styling */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-2xl">
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-sm font-medium tracking-widest text-chung-yellow uppercase mb-2 sm:mb-3"
                  >
                    {slide.subtitle}
                  </motion.h2>
                  <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-lg"
                  >
                    {slide.description}
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-wrap gap-3 sm:gap-4"
                  >
                    <Button asChild className="bg-chung-yellow hover:bg-chung-yellow/90 text-black px-5 py-2.5 sm:py-6 rounded-full transition-all duration-300 font-medium text-sm">
                      <Link href="/#spaces">Explore Spaces</Link>
                    </Button>
                    <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-5 py-2.5 sm:py-6 rounded-full transition-all duration-300 font-medium text-sm">
                      <Link href="/about">About Us</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows - Larger touch targets on mobile */}
      <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 flex space-x-2 z-10">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}

