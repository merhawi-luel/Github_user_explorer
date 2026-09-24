import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface SearchBarProps {
  onQueryChange: (query: string) => void;
}

function SearchBar({ onQueryChange }: SearchBarProps) {
  const [input, setInput] = useState<string>("");
  const debouncedInput = useDebounce(input, 400);

  useEffect(() => {
    onQueryChange(debouncedInput);
  }, [debouncedInput, onQueryChange]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <div className="flex items-center gap-2 border border-white/10 px-4 py-3 focus-within:border-accent transition-colors">
      <span className="font-mono text-accent text-lg">{">"}</span>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="search a username"
        autoFocus
        className="flex-1 bg-transparent font-mono text-fg placeholder:text-muted outline-none text-lg"
      />
    </div>
  );
}

export default SearchBar;