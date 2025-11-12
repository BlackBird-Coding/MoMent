"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";

export function CommunityPreview() {
  const posts = [
    {
      id: "1",
      category: "Nutrition",
      time: "15 min ago",
      title: "24-week pregnancy meal ideas",
      preview: "Share easy, high-protein menus…",
    },
    {
      id: "2",
      category: "Baby care",
      time: "1 hr ago",
      title: "Bedtime routine that works",
      preview: "Try white noise + consistent cues…",
    },
  ];

  return (
    <Card className="p-4" aria-labelledby="community-preview-heading">
      <div className="flex items-center justify-between mb-3">
        <h3 id="community-preview-heading" className="font-semibold">
          From the community
        </h3>
        <Link href="/community" className="text-sm text-violet-700 dark:text-violet-400 font-medium">
          See more
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {posts.map((post) => (
          <article key={post.id} className="border rounded-xl p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">
                {post.category}
              </span>
              <span>{post.time}</span>
            </div>
            <h4 className="font-semibold">{post.title}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">{post.preview}</p>
          </article>
        ))}
      </div>
    </Card>
  );
}
