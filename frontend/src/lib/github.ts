// GitHub API service for fetching contribution stats

export interface GitHubStats {
  lastMonth: number;
  lastYear: number;
  totalRepos: number;
  followers: number;
  contributionGraph: number[];
}

interface GitHubUser {
  public_repos: number;
  followers: number;
}

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionsCollection {
  totalContributions: number;
  weeks: ContributionWeek[];
}

interface GraphQLResponse {
  data: {
    user: {
      contributionsCollection: ContributionsCollection;
    };
  };
}

const GITHUB_USERNAME = "sriharsha8991";

// Fetch basic user stats from REST API (public data, no token needed)
async function fetchUserStats(): Promise<{ repos: number; followers: number }> {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user stats");
    }

    const data: GitHubUser = await response.json();
    return {
      repos: data.public_repos,
      followers: data.followers,
    };
  } catch (error) {
    console.error("Error fetching GitHub user stats:", error);
    return { repos: 0, followers: 0 };
  }
}

// Fetch contribution data using GitHub GraphQL API
async function fetchContributions(): Promise<{
  lastYear: number;
  lastMonth: number;
  graph: number[];
}> {
  const token = process.env.GITHUB_TOKEN;
  
  // If no token, use the contributions scraper API (public contributions only)
  if (!token) {
    return fetchContributionsFromScraper();
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch contributions");
    }

    const data: GraphQLResponse = await response.json();
    const collection = data.data.user.contributionsCollection;
    
    // Calculate last month contributions
    const weeks = collection.weeks;
    const lastMonthContributions = weeks
      .slice(-5) // Last ~5 weeks
      .flatMap((w) => w.contributionDays)
      .reduce((sum, day) => sum + day.contributionCount, 0);

    // Generate contribution graph data (last 72 cells for our 12x6 grid)
    const allDays = weeks.flatMap((w) => w.contributionDays);
    const last72Days = allDays.slice(-72);
    const graph = last72Days.map((day) => {
      const count = day.contributionCount;
      if (count === 0) return 0;
      if (count <= 3) return 1;
      if (count <= 6) return 2;
      return 3;
    });

    return {
      lastYear: collection.totalContributions,
      lastMonth: lastMonthContributions,
      graph,
    };
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return fetchContributionsFromScraper();
  }
}

// Fallback: Use public contributions scraper
async function fetchContributionsFromScraper(): Promise<{
  lastYear: number;
  lastMonth: number;
  graph: number[];
}> {
  try {
    // Using a public contributions API
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error("Scraper API failed");
    }

    const data = await response.json();
    const contributions = data.contributions || [];
    
    // Calculate totals
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    
    let lastYear = 0;
    let lastMonth = 0;
    
    contributions.forEach((day: { date: string; count: number }) => {
      lastYear += day.count;
      if (new Date(day.date) >= oneMonthAgo) {
        lastMonth += day.count;
      }
    });

    // Generate graph data
    const last72 = contributions.slice(-72);
    const graph = last72.map((day: { count: number }) => {
      const count = day.count;
      if (count === 0) return 0;
      if (count <= 3) return 1;
      if (count <= 6) return 2;
      return 3;
    });

    return { lastYear, lastMonth, graph };
  } catch (error) {
    console.error("Error fetching from scraper:", error);
    // Return placeholder data
    return {
      lastYear: 0,
      lastMonth: 0,
      graph: Array(72).fill(0).map(() => Math.floor(Math.random() * 4)),
    };
  }
}

// Main function to get all GitHub stats
export async function getGitHubStats(): Promise<GitHubStats> {
  const [userStats, contributions] = await Promise.all([
    fetchUserStats(),
    fetchContributions(),
  ]);

  return {
    lastMonth: contributions.lastMonth,
    lastYear: contributions.lastYear,
    totalRepos: userStats.repos,
    followers: userStats.followers,
    contributionGraph: contributions.graph,
  };
}

// Client-side hook for fetching stats
export async function fetchGitHubStatsClient(): Promise<GitHubStats> {
  try {
    const response = await fetch("/api/github-stats");
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch {
    // Fallback to direct fetch (may have CORS issues)
    return getGitHubStats();
  }
}
