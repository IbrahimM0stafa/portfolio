import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="hero" class="mb-20 sm:mb-28 relative pt-4 sm:pt-8">
      <!-- Background Ambient Gradient Glow -->
      <div class="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-72 bg-gradient-to-r from-emerald-500/10 via-indigo-500/10 to-amber-500/10 blur-3xl -z-10 pointer-events-none rounded-full"></div>

      <div class="max-w-4xl">
        <!-- Availability Pill -->
        <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 text-xs font-medium mb-6 shadow-sm">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Full-Stack Engineer &bull; Java / Spring Boot &amp; Angular &bull; Remote / Alexandria, Egypt</span>
        </div>

        <!-- Hero Headline -->
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.12] mb-6">
          Building scalable, production web systems with
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300"> Spring Boot</span>
          and
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-300">Angular</span>.
        </h1>

        <!-- Narrative Paragraph directly aligned with CV -->
        <p class="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal mb-8 max-w-3xl">
          Full-Stack Software Engineer with hands-on experience engineering robust web applications. Skilled in REST APIs, automated testing, database query optimization, containerized Docker deployments, and reactive Angular interfaces in Agile teams.
        </p>

        <!-- Accurate Quick Stats Bar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div class="p-3.5 rounded-xl bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border shadow-subtle">
            <span class="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-0.5">Focus</span>
            <span class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">Full-Stack</span>
            <span class="text-[11px] text-neutral-500 dark:text-neutral-400 block mt-0.5">Spring Boot &bull; Angular</span>
          </div>

          <div class="p-3.5 rounded-xl bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border shadow-subtle">
            <span class="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-0.5">Core Backend</span>
            <span class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">Spring Boot 3.5</span>
            <span class="text-[11px] text-neutral-500 dark:text-neutral-400 block mt-0.5">Java 21 &bull; 19 Modules &bull; REST</span>
          </div>

          <div class="p-3.5 rounded-xl bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border shadow-subtle">
            <span class="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-0.5">Frontend Core</span>
            <span class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">Angular 19</span>
            <span class="text-[11px] text-neutral-500 dark:text-neutral-400 block mt-0.5">Signals &bull; Standalone SPAs</span>
          </div>

          <div class="p-3.5 rounded-xl bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border shadow-subtle">
            <span class="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-0.5">DevOps &amp; AI</span>
            <span class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">Docker &bull; Gemini</span>
            <span class="text-[11px] text-neutral-500 dark:text-neutral-400 block mt-0.5">CI/CD &bull; PostgreSQL 16</span>
          </div>
        </div>

        <!-- Primary CTAs -->
        <div class="flex items-center gap-3.5 flex-wrap text-xs sm:text-sm font-medium">
          <a
            href="#projects"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 dark:bg-emerald-500 text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-emerald-400 shadow-sm hover:shadow-glow-emerald transition-all"
          >
            <span>Explore Featured Work</span>
            <app-icon name="arrow-right" [size]="15"></app-icon>
          </a>

          <a
            href="#architecture-visualizer"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors shadow-subtle"
          >
            <app-icon name="activity" [size]="15" className="text-emerald-500"></app-icon>
            <span>System Topology</span>
          </a>

          <a
            href="#api-sandbox"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors shadow-subtle"
          >
            <app-icon name="terminal" [size]="15" className="text-indigo-500"></app-icon>
            <span>Live REST Sandbox</span>
          </a>
        </div>
      </div>
    </section>
  `
})
export class HeroSectionComponent {}
