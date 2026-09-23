// src/components/RepoList.tsx
import { useState, useMemo } from "react";
import type { GitHubRepo } from "../types/github";
import { sortRepos, type SortOption } from "../utils/repoSort";
import RepoCard from "./RepoCard";
import SortSelect from "./SortSelect";
import LanguageFilter from "./LanguageFilter";

interface RepoListProps {
  repos: GitHubRepo[];
  username: string;
}

function RepoList({ repos, username }: RepoListProps) {
  const [sortBy, setSortBy] = useState<SortOption>("stars");
  const [language, setLanguage] = useState<string>("all");

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

  return (
    <div>
      <div className="repo-controls">
        <SortSelect value={sortBy} onChange={setSortBy} />
        <LanguageFilter languages={languages} value={language} onChange={setLanguage} />
      </div>

      <div className="repo-grid">
        {filteredAndSorted.map((repo) => (
          <RepoCard key={repo.id} repo={repo} username={username} />
        ))}
      </div>
    </div>
  );
}

export default RepoList;