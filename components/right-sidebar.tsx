"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function RightSidebar() {
  return (
    <aside className="hidden lg:block lg:col-span-3 py-6">
      <div className="sticky top-[68px] space-y-4">
        {/* Upcoming Appointments */}
        <Card className="p-4" aria-labelledby="upcoming-heading">
          <div className="flex items-center justify-between mb-2">
            <h3 id="upcoming-heading" className="font-semibold">
              Upcoming
            </h3>
            <Link href="/appointments" className="text-sm text-violet-700 dark:text-violet-400">
              All
            </Link>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500" aria-hidden="true"></span>
              <div>
                <p className="text-sm font-medium">Ultrasound (3D)</p>
                <p className="text-xs text-muted-foreground">Oct 31, 10:30 · Samitivej Sukhumvit</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true"></span>
              <div>
                <p className="text-sm font-medium">HepB #2</p>
                <p className="text-xs text-muted-foreground">Nov 7, 09:00 · Health Center Ladprao</p>
              </div>
            </li>
          </ul>
          <Button variant="outline" className="mt-3 w-full" asChild>
            <Link href="/appointments-new">Add appointment</Link>
          </Button>
        </Card>

        {/* Benefits Summary */}
        <Card className="p-4 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white border-0">
          <h3 className="font-semibold">Suggested benefits</h3>
          <p className="text-sm text-white/90">Check eligibility and set document deadlines</p>
          <Button
            className="mt-3 w-full bg-white text-violet-700 hover:bg-white/90"
            asChild
          >
            <Link href="/benefits">Open benefits</Link>
          </Button>
        </Card>
      </div>
    </aside>
  );
}
