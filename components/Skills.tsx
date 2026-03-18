'use client';
import { useEffect, useRef } from 'react';

const skillGroups = [
  {
    file: 'languages.sh',
    color: 'var(--green)',
    label: 'Languages & Markup',
    skills: [
      { name: 'Python',       pct: 88, color: 'var(--green)' },
      { name: 'SQL',          pct: 82, color: 'var(--amber)' },
      { name: 'HTML / CSS',   pct: 85, color: 'var(--blue)' },
      { name: 'JavaScript',   pct: 68, color: 'var(--purple)' },
    ],
  },
  {
    file: 'data_science.sh',
    color: 'var(--blue)',
    label: 'Data Science & ML',
    skills: [
      { name: 'Pandas / NumPy',        pct: 86, color: 'var(--green)' },
      { name: 'Scikit-learn',          pct: 82, color: 'var(--blue)' },
      { name: 'TensorFlow / Keras',    pct: 74, color: 'var(--amber)' },
      { name: 'Data Visualisation',    pct: 84, color: 'var(--purple)' },
    ],
  },
  {
    file: 'tools.sh',
    color: 'var(--amber)',
    label: 'Tools & Platforms',
    skills: [
      { name: 'Jupyter / Colab',  pct: 90, color: 'var(--green)' },
      { name: 'Excel / Sheets',   pct: 85, color: 'var(--amber)' },
      { name: 'Git / GitHub',     pct: 80, color: 'var(--blue)' },
      { name: 'Network Support',  pct: 72, color: 'var(--purple)' },
    ],
  },
  {
    file: 'teaching.sh',
    color: 'var(--purple)',
    label: 'Teaching & Curriculum',
    skills: [
      { name: 'CBET Curriculum Design', pct: 88, color: 'var(--green)' },
      { name: 'Python for Beginners',   pct: 92, color: 'var(--blue)' },
      { name: 'Engineering Maths',      pct: 80, color: 'var(--amber)' },
      { name: 'Digital Literacy / ICT', pct: 87, color: 'var(--purple)' },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          // Animate bars inside this card
          (e.target as HTMLElement).querySelectorAll<HTMLElement>('[data-width]').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
          });
        }
      });
    }, { threshold: 0.2 });

    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative z-10">
      <div className="section-wrap">
        <div className="section-header reveal">
          <span className="section-prompt">ls ./skills/ -la</span>
          <h2 className="section-title">Skills & Tools</h2>
          <div className="section-line" />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {skillGroups.map((group, gi) => (
            <div
              key={gi}
              className="terminal-card reveal"
              style={{ transitionDelay: `${gi * 0.1}s` }}
            >
              <div className="terminal-bar">
                <span className="t-dot" style={{ background: group.color }} />
                <span>{group.file}</span>
              </div>
              <div className="p-5">
                <div
                  className="font-mono text-xs mb-4 flex items-center gap-2"
                  style={{ color: 'var(--muted)' }}
                >
                  {group.label}
                  <span className="flex-1 h-px" style={{ background: 'var(--border)' }} />
                </div>
                <div className="space-y-4">
                  {group.skills.map((s, si) => (
                    <div key={si}>
                      <div className="flex justify-between font-mono text-xs mb-1">
                        <span style={{ color: 'var(--text)' }}>{s.name}</span>
                        <span style={{ color: 'var(--green-dim)' }}>{s.pct}%</span>
                      </div>
                      <div className="skill-bar">
                        <div
                          className="skill-fill"
                          data-width={s.pct}
                          style={{ background: s.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tech badge cloud */}
        <div className="terminal-card reveal mt-5" style={{ transitionDelay: '0.4s' }}>
          <div className="terminal-bar">
            <span className="t-dot" style={{ background: 'var(--green)' }} />
            <span>tech_stack.txt</span>
          </div>
          <div className="p-5 flex flex-wrap gap-2">
            {[
              { label: 'Python',       cls: 'tag-green'  },
              { label: 'SQL',          cls: 'tag-blue'   },
              { label: 'HTML/CSS',     cls: 'tag-amber'  },
              { label: 'JavaScript',   cls: 'tag-purple' },
              { label: 'Pandas',       cls: 'tag-green'  },
              { label: 'NumPy',        cls: 'tag-blue'   },
              { label: 'Scikit-learn', cls: 'tag-amber'  },
              { label: 'TensorFlow',   cls: 'tag-purple' },
              { label: 'Matplotlib',   cls: 'tag-green'  },
              { label: 'Seaborn',      cls: 'tag-blue'   },
              { label: 'Jupyter',      cls: 'tag-amber'  },
              { label: 'Git',          cls: 'tag-purple' },
              { label: 'GitHub',       cls: 'tag-green'  },
              { label: 'Excel',        cls: 'tag-blue'   },
              { label: 'Colab',        cls: 'tag-amber'  },
              { label: 'FastAPI',      cls: 'tag-purple' },
              { label: 'Next.js',      cls: 'tag-green'  },
              { label: 'Tailwind',     cls: 'tag-blue'   },
              { label: 'Docker',       cls: 'tag-amber'  },
              { label: 'LAN / WAN',    cls: 'tag-purple' },
            ].map(t => (
              <span key={t.label} className={`tag ${t.cls}`}>{t.label}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
