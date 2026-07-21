import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-black"
        >
          Article Vault
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>

          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Articles
          </Link>

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
        </div>
      </div>
    </nav>
  );
}