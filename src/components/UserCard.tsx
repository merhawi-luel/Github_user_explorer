// src/components/UserCard.tsx
import type { GitHubUser } from "../types/github";

interface UserCardProps {
  user: GitHubUser;
}

function UserCard({ user }: UserCardProps) {
  const joinedDate = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={`${user.login}'s avatar`} width={100} />
      <h2>{user.name ?? user.login}</h2>
      <p className="username">@{user.login}</p>

      {user.bio && <p className="bio">{user.bio}</p>}

      <div className="meta">
        {user.company && <span>🏢 {user.company}</span>}
        {user.location && <span>📍 {user.location}</span>}
        <span>📅 Joined {joinedDate}</span>
      </div>

      <div className="stats">
        <div>
          <strong>{user.followers}</strong>
          <span>Followers</span>
        </div>
        <div>
          <strong>{user.following}</strong>
          <span>Following</span>
        </div>
        <div>
          <strong>{user.public_repos}</strong>
          <span>Repos</span>
        </div>
      </div>

      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
    </div>
  );
}

export default UserCard;