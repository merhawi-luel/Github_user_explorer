// src/pages/UserProfile.tsx
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

  if (userLoading) return <p>Loading profile...</p>;
  if (userError) return <p>{userError}</p>;
  if (!user) return null;

  return (
    <div className="user-profile-page">
      <Link to="/">← New search</Link>
      <UserCard user={user} />
      {reposLoading && <p>Loading repositories...</p>}
      {repos && <RepoList repos={repos} username={username ?? ""} />}
    </div>
  );
}

export default UserProfile;