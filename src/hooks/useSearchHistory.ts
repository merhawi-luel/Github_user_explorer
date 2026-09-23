import { useState, useEffect } from "react";

const STORAGE_KEY = "github-explorer-search-history";
const MAX_HISTORY = 10;

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      const parsed: unknown = JSON.parse(stored);
      return Array.isArray(parsed) ? (parsed as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  function addSearch(username: string) {
    setHistory((prev) => {
      const withoutDupe = prev.filter((name) => name !== username);
      const updated = [username, ...withoutDupe];
      return updated.slice(0, MAX_HISTORY);
    });
  }

  function clearHistory() {
    setHistory([]);
  }

  return { history, addSearch, clearHistory };
}