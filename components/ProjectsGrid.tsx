import { getProjects, type EnrichedRepo } from '@/lib/github';
import ProjectCard from './ProjectCard';

export default async function ProjectsGrid() {
  const projects = await getProjects();

  if (!projects.length) {
    return (
      <div className="terminal-card p-8 text-center font-mono text-sm" style={{ color: 'var(--muted)' }}>
        <span style={{ color: 'var(--red)' }}>// </span>
        Could not load projects from GitHub. Check back soon.
      </div>
    );
  }

  const pinned   = projects.filter(p => p.isPinned);
  const rest     = projects.filter(p => !p.isPinned);

  return (
    <div>
      {/* Pinned repos */}
      {pinned.length > 0 && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs" style={{ color: 'var(--amber)' }}>
              📌 pinned
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {pinned.map(repo => (
              <ProjectCard key={repo.id} repo={repo} pinned />
            ))}
          </div>
        </>
      )}

      {/* All other repos */}
      {rest.length > 0 && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
              // all repositories
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map(repo => (
              <ProjectCard key={repo.id} repo={repo} pinned={false} />
            ))}
          </div>
        </>
      )}

      {/* GitHub CTA */}
      <div className="mt-8 text-center pb-8">
        <a
          href={`https://github.com/mojay6111`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
          style={{ borderColor: 'var(--green)', color: 'var(--green)' }}
        >
          ⌥ View all on GitHub
        </a>
      </div>
    </div>
  );
}
