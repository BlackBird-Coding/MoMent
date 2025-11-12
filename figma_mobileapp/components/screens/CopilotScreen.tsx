import { useState, useRef, useEffect } from 'react';
import { ChatBubble } from '../ChatBubble';
import { Send, Mic, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from '../Logo';

export function CopilotScreen() {
  const [inputValue, setInputValue] = useState('');
  const [conversation, setConversation] = useState([
    {
      type: 'AI' as const,
      message: "Hi there! I'm your MoMent Copilot 👋 I'm here to provide gentle guidance and support for your parenting journey. How can I help you today?",
    },
    {
      type: 'User' as const,
      message: 'My 3-month-old has been experiencing colic at night. What can I try?',
    },
    {
      type: 'AI' as const,
      message:
        "I understand how exhausting nighttime colic can be for both you and your baby 💙. Here are some gentle approaches that many parents find helpful:\n\n✓ Try the '5 S's' method: Swaddling, Side/stomach position (while supervised), Shushing sounds, Swinging motion, and Sucking\n✓ Gentle tummy massage in circular motions\n✓ Warm compress on baby's tummy\n✓ Bicycle leg movements to help release gas\n\nImportant: This is supportive guidance, not medical diagnosis. If symptoms persist, worsen, or you notice fever, please consult your pediatrician right away.",
      actions: [
        { 
          label: 'See Related Posts', 
          onClick: () => toast.success('Opening Community', { 
            description: '23 parents shared their colic experiences'
          }) 
        },
        { 
          label: 'Add to Care Plan', 
          onClick: () => toast.success('Added Successfully', { 
            description: 'Colic relief routine added to today\'s plan ✓'
          }) 
        },
      ],
    },
    {
      type: 'User' as const,
      message: 'Thank you! Should I be worried about anything specific?',
    },
    {
      type: 'AI' as const,
      message:
        "You're doing great by staying observant! Here are a few things to watch for:\n\n🔍 Contact your pediatrician if you notice:\n• Fever over 38°C (100.4°F)\n• Projectile vomiting\n• Blood in stool\n• Extreme lethargy or high-pitched crying\n• Baby refusing to eat for several feedings\n\nMost colic improves by 3-4 months. You're being a wonderful, attentive parent 💚",
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const quickActions = [
    'Symptom Check',
    'Find Clinics',
    'Insurance Help',
    'Search Community',
    'Order Essentials',
  ];

  const handleSend = () => {
    if (inputValue.trim()) {
      const userMessage = inputValue;
      setConversation([...conversation, {
        type: 'User' as const,
        message: userMessage,
      }]);
      setInputValue('');
      
      // Simulate AI response
      setTimeout(() => {
        setConversation(prev => [...prev, {
          type: 'AI' as const,
          message: "I'm here to help! Let me look into that for you. Based on your question, I'd recommend consulting with your pediatrician for personalized advice. In the meantime, here are some general tips that might be helpful...",
        }]);
      }, 1000);
      
      toast.success('Message sent', {
        description: 'Copilot is analyzing your question...',
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#F7FBFF] to-white px-4 pt-4 pb-3 border-b border-[#E9ECF2]">
        <div className="mb-3">
          <Logo size="medium" />
        </div>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-[#222]">MoMent Copilot 🤖</h2>
          <Heart size={14} className="text-[#FFA78B] animate-pulse" fill="#FFA78B" />
        </div>
        <p className="text-xs text-[#666]">Gentle guidance, not medical diagnosis</p>
      </div>

      {/* Quick actions */}
      <div className="px-4 py-3 border-b border-[#E9ECF2]">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {quickActions.map((action) => (
            <button
              key={action}
              onClick={() => {
                toast.info(action, {
                  description: 'Opening relevant information...',
                });
              }}
              className="px-3 py-1.5 bg-[#6BBEFF]/10 text-[#6BBEFF] rounded-full text-xs whitespace-nowrap hover:bg-[#6BBEFF]/20 transition-all duration-200 tap-highlight active:scale-95"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-auto px-4 py-4 space-y-4 pb-24">
        {conversation.map((msg, index) => (
          <ChatBubble key={index} {...msg} />
        ))}
        
        {/* Example suggestions */}
        <div className="bg-[#F7FBFF] rounded-xl p-4 border border-[#E9ECF2]">
          <p className="text-xs text-[#666] mb-2">Try asking me about:</p>
          <div className="space-y-1">
            <button 
              onClick={() => setInputValue('What are signs of teething?')}
              className="text-xs text-[#6BBEFF] block hover:underline text-left tap-highlight"
            >
              • What are signs of teething?
            </button>
            <button 
              onClick={() => setInputValue('Best sleep schedule for 4 month old')}
              className="text-xs text-[#6BBEFF] block hover:underline text-left tap-highlight"
            >
              • Best sleep schedule for 4 month old
            </button>
            <button 
              onClick={() => setInputValue('When can I introduce solid foods?')}
              className="text-xs text-[#6BBEFF] block hover:underline text-left tap-highlight"
            >
              • When can I introduce solid foods?
            </button>
            <button 
              onClick={() => setInputValue('How to baby-proof my home?')}
              className="text-xs text-[#6BBEFF] block hover:underline text-left tap-highlight"
            >
              • How to baby-proof my home?
            </button>
            <button 
              onClick={() => setInputValue('Managing postpartum emotions')}
              className="text-xs text-[#6BBEFF] block hover:underline text-left tap-highlight"
            >
              • Managing postpartum emotions
            </button>
          </div>
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="absolute bottom-16 left-0 right-0 bg-white border-t border-[#E9ECF2] px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
        <div className="flex gap-2 items-end max-w-md mx-auto">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
              className="w-full pl-4 pr-12 py-3 bg-gray-100 rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-[#6BBEFF]/30 transition-all"
            />
            <button 
              onClick={() => {
                toast.info('Voice input', {
                  description: 'Speak your question...',
                });
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#6BBEFF] transition-colors tap-highlight"
            >
              <Mic size={20} />
            </button>
          </div>
          <button
            onClick={handleSend}
            className="p-3 bg-[#6BBEFF] text-white rounded-2xl hover:bg-[#5AA8E0] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed tap-highlight active:scale-95 shadow-[0_4px_12px_rgba(107,190,255,0.3)]"
            disabled={!inputValue.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
