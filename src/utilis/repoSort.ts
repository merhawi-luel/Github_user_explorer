export function sortRepos(repos: GitHubRepo[], sortBy: SortOption): GitHubRepo[] {
  const sorted = [...repos];

  switch (sortBy) {
    case "stars":  
      return sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
    case "forks":
      return sorted.sort((a, b) => b.forks_count - a.forks_count);
    case "updated":
      return sorted.sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted; // fallback: return unsorted copy
  }
}