"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tight text-black">
          Article Vault
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
            Home
          </Link>

          {!loading && (
            <>
              {user ? (
                // Logged-in links
                <>
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/my-articles"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    My Articles
                  </Link>

                  <Link
                    href="/articles/new"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Write
                  </Link>

                  <button
                    onClick={logout}
                    className="rounded-md bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
                  >
                    Logout ({user.username})
                  </button>
                </>
              ) : (
                // Logged-out links
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
