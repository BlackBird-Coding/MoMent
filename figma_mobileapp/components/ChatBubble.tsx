import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  type: 'AI' | 'User';
  message: string;
  actions?: { label: string; onClick?: () => void }[];
  loading?: boolean;
}

export function ChatBubble({ type, message, actions, loading = false }: ChatBubbleProps) {
  const isAI = type === 'AI';

  return (
    <div className={`flex gap-3 ${isAI ? '' : 'flex-row-reverse'}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isAI ? 'bg-[#6BBEFF]' : 'bg-gray-200'
        }`}
      >
        {isAI ? (
          <Bot size={16} className="text-white" />
        ) : (
          <User size={16} className="text-gray-600" />
        )}
      </div>
      
      <div className={`flex flex-col gap-2 max-w-[75%] ${isAI ? '' : 'items-end'}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isAI
              ? 'bg-[#6BBEFF]/10 text-[#222]'
              : 'bg-white text-[#222] shadow-[0_4px_12px_rgba(0,0,0,0.06)]'
          }`}
        >
          {loading ? (
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <p className="text-sm whitespace-pre-wrap">{message}</p>
          )}
        </div>
        
        {actions && actions.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="px-3 py-1.5 bg-white border border-[#6BBEFF] text-[#6BBEFF] rounded-full text-xs hover:bg-[#6BBEFF]/10 transition-all duration-200 tap-highlight active:scale-95"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
