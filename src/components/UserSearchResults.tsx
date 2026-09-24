import { useNavigate } from "react-router-dom";
import type { GitHubUserSearchResult } from "../types/github";

interface UserSearchResultsProps {
  results: GitHubUserSearchResult[];
  onSelect: (username: string) => void;
}

function UserSearchResults({ results, onSelect }: UserSearchResultsProps) {
  const navigate = useNavigate();

  if (results.length === 0) {
    return <p className="font-mono text-sm text-muted">no users found</p>;
  }

  function handleClick(username: string) {
    onSelect(username);
    navigate(`/user/${username}`);
  }

  return (
    <ul className="flex flex-col divide-y divide-white/5">
      {results.map((user) => (
        <li key={user.id}>
          <button
            onClick={() => handleClick(user.login)}
            className="w-full flex items-center gap-3 py-3 text-left hover:bg-white/[0.03] transition-colors"
          >
            <img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              className="w-8 h-8 shrink-0"
            />
            <span className="font-mono text-fg">{user.login}</span>
            
          </button>
        </li>
      ))}
    </ul>
  );
}

export default UserSearchResults;