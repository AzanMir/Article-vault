const articles = [
  {
    id: "1",
    title: "Getting Started with JWT Authentication",
    author: "John Doe",
    date: "July 21, 2026",
    readTime: "5 min read",
    content:
      "JSON Web Tokens (JWT) are a compact and secure way to transmit information between parties. They are commonly used for authentication in modern web applications...",
  },
  {
    id: "2",
    title: "Understanding MongoDB Populate()",
    author: "Jane Smith",
    date: "July 20, 2026",
    readTime: "6 min read",
    content:
      "The populate() method lets you replace referenced ObjectIds with actual documents. This makes it easy to display related data such as an author's username...",
  },
  {
    id: "3",
    title: "Building REST APIs with Express",
    author: "Alex Brown",
    date: "July 18, 2026",
    readTime: "8 min read",
    content:
      "Express is one of the most popular frameworks for building REST APIs in Node.js. It provides routing, middleware, and many other features...",
  },
];

export default async function ArticlePage({ params }) {
  const { id } = await params;

  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-3xl font-bold">Article Not Found</h1>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-5xl font-bold">{article.title}</h1>

      <div className="mt-4 flex gap-4 text-gray-500">
        <span>{article.author}</span>
        <span>•</span>
        <span>{article.date}</span>
        <span>•</span>
        <span>{article.readTime}</span>
      </div>

      <div className="mt-10 space-y-6 text-lg leading-8 text-gray-700">
        <p>{article.content}</p>

        <p>
          This page is currently using mock data. Once our backend is
          complete, the article will be fetched from MongoDB using its ID.
        </p>
      </div>
    </article>
  );
}