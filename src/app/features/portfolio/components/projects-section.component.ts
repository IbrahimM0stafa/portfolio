import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItem } from '../../../core/models/project.model';
import { PROJECTS_DATA } from '../../../core/data/projects.data';
import { IconComponent } from '../../../shared/components/icon/icon.component';

export type ProjectFilter = 'all' | 'fullstack' | 'ai-mobile';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="projects" class="space-y-8 scroll-mt-20 mb-20 sm:mb-28">
      <!-- Section Title & Category Filter Tabs -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 dark:border-dark-border pb-5">
        <div>
          <span class="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
            Verified Work
          </span>
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Featured Product Showcases
          </h2>
        </div>

        <!-- Filter Tabs -->
        <div class="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-200/50 dark:bg-dark-surface border border-neutral-200 dark:border-dark-border">
          <button
            type="button"
            (click)="activeCategory.set('all')"
            class="px-3 py-1 rounded-lg text-xs font-medium transition-all"
            [ngClass]="activeCategory() === 'all' ? 'bg-white dark:bg-dark-card text-neutral-900 dark:text-white font-semibold shadow-sm' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'"
          >
            All Projects ({{ projects().length }})
          </button>
          <button
            type="button"
            (click)="activeCategory.set('fullstack')"
            class="px-3 py-1 rounded-lg text-xs font-medium transition-all"
            [ngClass]="activeCategory() === 'fullstack' ? 'bg-white dark:bg-dark-card text-neutral-900 dark:text-white font-semibold shadow-sm' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'"
          >
            Spring Boot &bull; Angular
          </button>
          <button
            type="button"
            (click)="activeCategory.set('ai-mobile')"
            class="px-3 py-1 rounded-lg text-xs font-medium transition-all"
            [ngClass]="activeCategory() === 'ai-mobile' ? 'bg-white dark:bg-dark-card text-neutral-900 dark:text-white font-semibold shadow-sm' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'"
          >
            Mobile &bull; AI / ML
          </button>
        </div>
      </div>

      <!-- Project Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
        <article
          *ngFor="let project of filteredProjects()"
          class="group flex flex-col rounded-2xl bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700"
        >
          <!-- Card Visual Preview Header -->
          <div
            class="relative h-56 bg-neutral-100 dark:bg-dark-surface overflow-hidden cursor-pointer border-b border-neutral-200 dark:border-dark-border"
            (click)="projectSelect.emit(project)"
          >
            <img
              *ngIf="project.views && project.views.length > 0"
              [src]="project.views[0].imagePath"
              [alt]="project.title"
              class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            
            <!-- Overlay Gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

            <!-- Top badges -->
            <div class="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span
                class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide backdrop-blur-md"
                [ngClass]="{
                  'bg-amber-500/90 text-white': project.id === 'petites',
                  'bg-indigo-600/90 text-white': project.id === 'smart-city',
                  'bg-blue-600/90 text-white': project.id === 'human-aid',
                  'bg-purple-600/90 text-white': project.id === 'fake-news-detector'
                }"
              >
                {{ project.badge }}
              </span>
              <span class="px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono backdrop-blur-md">
                {{ project.period }}
              </span>
            </div>

            <!-- Hover CTA hint -->
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <span class="px-3 py-1.5 rounded-full bg-neutral-950/85 text-white text-xs font-semibold backdrop-blur-sm shadow-lg flex items-center gap-1.5">
                <app-icon name="maximize" [size]="12"></app-icon>
                <span>Click to Inspect Deep Dive</span>
              </span>
            </div>
          </div>

          <!-- Card Body Content -->
          <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-2">
              <div class="flex items-center justify-between gap-2">
                <h3 class="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {{ project.title }}
                </h3>
                <span class="text-[11px] font-mono text-neutral-400">
                  {{ project.views.length }} Views
                </span>
              </div>

              <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400 leading-snug">
                {{ project.subtitle }}
              </p>

              <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-3">
                {{ project.summary }}
              </p>
            </div>

            <!-- Tech Tags Strip -->
            <div>
              <div class="flex flex-wrap gap-1.5">
                <span
                  *ngFor="let tech of project.techStack.slice(0, 5)"
                  class="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-dark-surface text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-dark-border"
                >
                  {{ tech.name }}
                </span>
                <span
                  *ngIf="project.techStack.length > 5"
                  class="px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-400 bg-neutral-50 dark:bg-dark-surface"
                >
                  +{{ project.techStack.length - 5 }} more
                </span>
              </div>
            </div>

            <!-- Card Actions Strip -->
            <div class="pt-4 border-t border-neutral-200 dark:border-dark-border flex items-center justify-between gap-2">
              <button
                type="button"
                (click)="projectSelect.emit(project)"
                class="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <span>Inspect Views &amp; Specs</span>
                <app-icon name="arrow-right" [size]="13"></app-icon>
              </button>

              <div class="flex items-center gap-1.5">
                <a
                  *ngIf="project.githubUrl"
                  [href]="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-7 h-7 rounded-lg border border-neutral-200 dark:border-dark-border flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-dark-surface transition-colors"
                  title="GitHub Repository"
                >
                  <app-icon name="github" [size]="14"></app-icon>
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  `
})
export class ProjectsSectionComponent {
  projects = input<ProjectItem[]>(PROJECTS_DATA);
  projectSelect = output<ProjectItem>();

  activeCategory = signal<ProjectFilter>('all');

  filteredProjects = computed(() => {
    const list = this.projects();
    const filter = this.activeCategory();
    if (filter === 'all') return list;
    if (filter === 'fullstack') {
      return list.filter(p => p.id === 'petites' || p.id === 'smart-city');
    }
    if (filter === 'ai-mobile') {
      return list.filter(p => p.id === 'human-aid' || p.id === 'fake-news-detector');
    }
    return list;
  });
}
