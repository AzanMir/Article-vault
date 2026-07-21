import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ArticleCard({
  id,
  title,
  author,
  excerpt,
  showActions = false,
  onEdit,
  onDelete,
  deleting = false,
}) {
  return (
    <Card className="flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="flex-1 p-6">
        <h2 className="text-2xl font-bold">{title}</h2>

        <p className="mt-2 text-sm text-gray-500">By {author}</p>

        <p className="mt-4 text-gray-600">{excerpt}</p>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Link href={`/articles/${id}`} className="text-blue-600 hover:underline">
          Read More →
        </Link>

        {showActions && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
              Edit
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={onDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
