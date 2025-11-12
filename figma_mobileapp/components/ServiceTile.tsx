import { LucideIcon } from 'lucide-react';

interface ServiceTileProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export function ServiceTile({ icon: Icon, label, onClick }: ServiceTileProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-[#F7FBFF] to-white rounded-2xl border border-[#E9ECF2] shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] active:scale-95 transition-all duration-200 min-w-[80px] tap-highlight"
    >
      <div className="w-12 h-12 bg-[#6BBEFF]/10 rounded-xl flex items-center justify-center">
        <Icon className="text-[#6BBEFF]" size={24} strokeWidth={1.5} />
      </div>
      <span className="text-xs text-center text-gray-700">{label}</span>
    </button>
  );
}
