"use client";

import Link from "next/link";
import { Home, Users, Sparkles, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNavigation() {
  return (
    <nav className="md:hidden sticky bottom-0 bg-background border-t" aria-label="Primary">
      <div className="max-w-md mx-auto px-2 py-2 grid grid-cols-5 text-xs">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 text-violet-700 dark:text-violet-400 font-medium"
          aria-current="page"
        >
          <Home className="w-6 h-6" />
          Home
        </Link>
        <Link
          href="/community"
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <Users className="w-6 h-6" />
          Community
        </Link>
        <Link
          href="/ai"
          className="flex flex-col items-center -mt-6"
          aria-label="Ask AI"
        >
          <span className="w-14 h-14 rounded-full bg-violet-600 text-white grid place-items-center shadow-lg">
            <Sparkles className="w-7 h-7" />
          </span>
          <span className="mt-1 text-muted-foreground">Ask AI</span>
        </Link>
        <Link
          href="/market"
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <ShoppingBag className="w-6 h-6" />
          Market
        </Link>
        <Link
          href="/profile"
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <User className="w-6 h-6" />
          Profile
        </Link>
      </div>
    </nav>
  );
}
