import { useState, useEffect } from "react";
import type { GitHubUser, ApiState } from "../types/github";
import { useRateLimit } from "./useRateLimit";

export function useGitHubUser(username: string): ApiState<GitHubUser> {
  const [state, setState] = useState<ApiState<GitHubUser>>({
    data: null,
    loading: false,
    error: null,
  });
  const { updateFromHeaders } = useRateLimit();

  useEffect(() => {
    if (!username) return;

    async function fetchUser() {
      setState({ data: null, loading: true, error: null });

      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        updateFromHeaders(res.headers);

        if (!res.ok) {
          setState({ data: null, loading: false, error: "User not found" });
          return;
        }

        const data: GitHubUser = await res.json();
        setState({ data, loading: false, error: null });
      } catch (err) {
        setState({ data: null, loading: false, error: "Something went wrong" });
      }
    }

    fetchUser();
  }, [username]);

  return state;
}