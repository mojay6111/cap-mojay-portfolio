'use client';
import { useEffect, useRef } from 'react';

const projects = [
  {
    file:   'nairobi_housing.py',
    status: { label: '● active', color: 'var(--green)' },
    name:   'Nairobi Housing Price Predictor',
    desc:   'ML regression model that predicts real estate prices across Nairobi neighbourhoods using historical data, feature engineering, and a Streamlit dashboard for interactive exploration.',
    tags:   [
      { label: 'Python',      cls: 'tag-green'  },
      { label: 'Scikit-learn', cls: 'tag-amber' },
      { label: 'Pandas',      cls: 'tag-blue'   },
      { label: 'Streamlit',   cls: 'tag-purple' },
    ],
    github: 'https://github.com/mojay6111',
    demo:   '#',
  },
  {
    file:   'sentiment_pipeline.py',
    status: { label: '● complete', color: 'var(--blue)' },
    name:   'Swahili Sentiment Analyser',
    desc:   'NLP pipeline for classifying sentiment in Swahili social-media text using a fine-tuned transformer model. Includes a FastAPI endpoint and a simple React front-end.',
    tags:   [
      { label: 'Python',       cls: 'tag-green'  },
      { label: 'HuggingFace',  cls: 'tag-amber'  },
      { label: 'FastAPI',      cls: 'tag-blue'   },
      { label: 'React',        cls: 'tag-purple' },
    ],
    github: 'https://github.com/mojay6111',
    demo:   '#',
  },
  {
    file:   'health_dashboard.js',
    status: { label: '● building', color: 'var(--amber)' },
    name:   'County Health Data Dashboard',
    desc:   'Interactive analytics dashboard built for Kenyan county health data — charts, filters, KPI cards, and exportable CSV reports. Inspired by the Ministry of Health attachment.',
    tags:   [
      { label: 'Next.js',   cls: 'tag-green'  },
      { label: 'D3.js',     cls: 'tag-blue'   },
      { label: 'SQL',       cls: 'tag-amber'  },
      { label: 'Tailwind',  cls: 'tag-purple' },
    ],
    github: 'https://github.com/mojay6111',
    demo:   '#',
  },
  {
    file:   'cbet_course_gen.py',
    status: { label: '● complete', color: 'var(--blue)' },
    name:   'CBET Lesson Plan Generator',
    desc:   'Python tool that auto-generates CBET-aligned lesson plans from a topic input, drawing on competency frameworks. Built to speed up curriculum prep at teaching institutions.',
    tags:   [
      { label: 'Python',  cls: 'tag-green'  },
      { label: 'OpenAI',  cls: 'tag-amber'  },
      { label: 'Tkinter', cls: 'tag-blue'   },
      { label: 'PDF',     cls: 'tag-purple' },
    ],
    github: 'https://github.com/mojay6111',
    demo:   '#',
  },
  {
    file:   'student_tracker.sql',
    status: { label: '● complete', color: 'var(--blue)' },
    name:   'Student Performance Tracker',
    desc:   'SQL-powered student analytics system with a Python Flask UI — tracks grades, attendance, and learning outcomes across modules for ICT diploma classes.',
    tags:   [
      { label: 'Python',     cls: 'tag-green'  },
      { label: 'SQL',        cls: 'tag-amber'  },
      { label: 'Flask',      cls: 'tag-blue'   },
      { label: 'Chart.js',   cls: 'tag-purple' },
    ],
    github: 'https://github.com/mojay6111',
    demo:   '#',
  },
  {
    file:   'portfolio_site.tsx',
    status: { label: '● live', color: 'var(--green)' },
    name:   'This Portfolio Site',
    desc:   'Personal portfolio built with Next.js 15, Tailwind CSS, and Framer Motion. Features a terminal aesthetic, MDX blog, GitHub activity graph, and EmailJS contact form.',
    tags:   [
      { label: 'Next.js',  cls: 'tag-green'  },
      { label: 'Tailwind', cls: 'tag-blue'   },
      { label: 'Framer',   cls: 'tag-amber'  },
      { label: 'MDX',      cls: 'tag-purple' },
    ],
    github: 'https://github.com/mojay6111',
    demo:   'https://capmojay.vercel.app',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative z-10">
      <div className="section-wrap">
        <div className="section-header reveal">
          <span className="section-prompt">ls ./projects/ -la</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-line" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <div
              key={i}
              className="project-card terminal-card reveal flex flex-col"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {/* Top bar */}
              <div
                className="terminal-bar flex justify-between"
                style={{ fontSize: '0.75rem' }}
              >
                <span>{p.file}</span>
                <span style={{ color: p.status.color }}>{p.status.label}</span>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-mono font-bold text-sm mb-2">
                  <span style={{ color: 'var(--green)' }}>// </span>
                  <span style={{ color: 'var(--text)' }}>{p.name}</span>
                </h3>
                <p className="font-mono text-xs leading-relaxed mb-4 flex-1" style={{ color: 'var(--muted)' }}>
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {p.tags.map(t => (
                    <span key={t.label} className={`tag ${t.cls}`}>{t.label}</span>
                  ))}
                </div>
                <div className="flex gap-4 font-mono text-xs">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200"
                    style={{ color: 'var(--muted)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                  >
                    ⌥ GitHub
                  </a>
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200"
                    style={{ color: 'var(--muted)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                  >
                    → Live Demo
                  </a>
                </div>
              </div>

              {/* Hover accent bar */}
              <style>{`
                .project-card { position: relative; }
                .project-card::before {
                  content: '';
                  position: absolute; top: 0; left: 0; right: 0; height: 2px;
                  background: var(--green);
                  transform: scaleX(0); transition: transform 0.3s;
                  transform-origin: left;
                }
                .project-card:hover::before { transform: scaleX(1); }
                .project-card:hover { transform: translateY(-4px); }
              `}</style>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-6 text-center reveal" style={{ transitionDelay: '0.5s' }}>
          <a
            href="https://github.com/mojay6111"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ borderColor: 'var(--green)', color: 'var(--green)' }}
          >
            ⌥ View all on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
