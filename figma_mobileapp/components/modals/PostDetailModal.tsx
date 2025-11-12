import { X, Heart, MessageSquare, Share2, Shield } from 'lucide-react';

interface PostDetailModalProps {
  post: {
    id: string;
    avatar: string;
    author: string;
    role: string;
    stage: string;
    content: string;
    image?: string;
    helpfulCount: number;
    verified: boolean;
  };
  onClose: () => void;
}

export function PostDetailModal({ post, onClose }: PostDetailModalProps) {
  const comments = [
    {
      author: 'Sarah L.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      content: 'Thank you for sharing this! We had the same issue last month.',
      time: '2h ago',
    },
    {
      author: 'Michael T.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      content: 'The 5 S\'s method worked wonders for us too!',
      time: '5h ago',
    },
    {
      author: 'Nina K.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      content: 'Bookmarking this for later. Our baby is only 1 month old.',
      time: '1d ago',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-auto animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E9ECF2] px-4 py-3 flex items-center justify-between z-10">
          <h3 className="text-[#222]">Community Post</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors tap-highlight"
          >
            <X size={20} className="text-[#666]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Author Info */}
          <div className="flex items-start gap-3 mb-4">
            <img
              src={post.avatar}
              alt={post.author}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm text-[#222]">{post.author}</p>
                {post.verified && (
                  <Shield size={14} className="text-[#6BBEFF]" fill="#6BBEFF" />
                )}
              </div>
              <div className="flex gap-2">
                <span className="text-xs bg-[#E6B8FF]/20 text-[#E6B8FF] px-2 py-0.5 rounded-full">
                  {post.role}
                </span>
                <span className="text-xs bg-gray-100 text-[#666] px-2 py-0.5 rounded-full">
                  {post.stage}
                </span>
              </div>
              <p className="text-xs text-[#666] mt-1">Posted 3 hours ago</p>
            </div>
          </div>

          {/* Post Content */}
          <div className="mb-4">
            <p className="text-sm text-[#222] leading-relaxed mb-3">{post.content}</p>
            {post.image && (
              <div className="rounded-xl overflow-hidden">
                <img src={post.image} alt="Post" className="w-full object-cover" />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pb-4 border-b border-[#E9ECF2] mb-4">
            <button className="flex items-center gap-2 text-[#666] hover:text-[#6BBEFF] transition-colors tap-highlight">
              <Heart size={20} />
              <span className="text-sm">{post.helpfulCount}</span>
            </button>
            <button className="flex items-center gap-2 text-[#666] hover:text-[#6BBEFF] transition-colors tap-highlight">
              <MessageSquare size={20} />
              <span className="text-sm">{comments.length}</span>
            </button>
            <button className="flex items-center gap-2 text-[#666] hover:text-[#6BBEFF] transition-colors tap-highlight">
              <Share2 size={20} />
              <span className="text-sm">Share</span>
            </button>
          </div>

          {/* Comments */}
          <div>
            <h4 className="text-[#222] mb-3">Comments ({comments.length})</h4>
            <div className="space-y-4">
              {comments.map((comment, i) => (
                <div key={i} className="flex gap-3">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-xl p-3 mb-1">
                      <p className="text-sm text-[#222] mb-1">{comment.author}</p>
                      <p className="text-sm text-[#666]">{comment.content}</p>
                    </div>
                    <p className="text-xs text-[#666] px-3">{comment.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full px-4 py-3 bg-gray-100 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#6BBEFF]/30 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
