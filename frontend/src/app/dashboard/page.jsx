import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Welcome back! Manage your articles from here.
          </p>
        </div>

        <Link href="/articles/new">
          <Button>Create Article</Button>
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">
              Articles Published
            </h2>

            <p className="mt-4 text-4xl font-bold">
              12
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">
              Drafts
            </h2>

            <p className="mt-4 text-4xl font-bold">
              3
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">
              Total Views
            </h2>

            <p className="mt-4 text-4xl font-bold">
              4,281
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}