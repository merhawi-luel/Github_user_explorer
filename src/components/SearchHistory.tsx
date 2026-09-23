interface SearchHistoryProps {
  history: string[];
  onSelect: (username: string) => void;
  onClear: () => void;
}

function SearchHistory({ history, onSelect, onClear }: SearchHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="search-history">
      <div className="search-history-header">
        <h3>Recent Searches</h3>
        <button onClick={onClear}>Clear</button>
      </div>
      <ul>
        {history.map((username) => (
          <li key={username}>
            <button onClick={() => onSelect(username)}>{username}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;