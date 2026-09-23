// src/components/RepoCard.tsx
import type { GitHubRepo } from "../types/github";

interface RepoCardProps {
  repo: GitHubRepo;
}

function RepoCard({ repo }: RepoCardProps) {
  const updatedDate = new Date(repo.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="repo-card">
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
        <h3>{repo.name}</h3>
      </a>

      {repo.description && <p className="description">{repo.description}</p>}

      <div className="repo-meta">
        {repo.language && <span className="language">🔵 {repo.language}</span>}
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        <span>Updated {updatedDate}</span>
      </div>

      {repo.topics.length > 0 && (
        <div className="topics">
          {repo.topics.map((topic) => (
            <span key={topic} className="topic-tag">
              {topic}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default RepoCard;