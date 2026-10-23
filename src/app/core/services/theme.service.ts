import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  readonly currentTheme = signal<Theme>('dark');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('portfolio-theme') as Theme | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        this.currentTheme.set(savedTheme);
      } else {
        // Default to dark mode for high-end sleek developer aesthetic,
        // or follow prefers-color-scheme if light explicitly requested
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.currentTheme.set(prefersDark ? 'dark' : 'dark'); // default dark for modern wow factor
      }

      this.applyTheme(this.currentTheme());

      // Angular signal effect to keep DOM and storage in sync
      effect(() => {
        const theme = this.currentTheme();
        this.applyTheme(theme);
        try {
          localStorage.setItem('portfolio-theme', theme);
        } catch (e) {
          // ignore storage error in restricted contexts
        }
      });
    }
  }

  toggleTheme(): void {
    this.currentTheme.update(theme => (theme === 'dark' ? 'light' : 'dark'));
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
  }

  private applyTheme(theme: Theme): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}
