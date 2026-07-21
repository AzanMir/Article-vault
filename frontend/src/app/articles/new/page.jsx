"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import ArticleForm from "@/components/articles/ArticleForm";

export default function NewArticlePage() {
  const { user, loading } = useAuth();
  const router             = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <ArticleForm />
    </div>
  );
}
