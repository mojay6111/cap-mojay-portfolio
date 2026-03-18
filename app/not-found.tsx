import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center" style={{ paddingTop: '52px' }}>
      <div className="terminal-card max-w-lg w-full mx-4">
        <div className="terminal-bar">
          <span className="t-dot" style={{ background: '#ff5f57' }} />
          <span className="t-dot" style={{ background: '#febc2e' }} />
          <span className="t-dot" style={{ background: '#28c840' }} />
          <span className="ml-2">404.sh</span>
        </div>
        <div className="p-8 font-mono text-center">
          <div className="text-6xl font-bold mb-4" style={{ color: 'var(--red)' }}>404</div>
          <div className="text-sm mb-2" style={{ color: 'var(--muted)' }}>
            <span style={{ color: 'var(--green-dim)' }}>~/</span>
            <span style={{ color: 'var(--muted)' }}> $ </span>
            <span style={{ color: 'var(--text)' }}>cd this-page</span>
          </div>
          <div className="text-sm mb-6" style={{ color: 'var(--red)' }}>
            bash: this-page: No such file or directory
          </div>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
            Looks like this page doesn&apos;t exist yet. Let&apos;s get you back on track.
          </p>
          <Link href="/" className="btn btn-primary">
            $ cd ~/home
          </Link>
        </div>
      </div>
    </main>
  );
}
