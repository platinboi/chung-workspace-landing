"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type Tab = {
  title: string
  value: string
  content?: string | React.ReactNode | any
}

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[]
  containerClassName?: string
  activeTabClassName?: string
  tabClassName?: string
  contentClassName?: string
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // Set mounted state for client-side only features
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Go to next slide
  const goToNext = () => {
    if (isAnimating || activeIndex >= propTabs.length - 1) return
    setDirection('left')
    setIsAnimating(true)
    setActiveIndex(prev => prev + 1)
    setTimeout(() => setIsAnimating(false), 300)
  }

  // Go to previous slide
  const goToPrevious = () => {
    if (isAnimating || activeIndex <= 0) return
    setDirection('right')
    setIsAnimating(true)
    setActiveIndex(prev => prev - 1)
    setTimeout(() => setIsAnimating(false), 300)
  }

  // Change active tab directly
  const changeActiveTab = (newIndex: number) => {
    if (isAnimating || newIndex === activeIndex) return
    
    // Determine animation direction
    const newDirection = newIndex > activeIndex ? 'left' : 'right'
    setDirection(newDirection)
    
    // Start animation
    setIsAnimating(true)
    
    // Change active tab
    setActiveIndex(newIndex)
    
    // Animation complete
    setTimeout(() => setIsAnimating(false), 300)
  }

  // Touch/mouse event handlers
  const handleDragStart = (clientX: number) => {
    if (isAnimating) return
    setDragStart(clientX)
    setIsDragging(true)
    setDragOffset(0)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging || isAnimating) return
    
    // Calculate drag distance
    const offset = clientX - dragStart
    setDragOffset(offset)
    
    // Set direction based on drag
    if (Math.abs(offset) > 10) {
      setDirection(offset > 0 ? 'right' : 'left')
    } else {
      setDirection(null)
    }
  }

  const handleDragEnd = () => {
    if (!isDragging || isAnimating) return
    
    // Threshold for swipe (20% of screen width)
    const threshold = window.innerWidth * 0.2
    
    // If dragged beyond threshold, change tab
    if (Math.abs(dragOffset) >= threshold) {
      if (direction === 'left' && activeIndex < propTabs.length - 1) {
        goToNext()
      } else if (direction === 'right' && activeIndex > 0) {
        goToPrevious()
      }
    }
    
    // Reset drag state
    setIsDragging(false)
    setDragOffset(0)
  }

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    handleDragEnd()
  }

  // Mouse event handlers (for desktop testing)
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleDragMove(e.clientX)
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      handleDragEnd()
    }
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd()
    }
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious()
    } else if (e.key === 'ArrowRight') {
      goToNext()
    }
  }

  // Scroll active tab into view
  useEffect(() => {
    if (isMounted && tabsRef.current) {
      const activeTabElement = tabsRef.current.querySelector('[aria-selected="true"]')
      if (activeTabElement) {
        const tabsContainer = tabsRef.current
        const containerRect = tabsContainer.getBoundingClientRect()
        const activeTabRect = activeTabElement.getBoundingClientRect()
        
        // Check if the active tab is fully visible
        if (
          activeTabRect.left < containerRect.left + 20 || 
          activeTabRect.right > containerRect.right - 20
        ) {
          // Center the active tab
          const scrollPosition = activeTabRect.left - containerRect.left - (containerRect.width / 2) + (activeTabRect.width / 2) + tabsContainer.scrollLeft
          
          tabsContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
          })
        }
      }
    }
  }, [activeIndex, isMounted])

  return (
    <div 
      className="w-full"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Tabs navigation */}
      <div className="relative pb-1">
        <div
          ref={tabsRef}
          className={cn(
            "flex flex-row items-center justify-start md:justify-center relative overflow-x-auto scrollbar-hide max-w-full w-full text-lg pb-4 gap-3 px-8 snap-x snap-mandatory",
            containerClassName,
          )}
          style={{ paddingLeft: 'max(2rem, env(safe-area-inset-left))', paddingRight: 'max(2rem, env(safe-area-inset-right))' }}
        >
          {propTabs.map((tab, idx) => (
            <button
              key={tab.title}
              onClick={() => changeActiveTab(idx)}
              className={cn(
                "relative px-5 py-3 rounded-full text-sm sm:text-base font-medium transition-colors whitespace-nowrap flex-shrink-0 snap-center touch-manipulation",
                activeIndex === idx 
                  ? "text-black dark:text-black" 
                  : "bg-black text-white dark:bg-black hover:bg-black/90",
                tabClassName
              )}
              aria-selected={activeIndex === idx}
              disabled={isAnimating}
              aria-controls={`tab-panel-${tab.value}`}
              id={`tab-${tab.value}`}
              role="tab"
            >
              {activeIndex === idx && (
                <motion.div
                  layoutId="activeTabIndicator"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  className={cn("absolute inset-0 bg-chung-yellow rounded-full shadow-md", activeTabClassName)}
                />
              )}

              <span className="relative block">{tab.title}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Content area with slideshow */}
      <div 
        ref={contentRef}
        className="relative w-full overflow-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={`tab-${activeIndex}`}
            id={`tab-panel-${propTabs[activeIndex].value}`}
            role="tabpanel"
            aria-labelledby={`tab-${propTabs[activeIndex].value}`}
            className="w-full pt-4 sm:pt-6 min-h-[350px] sm:min-h-[450px] relative"
            initial={{ opacity: 0, x: direction === 'left' ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'left' ? -100 : 100 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.2 }
            }}
          >
            {/* Active card with swipe animation */}
            <motion.div
              className={cn(
                "w-full relative overflow-hidden rounded-lg shadow-lg bg-chung-yellow",
                contentClassName
              )}
              style={{
                x: isDragging ? dragOffset * 0.5 : 0, // Dampen drag movement to 50%
                rotate: isDragging ? (dragOffset * 0.005) : 0, // Very subtle rotation
                transition: !isDragging ? 'transform 0.3s ease-out' : undefined
              }}
            >
              <div className="p-4 sm:p-5 md:p-6">
                {propTabs[activeIndex].content}
              </div>
            </motion.div>
            
            {/* Next card in stack (visible in background) */}
            {activeIndex < propTabs.length - 1 && (
              <div
                className={cn(
                  "w-full absolute top-0 left-0 overflow-hidden rounded-lg shadow-md bg-chung-yellow opacity-50 scale-[0.97] translate-y-3 z-[-1]",
                  contentClassName
                )}
              >
                <div className="p-4 sm:p-5 md:p-6">
                  {propTabs[activeIndex + 1].content}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

