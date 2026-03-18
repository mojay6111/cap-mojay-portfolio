'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const experience = [
  {
    role: 'ICT & Computer Science Tutor',
    org:  'Eastlands College of Technology',
    period: 'Sep 2025 – Present',
    color: 'var(--green)',
    desc: 'Teaching Python programming, web development, and data analysis with a CBET approach — blending theory and hands-on practice to prepare students for real tech careers.',
  },
  {
    role: 'Data Science & Web Dev Tutor',
    org:  'Kenya Institute of Development',
    period: 'Apr 2025 – Aug 2025',
    color: 'var(--blue)',
    desc: 'Delivered Python, Graphic Design, ICT L5/L6 modules. Built curriculum around live coding, real-world case studies, and digital creativity tools.',
  },
  {
    role: 'ICT Trainer (Teaching Practice)',
    org:  'The Nairobi National Polytechnic',
    period: 'Jan 2025 – Apr 2025',
    color: 'var(--amber)',
    desc: 'Taught Engineering Mathematics and IT concepts — calculus, algebra, probability, programming foundations — using learner-centered CBET methods.',
  },
  {
    role: 'ICT Attachment — Health Ministry',
    org:  'Kisii County Government',
    period: 'May 2021 – Jul 2021',
    color: 'var(--purple)',
    desc: 'Supported system maintenance, data entry, hardware/software solutions, and network administration within government health information systems.',
  },
];

const education = [
  { degree: 'Data Science, AI & ML', school: 'Moringa School', year: 'Jun 2024 – Apr 2025', color: 'var(--green)' },
  { degree: 'Diploma – Technical Trainer Ed.', school: 'Kenya School of TVET', year: 'Sep 2023 – Apr 2025', color: 'var(--blue)' },
  { degree: 'BSc Computer Science', school: 'Garissa University', year: '2018 – 2022', color: 'var(--amber)' },
];

export default function About() {
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
    <section id="about" ref={sectionRef} className="relative z-10">
      <div className="section-wrap">
        <div className="section-header reveal">
          <span className="section-prompt">cat about.json</span>
          <h2 className="section-title">About Me</h2>
          <div className="section-line" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Profile card */}
          <div className="terminal-card reveal">
            <div className="terminal-bar">
              <span className="t-dot" style={{ background: 'var(--green)' }} />
              <span>profile.json</span>
            </div>
            <div className="p-5 font-mono text-sm space-y-2">
              {[
                { k: '"name"',      v: '"George Mochama Edwin"',        c: 'var(--text)' },
                { k: '"alias"',     v: '"Cap_Mojay{dev}"',              c: 'var(--green)' },
                { k: '"role"',      v: '"Dev · Data Scientist · Tutor"', c: 'var(--text)' },
                { k: '"location"',  v: '"Nairobi, Kenya 🇰🇪"',          c: 'var(--amber)' },
                { k: '"email"',     v: '"edwingeorge521@gmail.com"',    c: 'var(--blue)' },
                { k: '"phone"',     v: '"0792413847"',                  c: 'var(--text)' },
                { k: '"available"', v: 'true',                          c: 'var(--green)' },
                { k: '"coffee"',    v: '"required === true"',           c: 'var(--amber)' },
              ].map(row => (
                <div key={row.k} className="flex">
                  <span style={{ color: 'var(--amber)', minWidth: 130 }}>{row.k}</span>
                  <span style={{ color: 'var(--muted)', margin: '0 8px' }}>:</span>
                  <span style={{ color: row.c }}>{row.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bio card */}
          <div className="terminal-card reveal" style={{ transitionDelay: '0.12s' }}>
            <div className="terminal-bar">
              <span className="t-dot" style={{ background: 'var(--blue)' }} />
              <span>summary.txt</span>
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed space-y-3" style={{ color: 'var(--muted)' }}>
              <p>
                I'm a versatile technologist who bridges the gap between{' '}
                <span style={{ color: 'var(--green)' }}>data science</span>,{' '}
                <span style={{ color: 'var(--blue)' }}>software development</span>, and{' '}
                <span style={{ color: 'var(--amber)' }}>education</span>.
              </p>
              <p>
                With a BSc in Computer Science from Garissa University and a Moringa School
                Data Science & ML certification, I combine technical depth with a passion
                for lifelong learning and knowledge-sharing.
              </p>
              <p>
                I thrive at the intersection of analysing models and guiding learners through
                the logic of programming — detail-oriented, curious, and always thinking about impact.
              </p>
              <div className="pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--amber)' }}>// currently learning:</span>
                <br />
                <span style={{ color: 'var(--text)' }}>MLOps · LLM fine-tuning · System Design</span>
              </div>
            </div>
          </div>
        </div>

        {/* Experience timeline */}
        <div className="terminal-card reveal mb-6" style={{ transitionDelay: '0.2s' }}>
          <div className="terminal-bar">
            <span className="t-dot" style={{ background: 'var(--amber)' }} />
            <span>experience.log</span>
          </div>
          <div className="p-5">
            <div className="space-y-5">
              {experience.map((e, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ background: e.color }} />
                    {i < experience.length - 1 && (
                      <span className="w-px flex-1 mt-1" style={{ background: 'var(--border)' }} />
                    )}
                  </div>
                  <div className="pb-2">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono font-semibold text-sm" style={{ color: 'var(--text)' }}>{e.role}</span>
                      <span className="tag" style={{ fontSize: '0.7rem' }}>{e.period}</span>
                    </div>
                    <div className="font-mono text-xs mb-1" style={{ color: e.color }}>{e.org}</div>
                    <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="terminal-card reveal" style={{ transitionDelay: '0.28s' }}>
          <div className="terminal-bar">
            <span className="t-dot" style={{ background: 'var(--purple)' }} />
            <span>education.json</span>
          </div>
          <div className="p-5 grid md:grid-cols-3 gap-4">
            {education.map((e, i) => (
              <div key={i} className="p-3 rounded-lg" style={{ background: 'var(--bg3)', border: '1px solid var(--border)' }}>
                <div className="font-mono font-semibold text-sm mb-1" style={{ color: e.color }}>{e.degree}</div>
                <div className="font-mono text-xs mb-1" style={{ color: 'var(--text)' }}>{e.school}</div>
                <div className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{e.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
