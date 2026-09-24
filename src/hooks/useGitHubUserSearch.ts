import { useState, useEffect } from "react";
import type { GitHubUserSearchResult, GitHubUserSearchResponse, ApiState } from "../types/github";
import { useRateLimit } from "./useRateLimit";

export function useGitHubUserSearch(query: string): ApiState<GitHubUserSearchResult[]> {
  const [state, setState] = useState<ApiState<GitHubUserSearchResult[]>>({
    data: null,
    loading: false,
    error: null,
  });
  const { updateFromHeaders } = useRateLimit();

  useEffect(() => {
    if (!query.trim()) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    async function search() {
      setState({ data: null, loading: true, error: null });

      try {
        const res = await fetch(
          `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=10`
        );
        updateFromHeaders(res.headers);

        if (!res.ok) {
          setState({ data: null, loading: false, error: "Search failed" });
          return;
        }

        const json: GitHubUserSearchResponse = await res.json();
        setState({ data: json.items, loading: false, error: null });
      } catch (err) {
        setState({ data: null, loading: false, error: "Something went wrong" });
      }
    }

    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return state;
}