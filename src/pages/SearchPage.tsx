import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGitHubUserSearch } from "../hooks/useGitHubUserSearch";
import { useSearchHistory } from "../hooks/useSearchHistory";
import SearchBar from "../components/SearchBar";
import UserSearchResults from "../components/UserSearchResults";
import SearchHistory from "../components/SearchHistory";

function SearchPage() {
  const [query, setQuery] = useState<string>("");
  const { data: results, loading, error } = useGitHubUserSearch(query);
  const { history, addSearch, clearHistory } = useSearchHistory();
  const navigate = useNavigate();

  function handleSelect(username: string) {
    addSearch(username);
    navigate(`/user/${username}`);
  }

  return (
    <div className="min-h-screen bg-bg font-sans px-6 py-16">
      <div className="mx-auto max-w-xl">
        <h1 className="font-mono text-sm text-muted tracking-tight mb-8">
          github-user-explorer
        </h1>

        <SearchBar onQueryChange={setQuery} />

        <div className="mt-6">
          {loading && <p className="font-mono text-sm text-muted">searching...</p>}
          {error && <p className="font-mono text-sm text-accent">{error}</p>}
          {results && <UserSearchResults results={results} onSelect={handleSelect} />}

          {!query && (
            <SearchHistory history={history} onSelect={handleSelect} onClear={clearHistory} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;