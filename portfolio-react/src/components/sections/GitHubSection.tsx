/**
 * GitHubSection Component
 * GitHub stats with Chart.js visualization
 * Top repositories grid
 */

import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useGitHubStats } from '../../hooks/useGitHubStats';
import { SectionReveal } from '../shared/SectionReveal';
import { Card } from '../shared/Card';
import { StarIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const GitHubSection = () => {
  const { stats, loading, error } = useGitHubStats();
  const { theme } = useTheme();
  const [chartKey, setChartKey] = useState(0);

  // Re-render charts when theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      setChartKey((prev) => prev + 1);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  if (loading) {
    return (
      <section id="github" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-text-secondary dark:text-text-dark-secondary">
            Loading GitHub stats...
          </p>
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return null; // Don't show section if data unavailable
  }

  // Theme-aware colors
  const textColor = theme === 'light' ? '#0D0D0D' : '#FDFDFD';
  const borderColor = theme === 'light' ? '#E5E5E5' : '#2A2A2A';

  // Language chart data
  const languageLabels = Object.keys(stats.languageStats).slice(0, 6);
  const languageData = Object.values(stats.languageStats).slice(0, 6);

  const languageChartData = {
    labels: languageLabels,
    datasets: [
      {
        data: languageData,
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(14, 165, 233, 0.8)',
        ],
        borderColor: borderColor,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: textColor,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.label}: ${context.parsed} repos`;
          },
        },
      },
    },
  };

  return (
    <section id="github" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <h2 className="text-4xl font-display font-bold text-text dark:text-text-dark mb-12 text-center">
            GitHub Activity
          </h2>
        </SectionReveal>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <SectionReveal delay={100}>
            <Card variant="glass" className="text-center">
              <div className="text-4xl font-display font-bold text-primary dark:text-primary-dark mb-2">
                {stats.totalRepos}
              </div>
              <div className="text-text-secondary dark:text-text-dark-secondary">
                Public Repositories
              </div>
            </Card>
          </SectionReveal>

          <SectionReveal delay={150}>
            <Card variant="glass" className="text-center">
              <div className="text-4xl font-display font-bold text-primary dark:text-primary-dark mb-2">
                {stats.totalStars}
              </div>
              <div className="text-text-secondary dark:text-text-dark-secondary">
                Total Stars
              </div>
            </Card>
          </SectionReveal>

          <SectionReveal delay={200}>
            <Card variant="glass" className="text-center">
              <div className="text-4xl font-display font-bold text-primary dark:text-primary-dark mb-2">
                {stats.totalForks}
              </div>
              <div className="text-text-secondary dark:text-text-dark-secondary">
                Total Forks
              </div>
            </Card>
          </SectionReveal>
        </div>

        {/* Language chart */}
        <SectionReveal delay={250}>
          <Card variant="glass" className="mb-12">
            <h3 className="text-2xl font-display font-semibold text-text dark:text-text-dark mb-6">
              Most Used Languages
            </h3>
            <div className="h-64">
              <Doughnut key={chartKey} data={languageChartData} options={chartOptions} />
            </div>
          </Card>
        </SectionReveal>

        {/* Top repositories */}
        <SectionReveal delay={300}>
          <h3 className="text-2xl font-display font-semibold text-text dark:text-text-dark mb-6 text-center">
            Top Repositories
          </h3>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.topRepositories.map((repo, index) => (
            <SectionReveal key={repo.id} delay={350 + index * 50} animation="slide-up">
              <Card variant="glass" interactive>
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-lg font-semibold text-text dark:text-text-dark flex-1">
                      {repo.name}
                    </h4>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <ArrowTopRightOnSquareIcon className="w-5 h-5 text-text-secondary dark:text-text-dark-secondary hover:text-primary dark:hover:text-primary-dark" />
                    </a>
                  </div>

                  {repo.description && (
                    <p className="text-sm text-text-secondary dark:text-text-dark-secondary line-clamp-2">
                      {repo.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-sm text-text-secondary dark:text-text-dark-secondary">
                    {repo.language && (
                      <div className="flex items-center gap-1">
                        <CodeBracketIcon className="w-4 h-4" />
                        <span>{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
