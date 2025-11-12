import { Plus } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TodayCardProps {
  tasks: Task[];
  progress: number;
  onAddTask?: () => void;
  onTaskClick?: (task: Task) => void;
}

export function TodayCard({ tasks, progress, onAddTask, onTaskClick }: TodayCardProps) {
  return (
    <div className="bg-gradient-to-br from-[#6BBEFF]/10 to-white rounded-2xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-[#6BBEFF]/20">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[#222]">Today's Care Plan</h3>
        <span className="text-sm text-[#6BBEFF]">{Math.round(progress)}%</span>
      </div>
      
      <div className="w-full h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#6BBEFF] to-[#E6B8FF] rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-2 mb-3">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => onTaskClick?.(task)}
            className="w-full flex items-center gap-2 hover:bg-gray-50 rounded-lg p-1 -ml-1 transition-colors tap-highlight text-left"
          >
            <input
              type="checkbox"
              checked={task.completed}
              readOnly
              className="w-4 h-4 rounded accent-[#6BBEFF] cursor-pointer pointer-events-none"
            />
            <span className={`text-sm transition-all duration-200 ${task.completed ? 'text-gray-400 line-through' : 'text-[#222]'}`}>
              {task.text}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={onAddTask}
        className="flex items-center gap-2 text-sm text-[#6BBEFF] hover:text-[#5AA8E0] transition-colors tap-highlight"
      >
        <Plus size={16} />
        Add task
      </button>
    </div>
  );
}
