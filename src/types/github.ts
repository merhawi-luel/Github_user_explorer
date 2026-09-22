
export interface GitHubUser {
  login: string;         
  id: number;
  avatar_url: string;
  name: string | null;   
  bio: string | null;
  location: string | null;
  company: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;     
  html_url: string;       
}

// src/types/github.ts (continued)

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;   // null when no description set
  html_url: string;
  language: string | null;      // null when GitHub can't detect one
  stargazers_count: number;
  forks_count: number;
  updated_at: string;           // ISO date string
  topics: string[];             // always an array, can be empty
}

// src/types/github.ts (continued)

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}