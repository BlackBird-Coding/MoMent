import { useState } from 'react';
import { PillFilter } from '../PillFilter';
import { PostCard } from '../PostCard';
import { PenSquare, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from '../Logo';
import { PostDetailModal } from '../modals/PostDetailModal';

export function CommunityScreen() {
  const [activeTopic, setActiveTopic] = useState('Newborn');
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const topics = [
    'Pregnancy',
    'Newborn',
    '3-12m',
    '1-3y',
    'Emotions',
    'Health',
    'Reviews',
    'Deals',
    'Sleep',
    'Feeding',
  ];

  const posts = [
    {
      id: '1',
      avatar: 'https://images.unsplash.com/photo-1739865942515-eb85eecd8522?w=100',
      author: 'Pranee S.',
      role: 'New Mom',
      stage: '3 months',
      content:
        'Just discovered that white noise really works wonders! Our baby now sleeps for 3+ hours straight. Using a simple app on low volume near the crib. Game changer for our family! 💙',
      helpfulCount: 47,
      verified: false,
    },
    {
      id: '2',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      author: 'Dr. Somchai K.',
      role: 'Pediatrician',
      stage: 'Expert',
      content:
        'Important reminder: Tummy time for at least 15-20 minutes daily helps develop neck and shoulder muscles. Start with 3-5 minute sessions when baby is alert and engaged. Always supervise!',
      image: 'https://images.unsplash.com/photo-1549633564-3ab4c92ff2d3?w=600',
      helpfulCount: 132,
      verified: true,
    },
    {
      id: '3',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      author: 'Nida P.',
      role: 'Mom',
      stage: '6 months',
      content:
        'Anyone dealing with cradle cap? What worked for you? Our pediatrician suggested gentle oil massage, but I\'d love to hear real experiences from other parents.',
      helpfulCount: 23,
      verified: false,
    },
    {
      id: '4',
      avatar: 'https://images.unsplash.com/photo-1560066495-a71f2b19336d?w=100',
      author: 'Wichai T.',
      role: 'Dad',
      stage: '2 months',
      content:
        'First-time dad here. Feeling a bit overwhelmed but this community has been incredibly supportive and helpful. Thank you all for sharing your experiences and wisdom 🙏',
      helpfulCount: 89,
      verified: false,
    },
    {
      id: '5',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      author: 'Lisa M.',
      role: 'Mom',
      stage: '8 months',
      content:
        'Starting solid foods journey! We\'re trying baby-led weaning and it\'s messy but fun. Pro tip: get a good splat mat and prepare for lots of cleanup 😅',
      image: 'https://images.unsplash.com/photo-1664819361293-dc828072ffcc?w=600',
      helpfulCount: 56,
      verified: false,
    },
    {
      id: '6',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      author: 'Maya R.',
      role: 'Mom',
      stage: '5 months',
      content:
        'Sleep regression at 4 months is REAL. We went from sleeping 6-hour stretches to waking every 2 hours. Anyone have tips that worked for them?',
      helpfulCount: 78,
      verified: false,
    },
    {
      id: '7',
      avatar: 'https://images.unsplash.com/photo-1560066495-a71f2b19336d?w=100',
      author: 'Tom K.',
      role: 'Dad',
      stage: '1 year',
      content:
        'First birthday planning! Looking for recommendations for allergy-friendly cake recipes. Our little one has egg and dairy allergies.',
      helpfulCount: 34,
      verified: false,
    },
    {
      id: '8',
      avatar: 'https://images.unsplash.com/photo-1739865942515-eb85eecd8522?w=100',
      author: 'Anna L.',
      role: 'Mom',
      stage: '7 months',
      content:
        'Teething tips needed! Our baby is so fussy and nothing seems to help. We\'ve tried cold teethers, gentle gum massage... what else can we do?',
      helpfulCount: 45,
      verified: false,
    },
    {
      id: '9',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      author: 'Dr. Ratana P.',
      role: 'Lactation Consultant',
      stage: 'Expert',
      content:
        'Breastfeeding positions matter! Try the laid-back position if baby is struggling to latch. Let gravity help - baby on top, mom semi-reclined. This often works wonders for new moms experiencing latch difficulties.',
      image: 'https://images.unsplash.com/photo-1549633564-3ab4c92ff2d3?w=600',
      helpfulCount: 94,
      verified: true,
    },
    {
      id: '10',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      author: 'Sophie N.',
      role: 'Mom',
      stage: '9 months',
      content:
        'Baby-proofing checklist complete! Outlet covers, cabinet locks, corner guards, and gates at stairs. Feel so much more relaxed now that everything is secured.',
      helpfulCount: 41,
      verified: false,
    },
    {
      id: '11',
      avatar: 'https://images.unsplash.com/photo-1560066495-a71f2b19336d?w=100',
      author: 'James W.',
      role: 'Dad',
      stage: '4 months',
      content:
        'Started a bedtime routine at 3 months - bath, massage, feeding, lullaby. Takes about 45 min but baby now knows it\'s sleep time. Consistency is key!',
      helpfulCount: 67,
      verified: false,
    },
    {
      id: '12',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      author: 'Mei L.',
      role: 'Mom',
      stage: '11 months',
      content:
        'Our baby just took their first steps! 🎉 I was so worried they were "behind" but every baby develops at their own pace. Trust the journey, parents!',
      image: 'https://images.unsplash.com/photo-1559035843-e20a3b69c7a1?w=600',
      helpfulCount: 156,
      verified: false,
    },
    {
      id: '13',
      avatar: 'https://images.unsplash.com/photo-1739865942515-eb85eecd8522?w=100',
      author: 'Kanya S.',
      role: 'Mom',
      stage: '2 months',
      content:
        'Dealing with reflux - keeping baby upright 30 min after feeding really helps. Also smaller, more frequent feedings. Talk to your pediatrician if concerned!',
      helpfulCount: 52,
      verified: false,
    },
    {
      id: '14',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      author: 'Dr. Preecha M.',
      role: 'Pediatrician',
      stage: 'Expert',
      content:
        'Vaccine reminder: The 6-month shots are important for protecting against serious diseases. Side effects like mild fever are normal. Give plenty of fluids and cuddles!',
      helpfulCount: 118,
      verified: true,
    },
    {
      id: '15',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      author: 'Rachel T.',
      role: 'Mom',
      stage: '10 months',
      content:
        'Traveling with baby for the first time next week. Any tips for the 3-hour flight? Bringing toys, snacks, and crossing all my fingers! ✈️',
      helpfulCount: 38,
      verified: false,
    },
  ];

  const trendingTopics = [
    { title: 'Sleep Training Methods', posts: 234 },
    { title: 'Formula vs Breastfeeding', posts: 189 },
    { title: 'Daycare Selection Tips', posts: 156 },
  ];

  return (
    <>
      <div className="flex-1 overflow-auto pb-20">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#F7FBFF] to-white px-4 pt-4 pb-3">
          <div className="mb-3">
            <Logo size="medium" />
          </div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-[#222]">Family Community</h2>
              <p className="text-xs text-[#666] mt-1">Share safely, judge-free support space</p>
            </div>
            <button
              onClick={() => {
                toast.success('Create New Post', {
                  description: 'Your experience could help another parent',
                });
              }}
              className="p-2 bg-[#6BBEFF] text-white rounded-xl tap-highlight active:scale-95 transition-all duration-200"
            >
              <PenSquare size={20} />
            </button>
          </div>
        </div>

        {/* Topic chips */}
        <div className="sticky top-0 glass-blur bg-white/95 z-10 px-4 py-3 border-b border-[#E9ECF2] shadow-sm">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {topics.map((topic) => (
              <PillFilter
                key={topic}
                label={topic}
                active={activeTopic === topic}
                onClick={() => {
                  setActiveTopic(topic);
                  toast.info(`Showing ${topic} posts`);
                }}
              />
            ))}
          </div>
        </div>

        {/* Pinned guides */}
        <div className="px-4 py-4 bg-[#E6B8FF]/5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-[#222]">Trusted Guides</h3>
            <span className="text-xs text-[#E6B8FF]">Medically reviewed</span>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => {
                toast.info('Newborn Sleep Guide', {
                  description: 'Evidence-based tips for healthy sleep habits',
                });
              }}
              className="w-full bg-white rounded-xl p-3 border border-[#E6B8FF]/30 text-left hover:shadow-sm transition-all duration-200 tap-highlight"
            >
              <p className="text-sm text-[#222]">
                📚 Complete Newborn Sleep Guide • Safe practices and healthy habits
              </p>
            </button>
            <button
              onClick={() => {
                toast.info('Feeding Guide', {
                  description: 'Introduction to solid foods timeline',
                });
              }}
              className="w-full bg-white rounded-xl p-3 border border-[#E6B8FF]/30 text-left hover:shadow-sm transition-all duration-200 tap-highlight"
            >
              <p className="text-sm text-[#222]">
                🥄 Starting Solids Guide • Age-appropriate foods and allergies
              </p>
            </button>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={20} className="text-[#FFA78B]" />
            <h3 className="text-[#222]">Trending Discussions</h3>
          </div>
          <div className="space-y-2">
            {trendingTopics.map((topic, i) => (
              <button
                key={i}
                onClick={() => {
                  toast.info(topic.title, {
                    description: `${topic.posts} parents discussing this topic`,
                  });
                }}
                className="w-full bg-white rounded-xl p-3 border border-[#E9ECF2] shadow-sm hover:shadow-md transition-all tap-highlight text-left"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#222]">{topic.title}</p>
                  <span className="text-xs text-[#666]">{topic.posts} posts</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Ask bar */}
        <div className="px-4 py-3">
          <button
            onClick={() => {
              toast.success('New Post Editor', {
                description: 'Share a tip or ask the community',
              });
            }}
            className="w-full bg-gray-100 rounded-xl p-3 text-left text-[#666] text-sm hover:bg-gray-150 transition-colors tap-highlight"
          >
            Share a tip or ask a question...
          </button>
        </div>

        {/* Feed */}
        <div className="px-4 pb-4 space-y-3">
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              {...post} 
              onClick={() => setSelectedPost(post)}
            />
          ))}
        </div>

        {/* Load more */}
        <div className="px-4 pb-4 text-center">
          <p className="text-sm text-gray-400 mb-2">You're all caught up!</p>
          <button
            className="text-xs text-[#6BBEFF] tap-highlight"
            onClick={() => {
              toast.info('Loading earlier posts...');
            }}
          >
            Load earlier posts
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </>
  );
}
