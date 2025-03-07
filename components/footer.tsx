"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Youtube, Music } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100 text-black">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About and Logo */}
          <div>
            <div className="flex items-center mb-4">
              <Image 
                src="/images/logos/chung_logo.png" 
                alt="CHUNG Creative Collective Logo" 
                width={30} 
                height={30}
                className="w-7 h-7 mr-2"
                priority
              />
              <h2 className="text-xl font-sans font-bold tracking-wide">CHUNG</h2>
            </div>
            
            <p className="text-gray-600 text-sm mb-6">
              A creative collective and artistic hub in the heart of Hanoi, where culture, creativity, and community intersect.
            </p>
            
            <div className="flex space-x-4">
              <Link href="https://instagram.com" className="text-gray-400 hover:text-chung-yellow transition-colors duration-300" aria-label="Instagram">
                <Instagram size={18} />
              </Link>
              <Link href="https://facebook.com" className="text-gray-400 hover:text-chung-yellow transition-colors duration-300" aria-label="Facebook">
                <Facebook size={18} />
              </Link>
              <Link href="https://youtube.com" className="text-gray-400 hover:text-chung-yellow transition-colors duration-300" aria-label="YouTube">
                <Youtube size={18} />
              </Link>
              <Link href="https://soundcloud.com" className="text-gray-400 hover:text-chung-yellow transition-colors duration-300" aria-label="SoundCloud">
                <Music size={18} />
              </Link>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold mb-4 tracking-wider uppercase">Explore</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "About Us", href: "/about" },
                { name: "Spaces", href: "/spaces" },
                { name: "Projects", href: "/projects" },
                { name: "Events", href: "/events" },
                { name: "Shop", href: "/shop" },
                { name: "Join Us", href: "/join" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-600 hover:text-chung-yellow transition-colors duration-300 hover:underline hover:underline-offset-4"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Hours */}
          <div>
            <h3 className="text-sm font-bold mb-4 tracking-wider uppercase">Open Hours</h3>
            <ul className="space-y-2 text-sm">
              {[
                { day: "Tuesday - Friday", hours: "10:00 - 22:00" },
                { day: "Saturday - Sunday", hours: "12:00 - 23:00" },
                { day: "Monday", hours: "Closed (Private Events)" },
              ].map((schedule, index) => (
                <li key={index} className="text-gray-600">
                  <span className="font-medium">{schedule.day}:</span> {schedule.hours}
                </li>
              ))}
              <li className="mt-4 text-gray-600 italic">
                *Hours may vary during special events & exhibitions
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact Information */}
          <div>
            <h3 className="text-sm font-bold mb-4 tracking-wider uppercase">Find Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start text-gray-600">
                <MapPin className="w-4 h-4 text-chung-yellow mr-2 mt-0.5 shrink-0" />
                <span>
                  27 Hai Ba Trung Street<br />
                  Hoan Kiem District, Hanoi
                </span>
              </li>
              <li className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 text-chung-yellow mr-2 shrink-0" />
                <Link href="tel:+84901234567" className="hover:text-chung-yellow transition-colors duration-300">
                  +84 90 123 4567
                </Link>
              </li>
              <li className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 text-chung-yellow mr-2 shrink-0" />
                <Link href="mailto:hello@chungcollective.com" className="hover:text-chung-yellow transition-colors duration-300">
                  hello@chungcollective.com
                </Link>
              </li>
              <li className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/contact" className="text-chung-yellow hover:underline inline-flex items-center transition-all duration-300">
                  Get Directions
                  <svg className="w-3 h-3 ml-1" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom bar with copyright */}
      <div className="border-t border-gray-100 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0 text-xs text-gray-500">
            &copy; {currentYear} CHUNG Creative Collective. All rights reserved.
          </div>
          <div className="flex space-x-6 text-xs">
            <Link href="/terms" className="text-gray-500 hover:text-chung-yellow transition-colors duration-300">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-chung-yellow transition-colors duration-300">
              Privacy
            </Link>
            <Link href="/accessibility" className="text-gray-500 hover:text-chung-yellow transition-colors duration-300">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

