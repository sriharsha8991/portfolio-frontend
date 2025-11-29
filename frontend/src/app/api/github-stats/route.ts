import { getGitHubStats } from "@/lib/github";
import { NextResponse } from "next/server";

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const stats = await getGitHubStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      {
        lastMonth: 0,
        lastYear: 0,
        totalRepos: 0,
        followers: 0,
        contributionGraph: [],
      },
      { status: 500 }
    );
  }
}
