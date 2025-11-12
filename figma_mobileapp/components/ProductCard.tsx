import { CheckCircle2, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  badge?: 'verified' | 'clean' | 'sold';
  onClick?: () => void;
}

export function ProductCard({ image, name, price, badge, onClick }: ProductCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-all duration-200 overflow-hidden w-full tap-highlight"
    >
      <div className="relative aspect-square bg-gray-100">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {badge && (
          <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
            {badge === 'verified' && (
              <>
                <CheckCircle2 size={12} className="text-[#6BBEFF]" />
                <span className="text-[10px]">Verified</span>
              </>
            )}
            {badge === 'clean' && (
              <>
                <Sparkles size={12} className="text-[#E6B8FF]" />
                <span className="text-[10px]">Clean</span>
              </>
            )}
            {badge === 'sold' && (
              <span className="text-[10px] text-gray-500">Sold</span>
            )}
          </div>
        )}
      </div>
      <div className="p-3 text-left">
        <h4 className="text-sm text-gray-800 line-clamp-2 mb-1">{name}</h4>
        <p className="text-[#6BBEFF]">{price}</p>
      </div>
    </button>
  );
}
