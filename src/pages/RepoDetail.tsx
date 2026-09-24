import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
    <div className="min-h-screen bg-bg font-sans px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          to={`/user/${username}`}
          className="font-mono text-sm text-muted hover:text-link transition-colors"
        >
          back to {username}
        </Link>

        <h1 className="mt-4 font-mono text-2xl text-fg">{repoName}</h1>

        <div className="mt-8">
          {loading && (
            <p className="font-mono text-sm text-muted">loading readme...</p>
          )}
          {error && <p className="font-mono text-sm text-accent">{error}</p>}

{readme && (
  <div className="mt-8 border border-white/10">
    <div className="px-6 py-4 border-b border-white/10">
      <span className="font-mono text-sm font-semibold text-fg">README.md</span>
    </div>
    <div className="px-6 py-6 overflow-x-auto">
      <div className="prose prose-invert max-w-none prose-headings:font-mono prose-a:text-link prose-code:font-mono prose-code:text-accent prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:overflow-x-auto prose-table:text-sm prose-th:border prose-th:border-white/10 prose-td:border prose-td:border-white/10">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
      </div>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
}

export default RepoDetail;