import Link from "next/link";
import ArticleCard from "@/components/articles/ArticleCard";
import HeroButtons from "@/components/HeroButtons";

async function fetchArticles() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.articles ?? [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const articles = await fetchArticles();

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

        <HeroButtons />
      </section>

      {/* Latest Articles */}
      <section id="articles" className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-8 text-3xl font-bold">Latest Articles</h2>

        {articles.length === 0 ? (
          <p className="text-gray-500">
            No articles yet.{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Be the first to write one!
            </Link>
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard
                key={article._id}
                id={article._id}
                title={article.title}
                author={article.author?.username ?? "Unknown"}
                excerpt={article.content.slice(0, 120) + "…"}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
