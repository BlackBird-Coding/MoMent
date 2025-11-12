import { useState } from 'react';
import { MemberCard } from '../MemberCard';
import {
  Plus,
  Settings,
  Shield,
  Globe,
  Bell,
  HelpCircle,
  ChevronRight,
  Download,
  Trash2,
  CreditCard,
  Package,
  Star,
  MessageSquare,
} from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from '../Logo';

export function ProfileScreen() {
  const [shareHealth, setShareHealth] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [anonymousPosts, setAnonymousPosts] = useState(true);

  const familyMembers = [
    {
      name: 'Pranee',
      relation: 'Mother',
      avatar: 'https://images.unsplash.com/photo-1739865942515-eb85eecd8522?w=100',
      connected: true,
    },
    {
      name: 'Wichai',
      relation: 'Father',
      avatar: 'https://images.unsplash.com/photo-1560066495-a71f2b19336d?w=100',
      connected: true,
    },
    {
      name: 'Emma',
      relation: 'Child (4mo)',
      avatar: 'https://images.unsplash.com/photo-1664819361293-dc828072ffcc?w=100',
      connected: true,
    },
    {
      name: 'Grandma',
      relation: 'Caregiver',
      connected: false,
    },
  ];

  const recentOrders = [
    {
      id: '1',
      name: 'Organic Cotton Baby Onesie Set',
      date: 'Oct 8, 2025',
      status: 'Delivered',
      amount: '฿450',
    },
    {
      id: '2',
      name: 'Montessori Wooden Toy Set',
      date: 'Oct 5, 2025',
      status: 'Delivered',
      amount: '฿890',
    },
    {
      id: '3',
      name: 'Baby Carrier - Ergonomic',
      date: 'Oct 1, 2025',
      status: 'In Transit',
      amount: '฿1,200',
    },
    {
      id: '4',
      name: 'Bamboo Feeding Set',
      date: 'Sep 28, 2025',
      status: 'Delivered',
      amount: '฿650',
    },
    {
      id: '5',
      name: 'Baby Monitor with Camera',
      date: 'Sep 22, 2025',
      status: 'Delivered',
      amount: '฿1,850',
    },
  ];

  const savedItems = [
    { name: 'Teething Toys Bundle', price: '฿420' },
    { name: 'Organic Baby Lotion', price: '฿280' },
    { name: 'Sleep Sack - Winter', price: '฿680' },
  ];

  const MenuItem = ({
    icon: Icon,
    label,
    sublabel,
    onClick,
    badge,
  }: {
    icon: any;
    label: string;
    sublabel?: string;
    onClick?: () => void;
    badge?: string;
  }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-[#E9ECF2] shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition-all duration-200 tap-highlight active:scale-[0.99]"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#6BBEFF]/10 rounded-lg flex items-center justify-center">
          <Icon size={20} className="text-[#6BBEFF]" />
        </div>
        <div className="text-left">
          <p className="text-sm text-[#222]">{label}</p>
          {sublabel && <p className="text-xs text-[#666]">{sublabel}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="text-xs bg-[#FFA78B] text-white px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
        <ChevronRight size={20} className="text-gray-400" />
      </div>
    </button>
  );

  return (
    <div className="flex-1 overflow-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#F7FBFF] to-white px-4 pt-4 pb-3">
        <div className="mb-3">
          <Logo size="medium" />
        </div>
        <h2 className="text-[#222]">Profile & Family</h2>
      </div>

      {/* User Profile Card */}
      <div className="px-4 py-3">
        <div className="bg-gradient-to-br from-[#6BBEFF]/10 to-white rounded-2xl p-4 border border-[#6BBEFF]/20">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://images.unsplash.com/photo-1739865942515-eb85eecd8522?w=100"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-[#222] mb-1">Pranee S.</h3>
              <p className="text-xs text-[#666] mb-1">Member since Jan 2025</p>
              <div className="flex items-center gap-1">
                <Star size={12} className="text-yellow-400" fill="#FACC15" />
                <span className="text-xs text-[#666]">Parent Level 3</span>
              </div>
            </div>
            <button
              onClick={() => {
                toast.info('Edit Profile', {
                  description: 'Update your information',
                });
              }}
              className="px-3 py-1.5 bg-white rounded-lg border border-[#E9ECF2] text-xs tap-highlight"
            >
              Edit
            </button>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-white rounded-lg p-2 text-center">
              <p className="text-xs text-[#666]">Posts</p>
              <p className="text-sm text-[#222]">23</p>
            </div>
            <div className="flex-1 bg-white rounded-lg p-2 text-center">
              <p className="text-xs text-[#666]">Helpful</p>
              <p className="text-sm text-[#222]">156</p>
            </div>
            <div className="flex-1 bg-white rounded-lg p-2 text-center">
              <p className="text-xs text-[#666]">Following</p>
              <p className="text-sm text-[#222]">42</p>
            </div>
          </div>
        </div>
      </div>

      {/* Family members */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[#222]">Family Members</h3>
          <button
            onClick={() => {
              toast.success('Add Family Member', {
                description: 'Invite them to join your care circle',
              });
            }}
            className="flex items-center gap-1 text-sm text-[#6BBEFF] tap-highlight"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {familyMembers.map((member, index) => (
            <MemberCard
              key={index}
              {...member}
              onClick={() => {
                toast.info(member.name, {
                  description: 'View health records, tasks, and permissions',
                });
              }}
            />
          ))}
        </div>
        <div className="mt-3 bg-[#F7FBFF] rounded-xl p-3 border border-[#E9ECF2]">
          <p className="text-xs text-[#666]">
            💡 <span className="text-[#222]">Family Sharing:</span> Connected members can view shared health records, coordinate care tasks, and receive important updates.
          </p>
        </div>
      </div>

      {/* Purchases & Orders */}
      <div className="px-4 py-3">
        <h3 className="mb-3 text-[#222]">Recent Orders</h3>
        <div className="space-y-2">
          {recentOrders.map((order) => (
            <button
              key={order.id}
              onClick={() => {
                toast.info(order.name, {
                  description: `${order.status} • Track shipment • Reorder`,
                });
              }}
              className="w-full bg-white rounded-xl p-4 border border-[#E9ECF2] shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition-all duration-200 tap-highlight text-left"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-[#222] mb-1">{order.name}</p>
                  <p className="text-xs text-[#666]">{order.date} • {order.amount}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  order.status === 'Delivered' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {order.status}
                </span>
              </div>
            </button>
          ))}
          <button
            onClick={() => {
              toast.info('All Orders', {
                description: 'View complete purchase history',
              });
            }}
            className="w-full text-center text-sm text-[#6BBEFF] py-2 tap-highlight"
          >
            View all orders ({recentOrders.length + 3} total)
          </button>
        </div>
      </div>

      {/* Saved Items */}
      <div className="px-4 py-3">
        <h3 className="mb-3 text-[#222]">Saved Items</h3>
        <div className="space-y-2">
          {savedItems.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                toast.info(item.name, {
                  description: 'View product details',
                });
              }}
              className="w-full bg-white rounded-xl p-3 border border-[#E9ECF2] shadow-sm hover:shadow-md transition-all tap-highlight text-left flex items-center justify-between"
            >
              <p className="text-sm text-[#222]">{item.name}</p>
              <span className="text-sm text-[#6BBEFF]">{item.price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Account & Wallet */}
      <div className="px-4 py-3">
        <h3 className="mb-3 text-[#222]">Account & Payments</h3>
        <div className="space-y-2">
          <MenuItem
            icon={CreditCard}
            label="Payment Methods"
            sublabel="Manage cards and payment options"
            onClick={() => {
              toast.info('Payment Methods', {
                description: 'Add or remove payment methods',
              });
            }}
          />
          <MenuItem
            icon={Package}
            label="Addresses"
            sublabel="Manage shipping addresses"
            onClick={() => {
              toast.info('Addresses', {
                description: '2 saved addresses',
              });
            }}
          />
          <MenuItem
            icon={MessageSquare}
            label="My Reviews"
            sublabel="Products and services you reviewed"
            onClick={() => {
              toast.info('My Reviews', {
                description: 'You have reviewed 8 items',
              });
            }}
          />
        </div>
      </div>

      {/* Privacy & PDPA */}
      <div className="px-4 py-3">
        <h3 className="mb-3 text-[#222]">Privacy & Data Control</h3>
        <div className="space-y-2">
          <MenuItem
            icon={Shield}
            label="Privacy Center (PDPA)"
            sublabel="Manage consent and data sharing"
            onClick={() => {
              toast.info('Privacy Center', {
                description: 'Full control over your data',
              });
            }}
          />
          <div className="bg-[#E6B8FF]/5 rounded-xl p-4 border border-[#E6B8FF]/20">
            <p className="text-xs text-[#666] mb-3">
              <span className="text-[#222]">Your data, your control.</span> Choose what you share:
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <span className="text-xs text-[#222]">Share health data with partner</span>
                  <p className="text-[10px] text-[#666] mt-0.5">Allow Wichai to view Emma's records</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={shareHealth} 
                  onChange={(e) => {
                    setShareHealth(e.target.checked);
                    toast.success(e.target.checked ? 'Sharing enabled' : 'Sharing disabled');
                  }}
                  className="accent-[#6BBEFF] w-4 h-4 cursor-pointer" 
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <span className="text-xs text-[#222]">Auto-sync with clinic</span>
                  <p className="text-[10px] text-[#666] mt-0.5">Share records with Dr. Somchai</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={autoSync} 
                  onChange={(e) => {
                    setAutoSync(e.target.checked);
                    toast.success(e.target.checked ? 'Auto-sync enabled' : 'Auto-sync disabled');
                  }}
                  className="accent-[#6BBEFF] w-4 h-4 cursor-pointer" 
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <span className="text-xs text-[#222]">Anonymous community posts</span>
                  <p className="text-[10px] text-[#666] mt-0.5">Hide your name in community</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={anonymousPosts} 
                  onChange={(e) => {
                    setAnonymousPosts(e.target.checked);
                    toast.success(e.target.checked ? 'Anonymous mode on' : 'Anonymous mode off');
                  }}
                  className="accent-[#6BBEFF] w-4 h-4 cursor-pointer" 
                />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-[#E6B8FF]/20 flex gap-2">
              <button
                onClick={() => {
                  toast.success('Export Data', {
                    description: 'Preparing your data package (JSON format)...',
                  });
                }}
                className="flex-1 text-xs text-[#6BBEFF] py-2 px-3 bg-white rounded-lg border border-[#6BBEFF] tap-highlight flex items-center justify-center gap-1 active:scale-95 transition-all"
              >
                <Download size={12} />
                Export Data
              </button>
              <button
                onClick={() => {
                  toast.error('Delete Account', {
                    description: 'This action is permanent and cannot be undone',
                  });
                }}
                className="flex-1 text-xs text-[#FFA78B] py-2 px-3 bg-white rounded-lg border border-[#FFA78B] tap-highlight flex items-center justify-center gap-1 active:scale-95 transition-all"
              >
                <Trash2 size={12} />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="px-4 py-3 pb-6">
        <h3 className="mb-3 text-[#222]">Settings</h3>
        <div className="space-y-2">
          <MenuItem
            icon={Globe}
            label="Language & Region"
            sublabel="English (US) • Bangkok, Thailand"
            onClick={() => {
              toast.info('Language Settings', {
                description: 'Available: English, ไทย, 中文, 日本語',
              });
            }}
          />
          <MenuItem
            icon={Bell}
            label="Notifications"
            sublabel="Push, email, and SMS alerts"
            badge="3"
            onClick={() => {
              toast.info('Notification Settings', {
                description: 'Customize your alert preferences',
              });
            }}
          />
          <MenuItem
            icon={Settings}
            label="App Preferences"
            sublabel="Theme, units, and display"
            onClick={() => {
              toast.info('App Settings', {
                description: 'Customize your MoMent experience',
              });
            }}
          />
          <MenuItem
            icon={HelpCircle}
            label="Help & Support"
            sublabel="FAQs, live chat, contact us"
            onClick={() => {
              toast.info('Help Center', {
                description: 'We\'re here to help 24/7',
              });
            }}
          />
        </div>
        
        {/* Logout & Version */}
        <button
          onClick={() => {
            toast.info('Logout', {
              description: 'Are you sure you want to sign out?',
            });
          }}
          className="w-full mt-4 text-sm text-[#FFA78B] py-3 tap-highlight"
        >
          Sign Out
        </button>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-[#666]">MoMent v2.1.0 • Made with 💙 for families</p>
          <p className="text-xs text-[#666] mt-1">© 2025 MoMent. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
