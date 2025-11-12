import { DesktopHeader, MobileHeader } from "@/components/header";
import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { TodaySnapshot } from "@/components/today-snapshot";
import { RemindersSection } from "@/components/reminders-section";
import { CommunityPreview } from "@/components/community-preview";
import { BenefitsCTA } from "@/components/benefits-cta";
import { BottomNavigation } from "@/components/bottom-navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <DesktopHeader />
      <MobileHeader />

      <div className="max-w-7xl mx-auto w-full md:px-6">
        <div className="md:grid md:grid-cols-12 md:gap-6">
          <LeftSidebar />

          <main className="md:col-span-9 lg:col-span-7 px-4 md:px-0 py-4 md:py-6 space-y-4">
            <TodaySnapshot />
            <RemindersSection />
            <CommunityPreview />
            <BenefitsCTA />
          </main>

          <RightSidebar />
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
