"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, Users, Sparkles, ShoppingBag, User, Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function DesktopHeader() {
  return (
    <header className="hidden md:block sticky top-0 z-40 bg-background/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            width={36}
            height={36}
            className="rounded-full object-cover"
            alt="MoMent Logo"
          />
          <span className="font-semibold">MoMent</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          <Link
            href="/"
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-violet-700 dark:text-violet-400 font-semibold flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Home
          </Link>
          <Link
            href="/community"
            className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2"
          >
            <Users className="w-5 h-5" />
            Community
          </Link>
          <Link
            href="/ai"
            className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Ask AI
          </Link>
          <Link
            href="/market"
            className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Market
          </Link>
          <Link
            href="/profile"
            className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2"
          >
            <User className="w-5 h-5" />
            Profile
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <label
            className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2 text-sm w-80"
            aria-label="Global search"
          >
            <Search className="w-4 h-4 mr-2" aria-hidden="true" />
            <Input
              placeholder="Search appointments, vaccines, posts, items…"
              className="bg-transparent border-0 outline-none flex-1 h-6 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </label>
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="w-6 h-6" aria-hidden="true" />
            <span
              className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"
              aria-hidden="true"
            ></span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function MobileHeader() {
  return (
    <header className="md:hidden sticky top-0 z-40 bg-background/80 backdrop-blur border-b">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
        <Link href="/menu" className="p-2 -ml-2" aria-label="Open menu">
          <Menu className="w-6 h-6" />
        </Link>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Welcome back</p>
          <h1 className="text-base font-semibold">Mom May & Baby Pete</h1>
        </div>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </Button>
      </div>
    </header>
  );
}
