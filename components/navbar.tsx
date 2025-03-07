"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Menu items with subitems
const navItems = [
  {
    name: "About Us",
    href: "/about",
    subitems: ["Our Story", "The Collective", "Creative Vision", "Philosophy"],
  },
  {
    name: "Creative Spaces",
    href: "/#spaces",
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
    href: "/projects",
    subitems: ["Current", "Upcoming", "Archive", "Collaborations"],
  },
  {
    name: "Visit Us",
    href: "/contact",
    subitems: ["Our Location", "Contact", "Drop By"],
  },
  { name: "Gallery", href: "/gallery" },
  { name: "Shop", href: "/shop" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Track scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
      setExpandedItem(null);
    }
  }, [isMobile, isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Toggle subitem expansion on mobile
  const toggleExpanded = (name: string) => {
    setExpandedItem(expandedItem === name ? null : name);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-chung-yellow shadow-sm py-3" : "bg-chung-yellow py-4"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo with Mascot */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/mascot/mascot_outline.png"
              alt="CHUNG Mascot"
              width={40}
              height={40}
              className="w-10 h-10"
              priority
            />
            <span className="ml-2 text-xl font-bold text-black tracking-wide">
              CHUNG
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href || "#"}
                  className="text-sm font-medium text-black hover:text-black/70 flex items-center space-x-1 py-2"
                >
                  <span>{item.name}</span>
                  {item.subitems && <ChevronDown className="h-4 w-4 opacity-70" />}
                </Link>
                
                {/* Dropdown for items with subitems */}
                {item.subitems && (
                  <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg overflow-hidden invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-50">
                    <div className="py-2">
                      {item.subitems.map((subitem) => (
                        <Link
                          key={subitem}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {subitem}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <Link 
              href="/contact" 
              className="bg-black text-white text-sm px-5 py-2 rounded-full hover:bg-black/90 transition-all duration-300 font-medium"
            >
              Join Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-black/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-black" />
            ) : (
              <Menu className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Subitems */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden fixed top-[60px] left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col p-4 space-y-2">
              <div className="py-2 border-b border-gray-100">
                <Link
                  href="/"
                  className="text-gray-800 hover:text-black py-3 px-4 text-lg font-medium block w-full rounded-lg hover:bg-gray-50 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </div>
              
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 last:border-0"
                >
                  {/* If item has subitems, make it expandable */}
                  {item.subitems ? (
                    <div className="mb-2">
                      <button
                        onClick={() => toggleExpanded(item.name)}
                        className="flex justify-between items-center w-full py-3 px-4 text-lg font-medium text-gray-800 hover:text-black rounded-lg hover:bg-gray-50 transition-all"
                      >
                        <span>{item.name}</span>
                        <ChevronDown 
                          className={`h-5 w-5 transition-transform ${
                            expandedItem === item.name ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      
                      {/* Subitems */}
                      <AnimatePresence>
                        {expandedItem === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4"
                          >
                            <div className="border-l-2 border-gray-200 pl-4 py-2 space-y-1">
                              {item.subitems.map((subitem) => (
                                <Link
                                  key={subitem}
                                  href="#"
                                  className="block py-2 px-3 text-sm text-gray-600 hover:text-black rounded-md hover:bg-gray-50 transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <div className="flex items-center">
                                    <ChevronRight className="h-3 w-3 mr-2 opacity-70" />
                                    <span>{subitem}</span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    // Regular link without subitems
                    <Link
                      href={item.href || "#"}
                      className="text-gray-800 hover:text-black py-3 px-4 text-lg font-medium block w-full rounded-lg hover:bg-gray-50 transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Link 
                  href="/contact" 
                  className="bg-chung-yellow text-black px-5 py-4 rounded-full hover:bg-chung-yellow/90 block text-center font-medium transition-all duration-300 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Join Us
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 