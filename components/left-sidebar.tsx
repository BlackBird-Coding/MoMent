"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function LeftSidebar() {
  return (
    <aside className="hidden md:block md:col-span-3 lg:col-span-2 py-6">
      <div className="sticky top-[68px] space-y-4">
        {/* Family Switcher */}
        <Card className="p-4" aria-labelledby="family-card-heading">
          <p id="family-card-heading" className="text-xs text-muted-foreground mb-1">
            Profile
          </p>
          <div className="flex items-center gap-3">
            <Image
              src="https://thumbs.dreamstime.com/b/young-mother-taking-care-her-little-baby-girl-mom-daughter-outdoors-loving-family-s-day-concept-beautiful-attractive-mum-166987760.jpg?w=576"
              alt="Family avatar"
              width={40}
              height={40}
              className="rounded-full object-cover border border-border"
            />
            <div>
              <div className="font-semibold">Mom May</div>
              <div className="text-xs text-muted-foreground">Baby Pete (4 mo)</div>
            </div>
          </div>
          <Button variant="outline" className="mt-3 w-full">
            Switch family member
          </Button>
        </Card>

        {/* Quick Actions */}
        <Card className="p-4">
          <p className="font-semibold mb-2">Quick actions</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Button variant="outline" asChild>
              <Link href="#reminders">Add reminder</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#appointments">Book visit</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#vaccines">Log vaccine</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/community">Write a post</Link>
            </Button>
          </div>
        </Card>
      </div>
    </aside>
  );
}
