import { Compass, Users, Home, MessageCircle, User } from 'lucide-react';

interface NavBarProps {
  activeIndex: number;
  onTabChange: (index: number) => void;
}

export function NavBar({ activeIndex, onTabChange }: NavBarProps) {
  const tabs = [
    { icon: Compass, label: 'Discover' },
    { icon: Users, label: 'Community' },
    { icon: Home, label: 'Care' },
    { icon: MessageCircle, label: 'Copilot' },
    { icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-blur bg-white/90 border-t border-[#E9ECF2] safe-area-inset-bottom z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeIndex === index;
          return (
            <button
              key={index}
              onClick={() => onTabChange(index)}
              className="flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[60px] transition-all duration-200 tap-highlight active:scale-95"
            >
              <Icon
                size={24}
                className={`transition-colors ${isActive ? 'text-[#6BBEFF]' : 'text-[#B8BDC7]'}`}
                strokeWidth={1.5}
              />
              <span
                className={`text-[10px] transition-colors ${
                  isActive ? 'text-[#6BBEFF]' : 'text-[#B8BDC7]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
