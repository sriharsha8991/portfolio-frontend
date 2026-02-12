/**
 * useGitHubStats Hook
 * Fetch GitHub profile data with caching and error handling
 */

import { useState, useEffect } from 'react';
import CONFIG from '../config';
import type { GitHubUser, GitHubRepository, GitHubStats, GitHubError } from '../types/github';

const CACHE_KEY = 'github_stats_cache';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

interface CachedData {
  stats: GitHubStats;
  timestamp: number;
}

export function useGitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<GitHubError | null>(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      const config = CONFIG.getConfig();
      
      if (!config.features.githubStatsEnabled) {
        setLoading(false);
        return;
      }

      // Check cache first
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const cachedData: CachedData = JSON.parse(cached);
          const age = Date.now() - cachedData.timestamp;
          
          if (age < CACHE_DURATION) {
            setStats(cachedData.stats);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error('Cache read error:', err);
      }

      // Fetch fresh data
      try {
        const username = config.github.username;
        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json',
        };

        // Add token if available (increases rate limit)
        if (config.github.token) {
          headers['Authorization'] = `token ${config.github.token}`;
        }

        // Fetch user profile
        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
          headers,
        });

        if (!userResponse.ok) {
          if (userResponse.status === 403) {
            throw new Error('Rate limit exceeded. Please try again later.');
          }
          throw new Error(`Failed to fetch GitHub user: ${userResponse.status}`);
        }

        const user: GitHubUser = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
          { headers }
        );

        if (!reposResponse.ok) {
          throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
        }

        const repos: GitHubRepository[] = await reposResponse.json();

        // Calculate language stats
        const languageStats: Record<string, number> = {};
        repos.forEach((repo) => {
          if (repo.language) {
            languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
          }
        });

        // Get top repositories (by stars)
        const topRepos = repos
          .filter((repo) => !repo.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, config.github.reposPerPage);

        const githubStats: GitHubStats = {
          user,
          totalRepos: user.public_repos,
          totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
          totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
          languageStats,
          topRepositories: topRepos,
        };

        // Update state
        setStats(githubStats);
        setError(null);

        // Cache the results
        try {
          const cacheData: CachedData = {
            stats: githubStats,
            timestamp: Date.now(),
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        } catch (err) {
          console.error('Cache write error:', err);
        }
      } catch (err) {
        console.error('GitHub fetch error:', err);
        setError({
          message: err instanceof Error ? err.message : 'Failed to fetch GitHub stats',
          statusCode: 500,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  return { stats, loading, error };
}

export default useGitHubStats;
