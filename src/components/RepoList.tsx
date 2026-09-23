// src/components/RepoList.tsx
import { useState, useMemo } from "react";
import type { GitHubRepo } from "../types/github";
import { sortRepos, type SortOption } from "../utils/repoSort";
import RepoCard from "./RepoCard";

interface RepoListProps {
  repos: GitHubRepo[];
}

function RepoList({ repos }: RepoListProps) {
  const [sortBy, setSortBy] = useState<SortOption>("stars");
  const [language, setLanguage] = useState<string>("all");

  // Build the dynamic language list from whatever repos actually have
  const languages = useMemo(() => {
    const unique = new Set<string>();
    repos.forEach((repo) => {
      if (repo.language) unique.add(repo.language);
    });
    return Array.from(unique).sort();
  }, [repos]);

  const filteredAndSorted = useMemo(() => {
    const filtered =
      language === "all" ? repos : repos.filter((r) => r.language === language);
    return sortRepos(filtered, sortBy);
  }, [repos, sortBy, language]);

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSortBy(e.target.value as SortOption);
  }

  function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLanguage(e.target.value);
  }

  return (
    <div>
      <div className="repo-controls">
        <select value={sortBy} onChange={handleSortChange}>
          <option value="stars">Sort by Stars</option>
          <option value="forks">Sort by Forks</option>
          <option value="updated">Recently Updated</option>
          <option value="name">Name</option>
        </select>

        <select value={language} onChange={handleLanguageChange}>
          <option value="all">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className="repo-grid">
        {filteredAndSorted.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

export default RepoList;