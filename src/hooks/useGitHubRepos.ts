import { useState, useEffect } from "react";
import type { GitHubRepo, ApiState } from "../types/github";
import { useRateLimit } from "./useRateLimit";

export function useGitHubRepos(username: string): ApiState<GitHubRepo[]> {
  const [state, setState] = useState<ApiState<GitHubRepo[]>>({
    data: null,
    loading: false,
    error: null,
  });
  const { updateFromHeaders } = useRateLimit();

  useEffect(() => {
    if (!username) return;

    async function fetchRepos() {
      setState({ data: null, loading: true, error: null });

      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );
        updateFromHeaders(res.headers);

        if (!res.ok) {
          setState({ data: null, loading: false, error: "Could not load repositories" });
          return;
        }

        const data: GitHubRepo[] = await res.json();
        setState({ data, loading: false, error: null });
      } catch (err) {
        setState({ data: null, loading: false, error: "Something went wrong" });
      }
    }

    fetchRepos();
  }, [username]);

  return state;
}