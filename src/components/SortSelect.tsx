// src/components/SortSelect.tsx
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
    <select value={value} onChange={handleChange}>
      <option value="stars">Sort by Stars</option>
      <option value="forks">Sort by Forks</option>
      <option value="updated">Recently Updated</option>
      <option value="name">Name</option>
    </select>
  );
}

export default SortSelect;