"use client"

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 flex-1">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-4">
          Smart Trade Manager
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          Manage your trades smartly with low risk and consistent profits — even after multiple losses.
        </p>
        <Link
          href="/trade-manager"
          className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Start Trading
        </Link>
      </section>

      {/* Ad Section */}


      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-6 text-center text-sm">
        © {new Date().getFullYear()} TradeTrack. All rights reserved.
      </footer>
    </div>
  );
}
