// src/pages/RepoDetail.tsx
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useGitHubReadme } from "../hooks/useGitHubReadme";

interface RepoDetailParams extends Record<string, string | undefined> {
  username: string;
  repoName: string;
}

function RepoDetail() {
  const { username, repoName } = useParams<RepoDetailParams>();
  const { data: readme, loading, error } = useGitHubReadme(
    username ?? "",
    repoName ?? ""
  );

  return (
    <div className="repo-detail-page">
      <Link to={`/user/${username}`}>← Back to {username}'s profile</Link>
      <h1>{repoName}</h1>

      {loading && <p>Loading README...</p>}
      {error && <p>{error}</p>}
      {readme && (
        <div className="readme-content">
          <ReactMarkdown>{readme}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default RepoDetail;