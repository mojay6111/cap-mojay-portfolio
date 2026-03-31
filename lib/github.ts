import deployOverrides from '@/data/deploy-overrides';

const GITHUB_USERNAME = 'mojay6111';
const GITHUB_API      = 'https://api.github.com';

export interface GitHubRepo {
  id:               number;
  name:             string;
  full_name:        string;
  description:      string | null;
  html_url:         string;
  homepage:         string | null;
  language:         string | null;
  languages_url:    string;
  stargazers_count: number;
  forks_count:      number;
  updated_at:       string;
  topics:           string[];
  fork:             boolean;
  archived:         boolean;
  visibility:       string;
}

export interface EnrichedRepo extends GitHubRepo {
  languages:   Record<string, number>;
  deploy_url:  string | null;
  platform:    'vercel' | 'render' | 'other' | null;
  isPinned:    boolean;
}

// Fetch all public repos
async function fetchRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=public`,
    {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 }, // cache for 1 hour
    }
  );
  if (!res.ok) return [];
  const repos: GitHubRepo[] = await res.json();
  return repos.filter(r => !r.fork && !r.archived);
}

// Fetch languages for a single repo
async function fetchLanguages(repo: GitHubRepo): Promise<Record<string, number>> {
  try {
    const res = await fetch(repo.languages_url, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return {};
    return res.json();
  } catch {
    return {};
  }
}

// Fetch pinned repos via GitHub GraphQL API
async function fetchPinnedRepos(): Promise<string[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return [];

  const query = `{
    user(login: "${GITHUB_USERNAME}") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository { name }
        }
      }
    }
  }`;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:  `bearer ${token}`,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data?.user?.pinnedItems?.nodes?.map((n: any) => n.name) ?? [];
  } catch {
    return [];
  }
}

// Main export — enriched repos, pinned first
export async function getProjects(): Promise<EnrichedRepo[]> {
  const [repos, pinnedNames] = await Promise.all([
    fetchRepos(),
    fetchPinnedRepos(),
  ]);

  // Fetch languages for all repos in parallel (cap at 12 to avoid rate limits)
  const topRepos   = repos.slice(0, 12);
  const langArrays = await Promise.all(topRepos.map(fetchLanguages));

  const enriched: EnrichedRepo[] = topRepos.map((repo, i) => {
    const override = deployOverrides[repo.name];
    return {
      ...repo,
      languages:  langArrays[i],
      deploy_url: override?.url  ?? repo.homepage ?? null,
      platform:   override?.platform ?? (repo.homepage ? 'other' : null),
      isPinned:   pinnedNames.includes(repo.name),
    };
  });

  // Pinned repos first, then by updated_at
  return enriched.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return  1;
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });
}
