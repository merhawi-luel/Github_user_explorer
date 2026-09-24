import type { SortOption } from "../utils/repoSort";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

function SortSelect({ value, onChange }: SortSelectProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value as SortOption);
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      className="bg-bg border border-white/10 text-fg px-3 py-1.5 outline-none focus:border-accent transition-colors"
    >
      <option value="stars">sort: stars</option>
      <option value="forks">sort: forks</option>
      <option value="updated">sort: updated</option>
      <option value="name">sort: name</option>
    </select>
  );
}

export default SortSelect;