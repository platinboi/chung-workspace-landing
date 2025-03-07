"use client"
import { StickyScroll } from "./ui/sticky-scroll-reveal"
import Image from "next/image"

const content = [
  {
    title: "Coworking Space",
    description:
      "Join our vibrant community of creators and innovators. Our open-plan workspace is designed to foster collaboration, networking, and the free flow of ideas.",
    content: (
      <div className="h-full w-full flex items-center justify-center overflow-hidden rounded-lg">
        <Image
          src="/placeholder.svg?height=400&width=600&text=Coworking+Space"
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          alt="Coworking Space"
        />
      </div>
    ),
  },
  {
    title: "Creative Studio",
    description:
      "A dedicated space for artists, designers, and makers to bring their ideas to life. Our studio is equipped with essential tools and resources for creative work.",
    content: (
      <div className="h-full w-full flex items-center justify-center overflow-hidden rounded-lg">
        <Image
          src="/placeholder.svg?height=400&width=600&text=Creative+Studio"
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          alt="Creative Studio"
        />
      </div>
    ),
  },
  {
    title: "Relaxation Areas",
    description:
      "Balance work with wellness in our thoughtfully designed relaxation spaces. Find your perfect spot to recharge, read, or have casual meetings in a laid-back atmosphere.",
    content: (
      <div className="h-full w-full flex items-center justify-center overflow-hidden rounded-lg">
        <Image
          src="/placeholder.svg?height=400&width=600&text=Relaxation+Areas"
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          alt="Relaxation Areas"
        />
      </div>
    ),
  },
  {
    title: "Mini Mart",
    description:
      "Stay fueled and focused with our convenient mini mart. Stocked with snacks, drinks, and essential supplies, you'll have everything you need within reach.",
    content: (
      <div className="h-full w-full flex items-center justify-center overflow-hidden rounded-lg">
        <Image
          src="/placeholder.svg?height=400&width=600&text=Mini+Mart"
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          alt="Mini Mart"
        />
      </div>
    ),
  },
]

export function StickyScrollRevealDemo() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-900">Explore Our Spaces</h2>
        <StickyScroll content={content} />
      </div>
    </section>
  )
}

