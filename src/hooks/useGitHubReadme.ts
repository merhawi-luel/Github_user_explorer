import { useState, useEffect } from "react";
import type { ApiState } from "../types/github";
import { useRateLimit } from "./useRateLimit";

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
  const { updateFromHeaders } = useRateLimit();

  useEffect(() => {
    if (!username || !repoName) return;

    async function fetchReadme() {
      setState({ data: null, loading: true, error: null });

      try {
        const res = await fetch(
          `https://api.github.com/repos/${username}/${repoName}/readme`
        );
        updateFromHeaders(res.headers);

        if (!res.ok) {
          setState({ data: null, loading: false, error: "No README found" });
          return;
        }

        const json: ReadmeResponse = await res.json();
        const decoded = decodeBase64Utf8(json.content);
        setState({ data: decoded, loading: false, error: null });
      } catch (err) {
        setState({ data: null, loading: false, error: "Something went wrong" });
      }
    }

    fetchReadme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, repoName]);

  return state;
}

function decodeBase64Utf8(base64: string): string {
  const cleaned = base64.replace(/\n/g, "");
  const binary = atob(cleaned);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}