"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getMyArticles } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router             = useRouter();

  const [articles, setArticles]     = useState([]);
  const [fetching, setFetching]     = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Fetch user's articles for the count
  useEffect(() => {
    if (!user) return;
    getMyArticles()
      .then((res) => setArticles(res.data.articles ?? []))
      .catch(() => setArticles([]))
      .finally(() => setFetching(false));
  }, [user]);

  if (loading || !user) return null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {user.username}! Manage your articles from here.
          </p>
        </div>

        <Link href="/articles/new">
          <Button>Create Article</Button>
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Articles Published</h2>
            <p className="mt-4 text-4xl font-bold">
              {fetching ? "…" : articles.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Account</h2>
            <p className="mt-4 text-lg font-medium text-gray-700">
              {user.email}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/articles/new">
                <Button size="sm" className="w-full">
                  Write New Article
                </Button>
              </Link>
              <Link href="/my-articles">
                <Button size="sm" variant="outline" className="w-full">
                  View My Articles
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
