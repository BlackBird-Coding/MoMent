import { Heart, Shield } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PostCardProps {
  avatar: string;
  author: string;
  role: string;
  stage: string;
  content: string;
  image?: string;
  helpfulCount: number;
  verified?: boolean;
  onClick?: () => void;
}

export function PostCard({
  avatar,
  author,
  role,
  stage,
  content,
  image,
  helpfulCount,
  verified = false,
  onClick,
}: PostCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition-all duration-200 tap-highlight text-left"
    >
      <div className="flex items-start gap-3 mb-3">
        <ImageWithFallback
          src={avatar}
          alt={author}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">{author}</span>
            {verified && (
              <Shield size={14} className="text-[#6BBEFF]" fill="#6BBEFF" />
            )}
          </div>
          <div className="flex gap-2">
            <span className="text-xs bg-[#E6B8FF]/20 text-[#E6B8FF] px-2 py-0.5 rounded-full">
              {role}
            </span>
            <span className="text-xs bg-gray-100 text-[#666] px-2 py-0.5 rounded-full">
              {stage}
            </span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-700 mb-3 line-clamp-3">{content}</p>
      {image && (
        <ImageWithFallback
          src={image}
          alt="Post"
          className="w-full h-40 object-cover rounded-xl mb-3"
        />
      )}
      <div className="flex items-center gap-1 text-[#666]">
        <Heart size={16} />
        <span className="text-xs">{helpfulCount} found helpful</span>
      </div>
    </button>
  );
}
