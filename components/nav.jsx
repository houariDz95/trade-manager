// components/Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
 
export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <nav className="bg-gray-950 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-yellow-400">
            TradeTrack
          </Link>

          {/* Links */}
          <div className="flex gap-6">
            <Link href="/" className="hover:text-yellow-400 transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-yellow-400 transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-yellow-400 transition">
              Contact
            </Link>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button> 
        </div>
      </div>
    </nav>
  );
}
