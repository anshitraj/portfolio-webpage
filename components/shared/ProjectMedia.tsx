'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { ProjectImage } from './ProjectImage';
import { cn } from '@/lib/utils';
import type { MediaProject } from '@/data/types';

/**
 * The cover slot. When a project has a walkthrough, the video *is* the cover —
 * it plays muted and looping in place of a static screenshot.
 *
 * Rules that keep it from being a performance or accessibility problem:
 *  - nothing loads until the card is near the viewport (IntersectionObserver)
 *  - once mounted it stays mounted, so scrolling past doesn't re-download it
 *  - playback pauses when it leaves the viewport
 *  - reduced-motion users get the still image and never an autoplaying video
 *  - a real play/pause control, always visible while paused
 */
export function ProjectMedia({
  project,
  sizes,
  priority = false,
  className,
  imgClassName,
  showControl = true,
}: {
  project: MediaProject;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  showControl?: boolean;
}) {
  const [reduced, setReduced] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [near, setNear] = useState(false);
  const [mounted, setMounted] = useState(false);
  /** User intent, not actual state — starts as "yes, play". */
  const [wantsPlay, setWantsPlay] = useState(true);
  /** Actual element state, driven by real play/pause events. */
  const [isPlaying, setIsPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const video = project.video;
  const useVideo = Boolean(video) && !reduced && !failed;

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  /*
    A rejected play() usually means the element wasn't ready yet or the browser
    hasn't granted autoplay for this document *yet*. Swallow it and let the
    `canplay` handler try again — treating it as fatal would strip a working
    video out of the page for good.
  */
  const attemptPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {
      /* retried on canplay */
    });
  }, []);

  useEffect(() => {
    if (!useVideo) return;
    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setNear(entry.isIntersecting);
        if (entry.isIntersecting) setMounted(true);
      },
      { rootMargin: '250px 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [useVideo]);

  // Drive playback from viewport position + intent. Runs after the <video>
  // has actually mounted, which the observer callback cannot guarantee.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (near && wantsPlay) attemptPlay();
    else v.pause();
  }, [near, wantsPlay, mounted, attemptPlay]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      setWantsPlay(true);
      attemptPlay();
    } else {
      setWantsPlay(false);
      v.pause();
    }
  }

  if (!useVideo || !video) {
    return (
      <ProjectImage
        project={project}
        sizes={sizes}
        priority={priority}
        className={className}
        imgClassName={imgClassName}
      />
    );
  }

  return (
    <div ref={wrapRef} className={cn('relative h-full w-full bg-surface', className)}>
      {mounted ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          autoPlay
          // Not "none": a browser cannot autoplay what it refuses to preload.
          preload="metadata"
          aria-label={`${project.title} walkthrough`}
          onCanPlay={() => {
            if (near && wantsPlay) attemptPlay();
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => setFailed(true)}
        />
      ) : (
        // Poster stands in until the card is close enough to warrant loading.
        <Image
          src={video.poster ?? project.image}
          alt={`${project.title} — ${project.subtitle}`}
          fill
          sizes={sizes}
          preload={priority}
          className="object-cover"
        />
      )}

      {/* Tagged so it reads as a real recording, not a decorative loop */}
      <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-pill bg-ink/75 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-paper backdrop-blur-sm">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-paper" aria-hidden />
        Demo
      </span>

      {showControl ? (
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? 'Pause walkthrough' : 'Play walkthrough'}
          className={cn(
            'absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-pill bg-ink/75 text-paper backdrop-blur-sm transition-opacity duration-200 focus-visible:opacity-100',
            // Recedes while playing; stays put when paused so there is always
            // an obvious way to start it.
            isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          )}
        >
          {isPlaying ? (
            <Pause className="h-3.5 w-3.5" aria-hidden />
          ) : (
            <Play className="h-3.5 w-3.5" aria-hidden />
          )}
        </button>
      ) : null}
    </div>
  );
}
