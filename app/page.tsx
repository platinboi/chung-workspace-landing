"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Search, Menu, X } from "lucide-react"
import { ErrorBoundary } from "react-error-boundary"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import HeroSlider from "@/components/hero-slider"
import DetailsSection from "@/components/details-section"
import { TabsDemo } from "@/components/tabs-demo"
import Footer from "@/components/footer"
import { useIsMobile } from "@/hooks/useIsMobile"
import Navbar from "@/components/navbar"
import { ArrowRight, Award, Leaf, Heart, Users, Coffee, Clock, MapPin } from "lucide-react"
import Image from "next/image"

const navItems = [
  {
    name: "About Us",
    subitems: ["Our Story", "The Collective", "Creative Vision", "Philosophy"],
  },
  {
    name: "Creative Spaces",
    subitems: [
      "Studio Spaces",
      "Collaboration Zones",
      "Exhibition Areas",
      "Workshop Space",
      "Chill-out Spots",
      "Cafe & Library",
    ],
  },
  {
    name: "Projects & Events",
    subitems: ["Current", "Upcoming", "Archive", "Collaborations"],
  },
  {
    name: "Visit Us",
    subitems: ["Our Location", "Contact", "Drop By"],
  },
  { name: "Gallery" },
  { name: "Shop" },
]

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSlider />
      
      {/* Spaces Section - Moved directly below hero */}
      <section className="pt-12 pb-20 bg-white" id="spaces">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block w-12 h-1 bg-chung-yellow mb-4"></span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Creative Spaces</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From intimate studios to vibrant collaborative zones, discover spaces 
              that inspire creativity and cultural exchange.
            </p>
          </div>
          
          <TabsDemo />
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">A Creative Hub in Hanoi's Urban Heart</h2>
              <p className="text-gray-600 mb-8">
                CHUNG is a vibrant collective of artists, designers, musicians, and creative minds. 
                Our space is where ideas flow, art comes alive, and cultural boundaries blur. Whether 
                you're looking to create, collaborate, or just soak in the creative energy, our doors 
                are open to the curious and the inspired.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Art Studios",
                  "Exhibition Space",
                  "Creative Workshops",
                  "Community Events",
                  "Local Coffee Culture",
                  "Design Library"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start border-l-2 border-chung-yellow pl-3 py-1">
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link href="/about" className="inline-flex items-center text-chung-yellow font-medium hover:underline">
                Discover our collective
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/images/about/workspace-interior.jpg"
                  alt="CHUNG creative space showing artistic interior with vibrant cultural elements"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                  priority
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-8 shadow-md border-l-4 border-chung-yellow">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
              {[
                { number: "2,500", label: "Square Meters", icon: <Leaf className="h-8 w-8 text-chung-yellow mb-2" /> },
                { number: "120+", label: "Creatives", icon: <Users className="h-8 w-8 text-chung-yellow mb-2" /> },
                { number: "45", label: "Annual Events", icon: <Coffee className="h-8 w-8 text-chung-yellow mb-2" /> },
                { number: "24/7", label: "Creative Flow", icon: <Clock className="h-8 w-8 text-chung-yellow mb-2" /> }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-4 rounded-md hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className="flex justify-center">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1 hover:text-chung-yellow transition-colors duration-300">{stat.number}</div>
                  <div className="text-gray-600 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Voices From Our Community</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our eclectic mix of artists, designers, creators, and free spirits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Linh Nguyen",
                role: "Visual Artist",
                quote: "CHUNG provides the perfect blend of creative energy and calm focus. It's become my second home and the birthplace of my best work.",
                image: "/images/testimonials/member-1.jpg"
              },
              {
                name: "Maya Thomas",
                role: "Digital Illustrator",
                quote: "As someone new to Hanoi, finding CHUNG was like finding my tribe. The community is supportive, the space is inspiring, and the coffee is incredible!",
                image: "/images/testimonials/member-2.jpg"
              },
              {
                name: "Tuan Pham",
                role: "Fashion Designer",
                quote: "The cross-pollination of ideas at CHUNG is magical. My designs have evolved in ways I never expected through collaborations born in this space.",
                image: "/images/testimonials/member-3.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={`Portrait of ${testimonial.name}, ${testimonial.role}`}
                      fill
                      className="object-cover"
                      sizes="48px"
                      loading="lazy"
                      quality={85}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Creative Community</h2>
            <p className="text-gray-600 mb-8">
              Stop by for a coffee, join a workshop, or become part of our collective. 
              There's always something happening at CHUNG.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-chung-yellow hover:bg-chung-yellow/90 text-black" asChild>
                <Link href="/membership">
                  Become a Member
                </Link>
              </Button>
              <Button variant="outline" className="border-gray-300" asChild>
                <Link href="/contact">
                  Visit Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Location Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map Image with Interactive Link */}
            <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden shadow-md group">
              <Image
                src="/images/map/location-map.jpg"
                alt="Map showing CHUNG creative space location in the heart of Hanoi"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <a 
                  href="https://maps.google.com/?q=123+Nguyen+Hue+Boulevard+District+1+Ho+Chi+Minh+City" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-chung-yellow text-black py-2 px-4 rounded-md font-medium inline-flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-md hover:bg-chung-yellow/90"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  View on Google Maps
                </a>
              </div>
            </div>
            
            {/* Location Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Find Us</h2>
              <p className="text-gray-600 mb-8">
                Conveniently located in District 1, the heart of Ho Chi Minh City's business district, 
                CHUNG workspace is easily accessible by public transportation and surrounded by amenities.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-chung-yellow mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold">Address</h3>
                    <p className="text-gray-600">
                      123 Nguyen Hue Boulevard<br />
                      District 1, Ho Chi Minh City
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-chung-yellow mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold">Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 7:00 AM - 10:00 PM<br />
                      Weekends: 8:00 AM - 8:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  )
}

