/**
 * GitHub API-related TypeScript interfaces
 */

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
  created_at: string;
  updated_at: string;
  html_url: string;
  blog: string;
  location: string;
  email: string | null;
  company: string | null;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  visibility: string;
  default_branch: string;
}

export interface GitHubStats {
  user: GitHubUser;
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  languageStats: {
    [language: string]: number;
  };
  topRepositories: GitHubRepository[];
}

export interface GitHubError {
  message: string;
  documentation_url?: string;
  status?: number;
  statusCode?: number;
}
