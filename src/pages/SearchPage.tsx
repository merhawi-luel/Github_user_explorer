import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SearchHistory from "../components/SearchHistory";
import { useSearchHistory } from "../hooks/useSearchHistory";

function SearchPage() {
  const navigate = useNavigate();
  const { history, addSearch, clearHistory } = useSearchHistory();

  function handleSearch(username: string) {
    addSearch(username);
    navigate(`/user/${username}`);
  }

  return (
    <div className="search-page">
      <h1>GitHub User Explorer</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchHistory history={history} onSelect={handleSearch} onClear={clearHistory} />
    </div>
  );
}

export default SearchPage;