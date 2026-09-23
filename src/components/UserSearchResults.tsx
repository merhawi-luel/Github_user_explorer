import { Link } from "react-router-dom";
import type { GitHubUserSearchResult } from "../types/github";

interface UserSearchResultsProps {
  results: GitHubUserSearchResult[];
}

function UserSearchResults({ results }: UserSearchResultsProps) {
  if (results.length === 0) return <p>No users found.</p>;

  return (
    <div className="search-results-grid">
      {results.map((user) => (
        <Link key={user.id} to={`/user/${user.login}`} className="search-result-card">
          <img src={user.avatar_url} alt={`${user.login}'s avatar`} width={60} />
          <span>{user.login}</span>
        </Link>
      ))}
    </div>
  );
}

export default UserSearchResults;