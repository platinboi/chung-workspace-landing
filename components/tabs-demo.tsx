"use client"

import Image from "next/image"
import { Tabs } from "@/components/ui/tabs"
import { Check, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function TabsDemo() {
  const isMobile = useIsMobile()
  
  // Tab data for different creative spaces
  const tabData = [
    {
      title: "Art Studios",
      value: "studios",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Image Section */}
          <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-100 shadow-sm bg-white">
            <Image
              src="/placeholder.jpg"
              alt="CHUNG art studios with natural light and creative workspace"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          
          {/* Content Section */}
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-black">Art Studios</h3>
              <p className="text-black mb-3 sm:mb-4 text-sm sm:text-base">
                Our light-filled art studios provide the perfect environment for creative work and artistic exploration. 
                Each space is designed with artists in mind, featuring ample natural light, flexible work areas, and easy 
                access to shared resources.
              </p>
              
              <div className="mb-3 sm:mb-4">
                <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-black flex items-center">
                  <span className="mr-2">Features</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 sm:gap-y-2 gap-x-4">
                  {[
                    "Natural north-facing light",
                    "Flexible work surfaces",
                    "Utility sinks in select studios",
                    "24-hour access for members",
                    "Climate-controlled environment",
                    "Storage space for materials"
                  ].map((amenity, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-black mr-2 shrink-0 mt-0.5" />
                      <span className="text-black text-sm">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-black/10 rounded-lg border-t border-black/20">
              <p className="font-medium mb-2 sm:mb-3 text-black text-sm">Starting from ₫500,000/week</p>
              <Link 
                href="/studios"
                className="inline-flex items-center justify-center w-full gap-2 rounded-full bg-black px-4 py-2.5 sm:py-3 text-sm font-medium text-white hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-colors shadow-sm"
              >
                <Calendar className="h-4 w-4" />
                Reserve Studio
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Gallery Space",
      value: "gallery",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Image Section */}
          <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-100 shadow-sm bg-white">
            <Image
              src="/placeholder.jpg"
              alt="CHUNG gallery space showing exhibition setup with artworks displayed"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          {/* Content Section */}
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-black">Gallery Space</h3>
              <p className="text-black mb-4 text-sm sm:text-base">
                Our versatile gallery space offers the perfect backdrop for exhibitions, installations, and cultural events. 
                The minimalist design allows artists to transform the space according to their vision and creative needs.
              </p>
              
              <div className="mb-4">
                <h4 className="font-bold text-base sm:text-lg mb-3 text-black flex items-center">
                  <span className="mr-2">Features</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                  {[
                    "Flexible lighting system",
                    "Modular wall configurations",
                    "Professional hanging system",
                    "Sound system available",
                    "Opening reception support",
                    "Promotion on our channels"
                  ].map((amenity, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-black mr-2 shrink-0 mt-0.5" />
                      <span className="text-black text-sm sm:text-base">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-black/10 rounded-lg border-t border-black/20">
              <p className="font-medium mb-3 text-black text-sm sm:text-base">Starting from ₫2,000,000/week</p>
              <Link 
                href="/gallery"
                className="inline-flex items-center justify-center w-full sm:w-auto gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-colors shadow-sm"
              >
                <Calendar className="h-4 w-4" />
                Book Gallery
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Workshop Space",
      value: "workshop",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Image Section */}
          <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-100 shadow-sm bg-white">
            <Image
              src="/placeholder.jpg"
              alt="CHUNG workshop space with creative materials and collaborative setup"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          {/* Content Section */}
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-black">Workshop Space</h3>
              <p className="text-black mb-4 text-sm sm:text-base">
                Our workshop space is designed for hands-on learning and collaborative creation. Whether you're teaching 
                screen printing, hosting a creative writing session, or conducting a design workshop, our versatile space 
                adapts to your needs.
              </p>
              
              <div className="mb-4">
                <h4 className="font-bold text-base sm:text-lg mb-3 text-black flex items-center">
                  <span className="mr-2">Features</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                  {[
                    "Flexible table arrangements",
                    "Projector and screen",
                    "Whiteboard and materials",
                    "Sound system",
                    "Basic tools available",
                    "Cleanup services"
                  ].map((amenity, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-black mr-2 shrink-0 mt-0.5" />
                      <span className="text-black text-sm sm:text-base">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-black/10 rounded-lg border-t border-black/20">
              <p className="font-medium mb-3 text-black text-sm sm:text-base">₫500,000 half-day / ₫800,000 full-day</p>
              <Link 
                href="/workshop"
                className="inline-flex items-center justify-center w-full sm:w-auto gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-colors shadow-sm"
              >
                <Calendar className="h-4 w-4" />
                Book Workshop
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Café & Library",
      value: "cafe",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Image Section */}
          <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-100 shadow-sm bg-white">
            <Image
              src="/placeholder.jpg"
              alt="CHUNG café and library space with comfortable seating and book collection"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          {/* Content Section */}
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-black">Café & Library</h3>
              <p className="text-black mb-4 text-sm sm:text-base">
                Our café and library provide a relaxed space for casual meetings, reading, or simply enjoying a locally-sourced coffee. 
                Browse our curated collection of art books, magazines, and literature while connecting with fellow creatives.
              </p>
              
              <div className="mb-4">
                <h4 className="font-bold text-base sm:text-lg mb-3 text-black flex items-center">
                  <span className="mr-2">Features</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                  {[
                    "Vietnamese specialty coffee",
                    "Curated art book collection",
                    "Free WiFi",
                    "Comfortable lounge seating",
                    "Local pastries and snacks",
                    "Monthly book club meetings"
                  ].map((amenity, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-black mr-2 shrink-0 mt-0.5" />
                      <span className="text-black text-sm sm:text-base">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-black/10 rounded-lg border-t border-black/20">
              <p className="font-medium mb-3 text-black text-sm sm:text-base">Open to all visitors</p>
              <Link 
                href="/cafe"
                className="inline-flex items-center justify-center w-full sm:w-auto gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-colors shadow-sm"
              >
                View Menu
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="relative">
      <Tabs 
        tabs={tabData}
        containerClassName="mb-4 sm:mb-6"
        tabClassName="rounded-full font-medium"
        activeTabClassName="bg-chung-yellow text-black dark:text-black shadow-md"
        contentClassName="bg-chung-yellow dark:bg-chung-yellow p-0 rounded-lg shadow-md"
      />
    </div>
  )
}

