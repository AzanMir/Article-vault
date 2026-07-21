"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function HeroButtons() {
  const { user } = useAuth();

  return (
    <div className="mt-10 flex justify-center gap-4">
      {/* Scrolls to the articles section on the same page */}
      <a
        href="#articles"
        className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
      >
        Explore Articles
      </a>

      {/* Goes to dashboard if logged in, register if not */}
      <Link
        href={user ? "/dashboard" : "/register"}
        className="rounded-md border px-6 py-3 font-medium hover:bg-gray-100"
      >
        {user ? "Go to Dashboard" : "Get Started"}
      </Link>
    </div>
  );
}
