"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { getMyArticles, deleteArticle } from "@/services/api";
import ArticleCard from "@/components/articles/ArticleCard";

export default function MyArticlesPage() {
  const { user, loading } = useAuth();
  const router             = useRouter();

  const [articles, setArticles]   = useState([]);
  const [fetching, setFetching]   = useState(true);
  const [deleting, setDeleting]   = useState(null); // id being deleted

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  // Fetch articles
  useEffect(() => {
    if (!user) return;
    getMyArticles()
      .then((res) => setArticles(res.data.articles ?? []))
      .catch(() => toast.error("Failed to load articles"))
      .finally(() => setFetching(false));
  }, [user]);

  async function handleDelete(id) {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await deleteArticle(id);
      setArticles((prev) => prev.filter((a) => a._id !== id));
      toast.success("Article deleted");
    } catch {
      toast.error("Failed to delete article");
    } finally {
      setDeleting(null);
    }
  }

  if (loading || !user) return null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">My Articles</h1>
        <Link
          href="/articles/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
        >
          Write New
        </Link>
      </div>

      {fetching ? (
        <p className="text-gray-500">Loading…</p>
      ) : articles.length === 0 ? (
        <p className="text-gray-500">
          You haven&apos;t written any articles yet.{" "}
          <Link href="/articles/new" className="text-blue-600 hover:underline">
            Write your first one!
          </Link>
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article._id}
              id={article._id}
              title={article.title}
              author={article.author?.username ?? user.username}
              excerpt={article.content.slice(0, 120) + "…"}
              showActions
              onEdit={() => router.push(`/articles/${article._id}/edit`)}
              onDelete={() => handleDelete(article._id)}
              deleting={deleting === article._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
