import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="border-t border-warm-200/90 dark:border-dark-border bg-warm-100/50 dark:bg-dark-surface/60 py-8 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
        <p>
          &copy; 2026 Ibrahim Talaat &bull; Engineered with Angular 19, TypeScript &amp; Tailwind CSS.
        </p>
        <div class="flex items-center gap-4">
          <a href="https://github.com/IbrahimM0stafa" target="_blank" rel="noopener noreferrer" class="hover:text-neutral-900 dark:hover:text-white transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/ibrahim-mostafa-62b671197" target="_blank" rel="noopener noreferrer" class="hover:text-neutral-900 dark:hover:text-white transition-colors">LinkedIn</a>
          <a href="mailto:ibrahimmostafa768@gmail.com" class="hover:text-neutral-900 dark:hover:text-white transition-colors">Email</a>
        </div>
      </div>
    </footer>
  `
})
export class PortfolioFooterComponent {}
