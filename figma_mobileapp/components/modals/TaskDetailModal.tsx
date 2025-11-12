import { X, Check, Clock, Bell, ChevronRight } from 'lucide-react';

interface TaskDetailModalProps {
  task: {
    id: string;
    text: string;
    completed: boolean;
  };
  onClose: () => void;
  onToggle: () => void;
}

export function TaskDetailModal({ task, onClose, onToggle }: TaskDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl w-full max-w-md animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="border-b border-[#E9ECF2] px-4 py-3 flex items-center justify-between">
          <h3 className="text-[#222]">Task Details</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors tap-highlight"
          >
            <X size={20} className="text-[#666]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-6">
            <p className="text-lg text-[#222] mb-2">{task.text}</p>
            <div className="flex items-center gap-2 text-sm text-[#666]">
              <Clock size={16} />
              <span>Scheduled for today</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2 mb-6">
            <button
              onClick={onToggle}
              className="w-full bg-gradient-to-r from-[#6BBEFF] to-[#E6B8FF] text-white rounded-2xl p-4 flex items-center justify-center gap-2 tap-highlight active:scale-[0.98] transition-all duration-200 shadow-[0_4px_12px_rgba(107,190,255,0.3)]"
            >
              <Check size={20} />
              {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>

            <button className="w-full bg-white border border-[#E9ECF2] text-[#222] rounded-2xl p-4 flex items-center justify-between hover:border-[#6BBEFF] transition-all duration-200 tap-highlight">
              <div className="flex items-center gap-2">
                <Bell size={20} className="text-[#666]" />
                <span>Set Reminder</span>
              </div>
              <ChevronRight size={20} className="text-[#666]" />
            </button>

            <button className="w-full bg-white border border-[#E9ECF2] text-[#222] rounded-2xl p-4 flex items-center justify-between hover:border-[#6BBEFF] transition-all duration-200 tap-highlight">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-[#666]" />
                <span>Reschedule</span>
              </div>
              <ChevronRight size={20} className="text-[#666]" />
            </button>
          </div>

          {/* Related Info */}
          <div className="bg-[#F7FBFF] rounded-xl p-4 border border-[#E9ECF2]">
            <h4 className="text-sm text-[#222] mb-2">Tips from Copilot</h4>
            <p className="text-xs text-[#666] leading-relaxed">
              Consistency is key for building healthy routines. Try to complete this task around the
              same time each day to help establish a predictable schedule for your little one.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
