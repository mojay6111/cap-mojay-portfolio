'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', move);

    const hoverable = 'a,button,[role="button"],.project-card,.blog-item';

    const onEnter = () => {
      if (ring.current) {
        ring.current.style.transform = `translate(${rx - 20}px,${ry - 20}px) scale(1.6)`;
        ring.current.style.borderColor = 'var(--amber)';
        ring.current.style.opacity = '0.9';
      }
    };
    const onLeave = () => {
      if (ring.current) {
        ring.current.style.borderColor = 'var(--green)';
        ring.current.style.opacity = '0.5';
      }
    };

    document.querySelectorAll(hoverable).forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    let raf: number;
    const animate = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dot.current)  dot.current.style.transform  = `translate(${mx - 6}px,${my - 6}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx - 16}px,${ry - 16}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
        style={{ background: 'var(--green)', mixBlendMode: 'screen' }}
      />
      <div
        ref={ring}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998]"
        style={{ border: '1px solid var(--green)', opacity: 0.5, transition: 'border-color 0.2s, opacity 0.2s' }}
      />
    </>
  );
}
