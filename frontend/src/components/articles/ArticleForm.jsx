"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createArticle, updateArticle } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// `existing` is passed when editing; omitted when creating
export default function ArticleForm({ existing }) {
  const router  = useRouter();
  const editing = Boolean(existing);

  const [formData, setFormData] = useState({
    title:   existing?.title   ?? "",
    content: existing?.content ?? "",
    tags:    existing?.tags?.join(", ") ?? "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Convert comma-separated tags string → trimmed array
    const payload = {
      title:   formData.title.trim(),
      content: formData.content.trim(),
      tags:    formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (editing) {
        await updateArticle(existing._id, payload);
        toast.success("Article updated!");
        router.push(`/articles/${existing._id}`);
      } else {
        const res = await createArticle(payload);
        toast.success("Article published!");
        router.push(`/articles/${res.data.article._id}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto max-w-3xl shadow-md">
      <CardHeader>
        <CardTitle className="text-3xl">
          {editing ? "Edit Article" : "Create New Article"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter article title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              rows={12}
              placeholder="Write your article here…"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              name="tags"
              placeholder="e.g. Node.js, MongoDB, React"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving…" : editing ? "Update Article" : "Publish Article"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
