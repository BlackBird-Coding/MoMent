import { Activity, Syringe, Moon, Smile } from 'lucide-react';

interface TrackerTileProps {
  type: 'growth' | 'vaccine' | 'sleep' | 'dental';
  label: string;
  value: string;
  onClick?: () => void;
}

export function TrackerTile({ type, label, value, onClick }: TrackerTileProps) {
  const icons = {
    growth: Activity,
    vaccine: Syringe,
    sleep: Moon,
    dental: Smile,
  };

  const colors = {
    growth: '#6BBEFF',
    vaccine: '#E6B8FF',
    sleep: '#FFA78B',
    dental: '#6BBEFF',
  };

  const Icon = icons[type];
  const color = colors[type];

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-[#E9ECF2] shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] active:scale-95 transition-all duration-200 min-w-[100px] tap-highlight"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon size={20} style={{ color }} strokeWidth={1.5} />
      </div>
      <span className="text-xs text-[#666]">{label}</span>
      <span className="text-sm text-[#222]">{value}</span>
    </button>
  );
}
