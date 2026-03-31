import type { Metadata } from 'next';
import ProjectsGrid from '@/components/ProjectsGrid';

export const metadata: Metadata = {
  title: 'Projects — Cap_Mojay{dev}',
  description: 'Real-world projects by George Mochama Edwin — data science, web development, and ML systems.',
};

export default function ProjectsPage() {
  return (
    <main className="relative z-10 min-h-screen" style={{ paddingTop: '52px' }}>
      <div className="section-wrap">
        <div className="section-header" style={{ marginTop: '2rem' }}>
          <span className="section-prompt">ls ./projects/ -la</span>
          <h1 className="section-title">Projects</h1>
          <div className="section-line" />
        </div>
        <ProjectsGrid />
      </div>
    </main>
  );
}
