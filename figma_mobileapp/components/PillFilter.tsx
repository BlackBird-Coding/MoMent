interface PillFilterProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function PillFilter({ label, active = false, onClick }: PillFilterProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 tap-highlight ${
        active
          ? 'bg-[#6BBEFF] text-white shadow-sm'
          : 'bg-gray-100 text-[#666] border border-transparent hover:border-[#E9ECF2]'
      }`}
    >
      {label}
    </button>
  );
}
