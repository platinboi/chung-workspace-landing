"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useMotionValueEvent, useScroll } from "framer-motion"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string
    description: string
    content?: React.ReactNode | any
  }[]
  contentClassName?: string
}) => {
  const [activeCard, setActiveCard] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  })
  const cardLength = content.length

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / (cardLength - 1))
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint)
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index
      }
      return acc
    }, 0)
    setActiveCard(closestBreakpointIndex)
  })

  const backgroundColors = ["var(--background)", "var(--primary)", "var(--secondary)", "var(--muted)"]
  const linearGradients = [
    "linear-gradient(to bottom right, var(--primary), var(--background))",
    "linear-gradient(to bottom right, var(--background), var(--primary))",
    "linear-gradient(to bottom right, var(--secondary), var(--background))",
    "linear-gradient(to bottom right, var(--background), var(--secondary))",
  ]

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0])

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length])
  }, [activeCard])

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      transition={{ duration: 0.5 }}
      className="h-[40rem] sm:h-[50rem] md:h-[60rem] overflow-y-auto flex flex-col lg:flex-row justify-start lg:justify-center relative space-y-8 lg:space-y-0 lg:space-x-8 rounded-md p-4 sm:p-6 md:p-8 lg:p-10"
      ref={ref}
    >
      <div className="w-full lg:w-1/2 lg:max-w-xl">
        {content.map((item, index) => (
          <motion.div
            key={item.title + index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: activeCard === index ? 1 : 0.5,
              y: activeCard === index ? 0 : 10,
            }}
            transition={{ duration: 0.5 }}
            className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2 sm:mb-3 md:mb-4">
              {item.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground">{item.description}</p>
          </motion.div>
        ))}
        <div className="h-20 sm:h-24 md:h-32 lg:h-40" />
      </div>
      <motion.div
        style={{ background: backgroundGradient }}
        className={cn(
          "w-full lg:w-1/2 h-64 sm:h-72 md:h-80 lg:h-96 rounded-lg bg-background sticky top-4 sm:top-6 md:top-8 lg:top-10 overflow-hidden shadow-xl",
          contentClassName,
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {content[activeCard].content ?? null}
      </motion.div>
    </motion.div>
  )
}

