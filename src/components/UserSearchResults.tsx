import { useNavigate } from "react-router-dom";
import type { GitHubUserSearchResult } from "../types/github";

interface UserSearchResultsProps {
  results: GitHubUserSearchResult[];
  onSelect: (username: string) => void;
}

function UserSearchResults({ results, onSelect }: UserSearchResultsProps) {
  const navigate = useNavigate();

  if (results.length === 0) return <p>No users found.</p>;

  function handleClick(username: string) {
    onSelect(username);
    navigate(`/user/${username}`);
  }

  return (
    <div className="search-results-grid">
      {results.map((user) => (
        <button
          key={user.id}
          onClick={() => handleClick(user.login)}
          className="search-result-card"
        >
          <img src={user.avatar_url} alt={`${user.login}'s avatar`} width={60} />
          <span>{user.login}</span>
        </button>
      ))}
    </div>
  );
}

export default UserSearchResults;