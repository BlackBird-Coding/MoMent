import { X, ShoppingCart, MessageCircle, CheckCircle2, Sparkles, Star } from 'lucide-react';

interface ProductDetailModalProps {
  product: {
    id: string;
    image: string;
    name: string;
    price: string;
    badge?: 'verified' | 'clean';
    description?: string;
    seller?: string;
    rating?: number;
  };
  onClose: () => void;
  onAskCopilot: () => void;
}

export function ProductDetailModal({ product, onClose, onAskCopilot }: ProductDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-auto animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E9ECF2] px-4 py-3 flex items-center justify-between z-10">
          <h3 className="text-[#222]">Product Details</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors tap-highlight"
          >
            <X size={20} className="text-[#666]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Image */}
          <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Badge */}
          <div className="flex gap-2 mb-3">
            {product.badge === 'verified' && (
              <div className="flex items-center gap-1 text-[#6BBEFF] bg-[#6BBEFF]/10 px-3 py-1 rounded-full">
                <CheckCircle2 size={14} />
                <span className="text-xs">KYC Verified Seller</span>
              </div>
            )}
            {product.badge === 'clean' && (
              <div className="flex items-center gap-1 text-[#E6B8FF] bg-[#E6B8FF]/10 px-3 py-1 rounded-full">
                <Sparkles size={14} />
                <span className="text-xs">Hygiene Certified</span>
              </div>
            )}
          </div>

          {/* Title and Price */}
          <h2 className="text-[#222] mb-2">{product.name}</h2>
          <p className="text-2xl text-[#6BBEFF] mb-4">{product.price}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className="text-yellow-400"
                  fill={star <= 4 ? '#FACC15' : 'none'}
                />
              ))}
            </div>
            <span className="text-sm text-[#666]">4.8 (127 reviews)</span>
          </div>

          {/* Seller */}
          <div className="bg-[#F7FBFF] rounded-xl p-3 mb-4">
            <p className="text-xs text-[#666] mb-1">Sold by</p>
            <p className="text-sm text-[#222]">Happy Baby Store</p>
            <p className="text-xs text-[#666]">98% positive feedback • 2.3k sales</p>
          </div>

          {/* Description */}
          <div className="mb-4">
            <h4 className="text-[#222] mb-2">Description</h4>
            <p className="text-sm text-[#666] leading-relaxed">
              Premium quality baby essentials made from 100% organic materials. Soft, gentle on
              sensitive skin, and rigorously tested for safety. Free from harmful chemicals and
              dyes. Machine washable and built to last through multiple children.
            </p>
          </div>

          {/* Features */}
          <div className="mb-4">
            <h4 className="text-[#222] mb-2">Key Features</h4>
            <ul className="space-y-2">
              {[
                '100% organic cotton',
                'Hypoallergenic & gentle',
                'GOTS certified',
                'Free shipping over ฿500',
                'Easy 30-day returns',
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#666]">
                  <CheckCircle2 size={16} className="text-[#6BBEFF] mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={onAskCopilot}
              className="w-full bg-white border-2 border-[#6BBEFF] text-[#6BBEFF] rounded-2xl p-4 flex items-center justify-center gap-2 hover:bg-[#6BBEFF]/5 transition-all duration-200 tap-highlight"
            >
              <MessageCircle size={20} />
              Ask Copilot About This Product
            </button>
            <button className="w-full bg-gradient-to-r from-[#6BBEFF] to-[#E6B8FF] text-white rounded-2xl p-4 flex items-center justify-center gap-2 tap-highlight active:scale-[0.98] transition-all duration-200 shadow-[0_4px_12px_rgba(107,190,255,0.3)]">
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
