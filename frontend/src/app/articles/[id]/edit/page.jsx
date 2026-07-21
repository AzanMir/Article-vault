"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { getArticleById } from "@/services/api";
import ArticleForm from "@/components/articles/ArticleForm";

export default function EditArticlePage() {
  const { id }             = useParams();
  const { user, loading }  = useAuth();
  const router             = useRouter();

  const [article, setArticle]   = useState(null);
  const [fetching, setFetching] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  // Fetch article and verify ownership
  useEffect(() => {
    if (!user || !id) return;
    getArticleById(id)
      .then((res) => {
        const a = res.data.article;
        // Only the author can edit
        if (a.author._id !== user.id) {
          toast.error("You are not authorized to edit this article");
          router.push("/my-articles");
          return;
        }
        setArticle(a);
      })
      .catch(() => {
        toast.error("Article not found");
        router.push("/my-articles");
      })
      .finally(() => setFetching(false));
  }, [user, id, router]);

  if (loading || !user || fetching) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {article && <ArticleForm existing={article} />}
    </div>
  );
}
