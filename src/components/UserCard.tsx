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
    <div className="border border-white/10 p-6">
      <img src={user.avatar_url} alt={`${user.login}'s avatar`} className="w-20 h-20" />

      <h2 className="mt-4 text-xl text-fg">{user.name ?? user.login}</h2>
      <p className="font-mono text-sm text-muted">@{user.login}</p>

      {user.bio && <p className="mt-3 text-sm text-fg leading-relaxed">{user.bio}</p>}

      <div className="mt-4 flex flex-col gap-1 font-mono text-sm text-muted">
        {user.company && <span>{user.company}</span>}
        {user.location && <span>{user.location}</span>}
        <span>joined {joinedDate}</span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
        <div>
          <div className="font-mono text-lg text-fg">{user.followers}</div>
          <div className="font-mono text-xs text-muted">followers</div>
        </div>
        <div>
          <div className="font-mono text-lg text-fg">{user.following}</div>
          <div className="font-mono text-xs text-muted">following</div>
        </div>
        <div>
          <div className="font-mono text-lg text-fg">{user.public_repos}</div>
          <div className="font-mono text-xs text-muted">repos</div>
        </div>
      </div>

      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block font-mono text-sm text-link hover:text-accent transition-colors"
      >
        view on github
      </a>
    </div>
  );
}

export default UserCard;