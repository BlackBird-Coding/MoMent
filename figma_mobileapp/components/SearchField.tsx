import { Search, SlidersHorizontal } from 'lucide-react';

interface SearchFieldProps {
  placeholder?: string;
  withFilters?: boolean;
  onFilterClick?: () => void;
}

export function SearchField({ placeholder = 'Search...', withFilters = false, onFilterClick }: SearchFieldProps) {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" size={20} />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#6BBEFF]/30 text-[#222] placeholder:text-[#666] transition-all"
        />
      </div>
      {withFilters && (
        <button 
          onClick={onFilterClick}
          className="p-3 bg-gray-100 rounded-xl tap-highlight active:scale-95 transition-all duration-200 hover:bg-gray-200"
        >
          <SlidersHorizontal size={20} className="text-[#666]" />
        </button>
      )}
    </div>
  );
}
