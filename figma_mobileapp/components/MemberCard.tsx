import { User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MemberCardProps {
  name: string;
  relation: string;
  avatar?: string;
  connected?: boolean;
  onClick?: () => void;
}

export function MemberCard({ name, relation, avatar, connected = true, onClick }: MemberCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-[#E9ECF2] shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] active:scale-95 transition-all duration-200 tap-highlight"
    >
      <div className="relative">
        {avatar ? (
          <ImageWithFallback
            src={avatar}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-[#6BBEFF]/10 flex items-center justify-center">
            <User size={28} className="text-[#6BBEFF]" />
          </div>
        )}
        <div
          className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
            connected ? 'bg-green-400' : 'bg-gray-300'
          }`}
        />
      </div>
      <div className="text-center">
        <p className="text-sm text-[#222]">{name}</p>
        <p className="text-xs text-[#666]">{relation}</p>
      </div>
    </button>
  );
}
