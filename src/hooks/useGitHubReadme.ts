import { useState, useEffect } from "react";
import type { ApiState } from "../types/github";

interface ReadmeResponse {
  content: string;   
  encoding: string;  
}

export function useGitHubReadme(username: string, repoName: string): ApiState<string> {
  const [state, setState] = useState<ApiState<string>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!username || !repoName) return;

    async function fetchReadme() {
      setState({ data: null, loading: true, error: null });

      try {
        const res = await fetch(
          `https://api.github.com/repos/${username}/${repoName}/readme`
        );

        if (!res.ok) {
          setState({ data: null, loading: false, error: "No README found" });
          return;
        }

        const json: ReadmeResponse = await res.json();
        const decoded = atob(json.content.replace(/\n/g, ""));
        setState({ data: decoded, loading: false, error: null });
      } catch (err) {
        setState({ data: null, loading: false, error: "Something went wrong" });
      }
    }

    fetchReadme();
  }, [username, repoName]);

  return state;
}