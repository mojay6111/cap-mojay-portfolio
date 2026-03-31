'use client';
import type { EnrichedRepo } from '@/lib/github';

// Language → colour mapping
const LANG_COLORS: Record<string, string> = {
  Python:      '#3572A5',
  JavaScript:  '#f1e05a',
  TypeScript:  '#3178c6',
  HTML:        '#e34c26',
  CSS:         '#563d7c',
  Shell:       '#89e051',
  Jupyter:     '#DA5B0B',
  Dockerfile:  '#384d54',
  MDX:         '#fcb32c',
  default:     '#8b949e',
};

function langColor(lang: string) {
  return LANG_COLORS[lang] ?? LANG_COLORS.default;
}

function platformLabel(platform: string | null) {
  if (platform === 'vercel') return { label: 'Vercel', color: 'var(--text)' };
  if (platform === 'render') return { label: 'Render', color: 'var(--blue)' };
  return { label: 'Live',   color: 'var(--green)' };
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days  = Math.floor(diff / 86400000);
  if (days < 1)  return 'today';
  if (days < 7)  return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

// Top 3 languages as percentage bar
function LanguageBar({ languages }: { languages: Record<string, number> }) {
  const entries = Object.entries(languages);
  if (!entries.length) return null;
  const total = entries.reduce((s, [, v]) => s + v, 0);
  const top3  = entries.slice(0, 3);

  return (
    <div>
      {/* Stacked bar */}
      <div style={{ display: 'flex', height: '4px', borderRadius: '2px', overflow: 'hidden', marginBottom: '6px' }}>
        {top3.map(([lang, bytes]) => (
          <div
            key={lang}
            style={{
              width:      `${(bytes / total) * 100}%`,
              background: langColor(lang),
            }}
          />
        ))}
      </div>
      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {top3.map(([lang, bytes]) => (
          <span
            key={lang}
            className="font-mono"
            style={{ fontSize: '0.65rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: langColor(lang), display: 'inline-block' }} />
            {lang}
            <span style={{ color: 'var(--border)' }}>{Math.round((bytes / total) * 100)}%</span>
          </span>
        ))}
      </div>
    </div>
  );
}

interface Props {
  repo:   EnrichedRepo;
  pinned: boolean;
}

export default function ProjectCard({ repo, pinned }: Props) {
  const deploy = repo.deploy_url ? platformLabel(repo.platform) : null;

  return (
    <div
      className="terminal-card flex flex-col"
      style={{ position: 'relative', transition: 'all 0.3s' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform     = 'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.borderColor   = 'rgba(0,255,136,0.35)';
        (e.currentTarget as HTMLDivElement).style.boxShadow     = '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,255,136,0.06)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform   = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLDivElement).style.boxShadow   = 'none';
      }}
    >
      {/* Top accent bar on hover — CSS only */}
      <style>{`
        .proj-accent { position:absolute; top:0; left:0; right:0; height:2px; background:var(--green); transform:scaleX(0); transition:transform 0.3s; transform-origin:left; }
        .terminal-card:hover .proj-accent { transform:scaleX(1); }
      `}</style>
      <div className="proj-accent" />

      {/* Terminal bar */}
      <div className="terminal-bar" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="t-dot" style={{ background: pinned ? 'var(--amber)' : 'var(--green)' }} />
          <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.72rem' }}>
            {repo.name}.{repo.language?.toLowerCase() === 'python' ? 'py'
              : repo.language?.toLowerCase() === 'typescript' ? 'ts'
              : repo.language?.toLowerCase() === 'javascript' ? 'js'
              : 'sh'}
          </span>
        </div>
        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.68rem', color: 'var(--muted)' }}>
          ↺ {timeAgo(repo.updated_at)}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>

        {/* Name */}
        <h3 style={{ fontFamily: 'Fira Code, monospace', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', margin: 0 }}>
          <span style={{ color: 'var(--green)' }}>// </span>
          {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
        </h3>

        {/* Description */}
        <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.7, margin: 0, flex: 1 }}>
          {repo.description ?? '// no description yet — check the repo'}
        </p>

        {/* Topics as tags */}
        {repo.topics.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {repo.topics.slice(0, 5).map(t => (
              <span
                key={t}
                className="tag"
                style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.65rem' }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Language bar */}
        <LanguageBar languages={repo.languages} />

        {/* Stars + forks */}
        {(repo.stargazers_count > 0 || repo.forks_count > 0) && (
          <div style={{ display: 'flex', gap: '12px', fontFamily: 'Fira Code, monospace', fontSize: '0.7rem', color: 'var(--muted)' }}>
            {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
            {repo.forks_count > 0      && <span>⑂ {repo.forks_count}</span>}
          </div>
        )}

        {/* Links */}
        <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '10px', marginTop: 'auto' }}>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono"
            style={{ fontSize: '0.75rem', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            ⌥ GitHub
          </a>

          {deploy && repo.deploy_url && (
            <a
              href={repo.deploy_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono"
              style={{ fontSize: '0.75rem', color: deploy.color, textDecoration: 'none', transition: 'color 0.2s', marginLeft: 'auto' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
              onMouseLeave={e => (e.currentTarget.style.color = deploy.color)}
            >
              → {deploy.label} ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
