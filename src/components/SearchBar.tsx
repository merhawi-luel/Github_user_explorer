// src/components/SearchBar.tsx
import { useState } from "react";

interface SearchBarProps {
  onSearch: (username: string) => void;
  loading?: boolean;
}

function SearchBar({ onSearch, loading = false }: SearchBarProps) {
  const [input, setInput] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search GitHub username..."
        disabled={loading}
      />
      <button type="submit" disabled={loading || !input.trim()}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;