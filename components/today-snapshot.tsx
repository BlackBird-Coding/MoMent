"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function TodaySnapshot() {
  return (
    <Card className="p-4" aria-labelledby="today-heading">
      <div className="flex items-center justify-between mb-3">
        <h2 id="today-heading" className="font-semibold">
          Today
        </h2>
        <Link href="/timeline" className="text-violet-700 dark:text-violet-400 text-sm font-medium">
          View timeline
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
          <p className="text-xs text-muted-foreground">Pregnancy age</p>
          <p className="text-lg font-semibold">24 weeks</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
          <p className="text-xs text-muted-foreground">Next visit</p>
          <p className="text-lg font-semibold">31 Oct</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
          <p className="text-xs text-muted-foreground">Baby vaccine</p>
          <p className="text-lg font-semibold">HepB #2</p>
        </div>
      </div>
      <div className="mt-3 flex gap-2 flex-wrap">
        <Button className="flex-1" asChild>
          <Link href="#reminders">Add reminder</Link>
        </Button>
        <Button variant="outline" className="flex-1" asChild>
          <Link href="#appointments">Book visit</Link>
        </Button>
      </div>
    </Card>
  );
}
