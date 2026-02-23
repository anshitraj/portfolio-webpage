import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';

export type Badge = 'Explorer' | 'Operator' | 'Solver' | 'Reader' | 'Closer';

export interface GamificationState {
  visitedSections: string[];
  badgesUnlocked: Badge[];
  riddleSolved: boolean;
  progress: number;
}

const DEFAULT_STATE: GamificationState = {
  visitedSections: [],
  badgesUnlocked: [],
  riddleSolved: false,
  progress: 0,
};

const MAIN_SECTIONS = ['/', '/experience', '/projects', '/blog', '/achievements', '/resume', '/contact'];
const TOTAL_OBJECTIVES = MAIN_SECTIONS.length + 5 + 1; // sections + 5 badges + 1 riddle

export function useGamification() {
  const [state, setState] = useState<GamificationState>(() => {
    try {
      const stored = localStorage.getItem('portfolio_gamification');
      return stored ? JSON.parse(stored) : DEFAULT_STATE;
    } catch {
      return DEFAULT_STATE;
    }
  });

  const [, setLocation] = useLocation();

  const calculateProgress = useCallback((currentState: GamificationState) => {
    let score = 0;
    score += currentState.visitedSections.length;
    score += currentState.badgesUnlocked.length;
    score += currentState.riddleSolved ? 1 : 0;
    return Math.min(Math.round((score / TOTAL_OBJECTIVES) * 100), 100);
  }, []);

  const updateState = useCallback((updates: Partial<GamificationState>) => {
    setState(prev => {
      const next = { ...prev, ...updates };
      next.progress = calculateProgress(next);
      localStorage.setItem('portfolio_gamification', JSON.stringify(next));
      return next;
    });
  }, [calculateProgress]);

  const unlockBadge = useCallback((badge: Badge) => {
    setState(prev => {
      if (prev.badgesUnlocked.includes(badge)) return prev;
      const next = { ...prev, badgesUnlocked: [...prev.badgesUnlocked, badge] };
      next.progress = calculateProgress(next);
      localStorage.setItem('portfolio_gamification', JSON.stringify(next));
      // Dispatch custom event for toast notifications
      window.dispatchEvent(new CustomEvent('badge-unlocked', { detail: badge }));
      return next;
    });
  }, [calculateProgress]);

  const solveRiddle = useCallback(() => {
    updateState({ riddleSolved: true });
    unlockBadge('Solver');
  }, [updateState, unlockBadge]);

  const visitSection = useCallback((path: string) => {
    // Normalize path
    const normalized = path === '/' ? '/' : path.replace(/\/$/, '');
    const isMainSection = MAIN_SECTIONS.some(s => normalized === s || normalized.startsWith(s + '/'));
    
    if (isMainSection) {
      setState(prev => {
        const baseSection = MAIN_SECTIONS.find(s => normalized === s || normalized.startsWith(s + '/')) || '/';
        if (prev.visitedSections.includes(baseSection)) {
          // Check if explorer should be unlocked
          if (prev.visitedSections.length === MAIN_SECTIONS.length && !prev.badgesUnlocked.includes('Explorer')) {
             setTimeout(() => unlockBadge('Explorer'), 500);
          }
          return prev;
        }
        
        const next = { ...prev, visitedSections: [...prev.visitedSections, baseSection] };
        next.progress = calculateProgress(next);
        localStorage.setItem('portfolio_gamification', JSON.stringify(next));
        
        if (next.visitedSections.length === MAIN_SECTIONS.length) {
          setTimeout(() => unlockBadge('Explorer'), 500);
        }
        return next;
      });
    }

    if (normalized.startsWith('/blog/')) unlockBadge('Reader');
  }, [calculateProgress, unlockBadge]);

  const trackCloser = useCallback(() => unlockBadge('Closer'), [unlockBadge]);
  const trackOperator = useCallback(() => unlockBadge('Operator'), [unlockBadge]);

  return {
    ...state,
    unlockBadge,
    solveRiddle,
    visitSection,
    trackCloser,
    trackOperator
  };
}
