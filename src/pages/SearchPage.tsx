import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

function SearchPage() {
  const navigate = useNavigate();

  function handleSearch(username: string) {
    navigate(`/user/${username}`);
  }

  return (
    <div className="search-page">
      <h1>GitHub User Explorer</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default SearchPage;