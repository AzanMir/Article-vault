import Link from "next/link";
import ArticleCard from "@/components/articles/ArticleCard";

const articles = [
  {
    id: 1,
    title: "Getting Started with JWT Authentication",
    author: "John Doe",
    excerpt:
      "Learn how JWT authentication works in modern web applications.",
  },
  {
    id: 2,
    title: "Understanding MongoDB Populate()",
    author: "Jane Smith",
    excerpt:
      "A beginner-friendly guide to MongoDB relationships using populate().",
  },
  {
    id: 3,
    title: "Building REST APIs with Express",
    author: "Alex Brown",
    excerpt:
      "Create scalable REST APIs using Node.js, Express, and MongoDB.",
  },
];
export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Welcome to Article Vault
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Read, write, and share developer articles with the community.
          Learn modern web development one article at a time.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Explore Articles
          </Link>

          <Link
            href="/register"
            className="rounded-md border px-6 py-3 font-medium hover:bg-gray-100"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-8 text-3xl font-bold">
          Latest Articles
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              {...article}
            />
          ))}
        </div>
      </section>
    </>
  );
}