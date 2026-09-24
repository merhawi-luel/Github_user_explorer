import { createContext, useContext, useState, type ReactNode } from "react";
import { createElement } from "react";

interface RateLimitState {
  remaining: number | null;
  limit: number | null;
  resetAt: Date | null;
}

interface RateLimitContextValue extends RateLimitState {
  updateFromHeaders: (headers: Headers) => void;
}

const RateLimitContext = createContext<RateLimitContextValue | null>(null);

export function RateLimitProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RateLimitState>({
    remaining: null,
    limit: null,
    resetAt: null,
  });

  function updateFromHeaders(headers: Headers) {
    const remaining = headers.get("x-ratelimit-remaining");
    const limit = headers.get("x-ratelimit-limit");
    const reset = headers.get("x-ratelimit-reset");

    if (remaining === null || limit === null || reset === null) return;

    setState({
      remaining: Number(remaining),
      limit: Number(limit),
      resetAt: new Date(Number(reset) * 1000),
    });
  }

  return createElement(
    RateLimitContext.Provider,
    { value: { ...state, updateFromHeaders } },
    children
  );
}

export function useRateLimit(): RateLimitContextValue {
  const ctx = useContext(RateLimitContext);
  if (!ctx) {
    throw new Error("useRateLimit must be used within a RateLimitProvider");
  }
  return ctx;
}