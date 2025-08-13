// components/Navbar.tsx
"use client";
import Link from "next/link";
 
export default function Navbar() {


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
          <Link
            href="/trade-manager"
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Start Trading
          </Link>
        </div>
      </div>
    </nav>
  );
}
