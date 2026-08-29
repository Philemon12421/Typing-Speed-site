import { UserSettings } from '../types';
import { getUserSettings, saveUserSettings } from './storage';

export type AppTheme = 'system' | 'light' | 'dark';

/**
 * Checks if system prefers dark/black color scheme
 */
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Resolves the effective active theme ('light' or 'dark') given the user's setting
 */
export function resolveEffectiveTheme(themeSetting?: AppTheme): 'light' | 'dark' {
  if (!themeSetting || themeSetting === 'system') {
    return getSystemTheme();
  }
  return themeSetting;
}

/**
 * Applies the clean theme to the DOM root (<html>) and updates browser theme-color
 */
export function applyThemeToDOM(themeSetting?: AppTheme): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light';

  const effectiveTheme = resolveEffectiveTheme(themeSetting);
  const root = document.documentElement;
  const body = document.body;

  if (effectiveTheme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
    root.style.colorScheme = 'dark';
    body.style.backgroundColor = '#000000';
    body.style.color = '#f4f4f5';

    // Update meta theme-color for clean black status bar on mobile browsers
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', '#000000');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
    root.style.colorScheme = 'light';
    body.style.backgroundColor = '#ffffff';
    body.style.color = '#1e293b';

    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#ffffff');
    }
  }

  return effectiveTheme;
}

/**
 * Initializes and synchronizes theme with DOM and system event listeners
 */
export function initTheme(themeSetting?: AppTheme): () => void {
  applyThemeToDOM(themeSetting);
  return setupSystemThemeListener();
}

export function setupSystemThemeListener(onSystemThemeChange?: (effective: 'light' | 'dark') => void): () => void {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => {};
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const listener = (e: MediaQueryListEvent) => {
    const currentSettings = getUserSettings();
    if (!currentSettings.theme || currentSettings.theme === 'system') {
      const effective = e.matches ? 'dark' : 'light';
      applyThemeToDOM('system');
      if (onSystemThemeChange) {
        onSystemThemeChange(effective);
      }
    }
  };

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  } else if (mediaQuery.addListener) {
    // Legacy Safari/iOS fallback
    mediaQuery.addListener(listener);
    return () => mediaQuery.removeListener(listener);
  }

  return () => {};
}
