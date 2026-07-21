import Link from "next/link";

async function fetchArticle(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.article ?? null;
  } catch {
    return null;
  }
}

export default async function ArticlePage({ params }) {
  const { id }    = await params;
  const article   = await fetchArticle(id);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-3xl font-bold">Article Not Found</h1>
        <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const date = new Date(article.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-5xl font-bold">{article.title}</h1>

      <div className="mt-4 flex flex-wrap gap-3 text-gray-500">
        <span>By {article.author?.username ?? "Unknown"}</span>
        <span>•</span>
        <span>{date}</span>
      </div>

      {article.tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-10 space-y-6 text-lg leading-8 text-gray-700 whitespace-pre-wrap">
        {article.content}
      </div>

      <Link href="/" className="mt-12 inline-block text-blue-600 hover:underline">
        ← Back to Home
      </Link>
    </article>
  );
}
