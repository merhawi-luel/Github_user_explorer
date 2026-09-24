import { Link } from "react-router-dom";
import type { GitHubRepo } from "../types/github";

interface RepoCardProps {
  repo: GitHubRepo;
  username: string;
}

function RepoCard({ repo, username }: RepoCardProps) {
  const updatedDate = new Date(repo.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="border border-white/10 p-5">
      <Link
        to={`/user/${username}/repo/${repo.name}`}
        className="font-mono text-fg hover:text-link transition-colors"
      >
        <h3 className="text-base">{repo.name}</h3>
      </Link>

      {repo.description && (
        <p className="mt-2 text-sm text-muted leading-relaxed">{repo.description}</p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-4 font-mono text-xs text-muted">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1 text-star">★ {repo.stargazers_count}</span>
        <span>⑂ {repo.forks_count}</span>
        <span>updated {updatedDate}</span>
      </div>

      {repo.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {repo.topics.map((topic) => (
            <span
              key={topic}
              className="font-mono text-xs text-muted border border-white/10 px-2 py-0.5"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default RepoCard;