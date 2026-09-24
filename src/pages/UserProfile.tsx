import { useParams, Link } from "react-router-dom";
import UserCard from "../components/UserCard";
import RepoList from "../components/RepoList";
import { useGitHubUser } from "../hooks/useGitHubUser";
import { useGitHubRepos } from "../hooks/useGitHubRepos";

interface UserProfileParams extends Record<string, string | undefined> {
  username: string;
}

function UserProfile() {
  const { username } = useParams<UserProfileParams>();

  const { data: user, loading: userLoading, error: userError } = useGitHubUser(username ?? "");
  const { data: repos, loading: reposLoading } = useGitHubRepos(username ?? "");

  return (
    <div className="min-h-screen bg-bg font-sans px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="font-mono text-sm text-muted hover:text-link transition-colors"
        >
          {"<-"} new search
        </Link>

        {userLoading && (
          <p className="mt-8 font-mono text-sm text-muted">loading profile...</p>
        )}
        {userError && (
          <p className="mt-8 font-mono text-sm text-accent">{userError}</p>
        )}

        {user && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">
            <UserCard user={user} />

            <div>
              {reposLoading && (
                <p className="font-mono text-sm text-muted">loading repositories...</p>
              )}
              {repos && <RepoList repos={repos} username={username ?? ""} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;