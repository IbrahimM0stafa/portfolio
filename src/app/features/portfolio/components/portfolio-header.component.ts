import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-portfolio-header',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <header class="sticky top-0 z-40 bg-warm-50/90 dark:bg-dark-bg/90 backdrop-blur-md border-b border-warm-200/80 dark:border-dark-border transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Logo & Brand -->
        <a href="#hero" class="group flex items-center gap-3 focus-ring rounded-lg p-1">
          <div class="w-9 h-9 rounded-xl bg-neutral-900 dark:bg-emerald-500 text-white dark:text-neutral-950 font-mono font-bold text-sm flex items-center justify-center shadow-subtle group-hover:scale-105 transition-all">
            IT
          </div>
          <div>
            <span class="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white tracking-tight block">
              Ibrahim Talaat
            </span>
            <span class="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block -mt-0.5">
              Full-Stack Software Engineer
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-300">
          <a href="#projects" class="hover:text-neutral-900 dark:hover:text-white focus-ring rounded px-2 py-1 transition-colors">Projects</a>
          <a href="#architecture-visualizer" class="hover:text-neutral-900 dark:hover:text-white focus-ring rounded px-2 py-1 transition-colors">System Topology</a>
          <a href="#api-sandbox" class="hover:text-neutral-900 dark:hover:text-white focus-ring rounded px-2 py-1 transition-colors">API Sandbox</a>
          <a href="#petites-architecture" class="hover:text-neutral-900 dark:hover:text-white focus-ring rounded px-2 py-1 transition-colors">Case Study</a>
          <a href="#experience" class="hover:text-neutral-900 dark:hover:text-white focus-ring rounded px-2 py-1 transition-colors">Experience</a>
          <a href="#skills" class="hover:text-neutral-900 dark:hover:text-white focus-ring rounded px-2 py-1 transition-colors">Skills</a>
        </nav>

        <!-- Right Action Bar: Theme Toggle & Social Links -->
        <div class="flex items-center gap-2 sm:gap-2.5">
          <!-- Theme Toggle Button -->
          <button
            type="button"
            (click)="themeService.toggleTheme()"
            class="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-warm-200 dark:border-dark-border text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-white dark:hover:bg-dark-card focus-ring transition-all"
            [attr.aria-label]="themeService.currentTheme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            [title]="themeService.currentTheme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <app-icon *ngIf="themeService.currentTheme() === 'dark'" name="sun" [size]="16" className="text-amber-400"></app-icon>
            <app-icon *ngIf="themeService.currentTheme() === 'light'" name="moon" [size]="16" className="text-indigo-600"></app-icon>
          </button>

          <!-- GitHub -->
          <a
            href="https://github.com/IbrahimM0stafa"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-warm-200 dark:border-dark-border text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-white dark:hover:bg-dark-card focus-ring transition-colors"
            aria-label="GitHub Profile"
          >
            <app-icon name="github" [size]="15"></app-icon>
          </a>

          <!-- LinkedIn -->
          <a
            href="https://linkedin.com/in/ibrahim-mostafa-62b671197"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-warm-200 dark:border-dark-border text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-white dark:hover:bg-dark-card focus-ring transition-colors"
            aria-label="LinkedIn Profile"
          >
            <app-icon name="linkedin" [size]="15"></app-icon>
          </a>

          <!-- Get in touch CTA -->
          <a
            href="mailto:ibrahimmostafa768@gmail.com"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-emerald-500 text-white dark:text-neutral-950 text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-emerald-400 focus-ring shadow-subtle transition-all"
          >
            <app-icon name="mail" [size]="13"></app-icon>
            <span class="hidden sm:inline">Get in Touch</span>
          </a>
        </div>
      </div>
    </header>
  `
})
export class PortfolioHeaderComponent {
  readonly themeService = inject(ThemeService);
}
