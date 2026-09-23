import { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import RepoList from "./components/RepoList";
import { useGitHubUser } from "./hooks/useGitHubUser";
import { useGitHubRepos } from "./hooks/useGitHubRepos";

function App() {
  const [username, setUsername] = useState("");
  const { data: user, loading: userLoading, error: userError } = useGitHubUser(username);
  const { data: repos, loading: reposLoading } = useGitHubRepos(username);

  return (
    <div>
      <SearchBar onSearch={setUsername} loading={userLoading} />
      {userError && <p>{userError}</p>}
      {user && <UserCard user={user} />}
      {reposLoading && <p>Loading repos...</p>}
      {repos && <RepoList repos={repos} />}
    </div>
  );
}

export default App;