"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ArticleForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(formData);

    toast.success("Article will be published once the backend is connected.");

    setFormData({
      title: "",
      content: "",
    });
  }

  return (
    <Card className="mx-auto max-w-3xl shadow-md">
      <CardHeader>
        <CardTitle className="text-3xl">
          Create New Article
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
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>

            <Textarea
              id="content"
              name="content"
              rows={12}
              placeholder="Write your article here..."
              value={formData.content}
              onChange={handleChange}
            />
          </div>

          <Button type="submit">
            Publish Article
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}