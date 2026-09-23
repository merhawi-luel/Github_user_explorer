import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useGitHubUserSearch } from "../hooks/useGitHubUserSearch";
import { useSearchHistory } from "../hooks/useSearchHistory";
import UserSearchResults from "../components/UserSearchResults";
import SearchHistory from "../components/SearchHistory";

function SearchPage() {
  const [input, setInput] = useState<string>("");
  const debouncedInput = useDebounce(input, 400);
  const { data: results, loading, error } = useGitHubUserSearch(debouncedInput);
  const { history, addSearch, clearHistory } = useSearchHistory();
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleSelectHistory(username: string) {
    addSearch(username);
    navigate(`/user/${username}`);
  }

  return (
    <div className="search-page">
      <h1>GitHub User Explorer</h1>

      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search GitHub username..."
      />

      {loading && <p>Searching...</p>}
      {error && <p>{error}</p>}
      {results && <UserSearchResults results={results} />}

      {!debouncedInput && (
        <SearchHistory history={history} onSelect={handleSelectHistory} onClear={clearHistory} />
      )}
    </div>
  );
}

export default SearchPage;