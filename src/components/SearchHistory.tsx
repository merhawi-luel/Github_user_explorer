interface SearchHistoryProps {
  history: string[];
  onSelect: (username: string) => void;
  onClear: () => void;
}

function SearchHistory({ history, onSelect, onClear }: SearchHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs text-muted">recent</span>
        <button
          onClick={onClear}
          className="font-mono text-xs text-muted hover:text-accent transition-colors"
        >
          clear
        </button>
      </div>
      <ul className="flex flex-wrap gap-2">
        {history.map((username) => (
          <li key={username}>
            <button
              onClick={() => onSelect(username)}
              className="font-mono text-sm text-fg border border-white/10 px-3 py-1 hover:border-link hover:text-link transition-colors"
            >
              {username}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;