"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function BenefitsCTA() {
  return (
    <Card className="p-4 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white border-0" aria-labelledby="benefits-heading">
      <h3 id="benefits-heading" className="font-semibold">
        Benefits you may be eligible for
      </h3>
      <p className="text-sm text-white/90">Newborn allowance + nearby antenatal clinics</p>
      <div className="mt-3 flex gap-2">
        <Button className="flex-1 bg-white text-violet-700 hover:bg-white/90" asChild>
          <Link href="/benefits">View benefits</Link>
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20"
          asChild
        >
          <Link href="/insurance">View insurance</Link>
        </Button>
      </div>
    </Card>
  );
}
