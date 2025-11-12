import { useState } from 'react';
import { NavBar } from './components/NavBar';
import { DiscoverScreen } from './components/screens/DiscoverScreen';
import { CommunityScreen } from './components/screens/CommunityScreen';
import { CareScreen } from './components/screens/CareScreen';
import { CopilotScreen } from './components/screens/CopilotScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  const screens = [
    <DiscoverScreen />,
    <CommunityScreen />,
    <CareScreen />,
    <CopilotScreen />,
    <ProfileScreen />,
  ];

  return (
    <div className="h-screen w-full bg-white overflow-hidden flex flex-col max-w-md mx-auto">
      {/* Main content area */}
      <div className="flex-1 overflow-hidden relative">
        {screens[activeTab]}
      </div>

      {/* Bottom navigation */}
      <NavBar activeIndex={activeTab} onTabChange={setActiveTab} />

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}
