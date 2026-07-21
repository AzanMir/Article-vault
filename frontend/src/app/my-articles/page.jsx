import ArticleCard from "@/components/articles/ArticleCard";

const myArticles = [
  {
    id: 1,
    title: "JWT Authentication",
    author: "You",
    excerpt: "Understanding JWT authentication with Express."
  },
  {
    id: 2,
    title: "MongoDB Populate",
    author: "You",
    excerpt: "Learn how populate() works with Mongoose."
  },
];

export default function MyArticlesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      <h1 className="mb-8 text-4xl font-bold">
        My Articles
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {myArticles.map((article) => (
          <ArticleCard
            key={article.id}
            {...article}
          />
        ))}
      </div>

    </div>
  );
}