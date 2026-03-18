'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

const links = [
  { href: '#about',    label: 'about'    },
  { href: '#skills',   label: 'skills'   },
  { href: '#projects', label: 'projects' },
  { href: '#blog',     label: 'blog'     },
  { href: '#contact',  label: 'contact'  },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [active, setActive]   = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(s => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 90)
          setActive(s.id);
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-[52px]"
      style={{
        background: scrolled ? 'rgba(13,17,23,0.9)' : 'rgba(13,17,23,0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        transition: 'background 0.3s',
      }}
    >
      {/* Logo */}
      <Link href="/" className="font-mono font-bold text-sm tracking-tight select-none">
        <span style={{ color: 'var(--green)' }}>Cap_</span>
        <span style={{ color: 'var(--text)' }}>Mojay</span>
        <span style={{ color: 'var(--amber)' }}>{'{dev}'}</span>
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-7 list-none">
        {links.map(l => (
          <li key={l.href}>
            <a
              href={l.href}
              className="font-mono text-xs transition-colors duration-200"
              style={{ color: active === l.href.slice(1) ? 'var(--green)' : 'var(--muted)' }}
            >
              {active === l.href.slice(1) && (
                <span style={{ color: 'var(--green-dim)', marginRight: 2 }}>~/</span>
              )}
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Status */}
        <div className="hidden md:flex items-center gap-2 font-mono text-xs" style={{ color: 'var(--muted)' }}>
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: 'var(--green)', animation: 'pulse-dot 2s ease-in-out infinite' }}
          />
          available
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="font-mono text-xs px-3 py-1 rounded-md border transition-all"
          style={{
            border: '1px solid var(--border)',
            color: 'var(--muted)',
            background: 'transparent',
          }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀ light' : '◑ dark'}
        </button>

        {/* CV Download */}
        <a
          href="/cv.pdf"
          download="George_Edwin_CV.pdf"
          className="hidden md:inline-flex btn btn-primary text-xs py-1 px-3"
        >
          ↓ CV
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden font-mono text-xs"
          style={{ color: 'var(--green)' }}
          onClick={() => setMenuOpen(o => !o)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-[52px] left-0 right-0 md:hidden"
          style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}
        >
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-3 font-mono text-sm border-b"
              style={{ borderColor: 'var(--border)', color: active === l.href.slice(1) ? 'var(--green)' : 'var(--muted)' }}
            >
              ~/&nbsp;{l.label}
            </a>
          ))}
          <a
            href="/cv.pdf"
            download
            className="block px-6 py-3 font-mono text-sm"
            style={{ color: 'var(--amber)' }}
          >
            ↓ Download CV
          </a>
        </div>
      )}
    </nav>
  );
}
