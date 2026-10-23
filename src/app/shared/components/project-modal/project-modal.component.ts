import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  HostListener,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItem } from '../../../core/models/project.model';
import { FakeBrowserComponent } from '../fake-browser/fake-browser.component';
import { IconComponent } from '../icon/icon.component';

type ModalTab = 'views' | 'architecture' | 'solutions' | 'tech';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, FakeBrowserComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      (click)="onBackdropClick($event)"
      role="dialog"
      aria-modal="true"
      [attr.aria-label]="project.title + ' Details'"
    >
      <div
        class="relative w-full max-w-5xl rounded-2xl bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-scaleUp"
        (click)="$event.stopPropagation()"
      >
        <!-- Modal Top Bar -->
        <div class="px-5 py-4 border-b border-neutral-200 dark:border-dark-border bg-neutral-50/80 dark:bg-dark-surface/60 flex items-center justify-between gap-4 select-none">
          <div class="flex items-center gap-3 min-w-0">
            <span
              class="w-3 h-3 rounded-full"
              [ngClass]="{
                'bg-amber-500': project.id === 'petites',
                'bg-indigo-500': project.id === 'smart-city',
                'bg-blue-500': project.id === 'human-aid'
              }"
            ></span>
            <div class="truncate">
              <h2 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white truncate">
                {{ project.title }}
              </h2>
              <p class="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                {{ project.subtitle }} &bull; {{ project.period }}
              </p>
            </div>
          </div>

          <!-- Close button -->
          <button
            type="button"
            (click)="close.emit()"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close dialog"
          >
            <app-icon name="x" [size]="18"></app-icon>
          </button>
        </div>

        <!-- Navigation Tabs Strip -->
        <div class="px-5 py-2.5 bg-neutral-100/60 dark:bg-[#0e1017] border-b border-neutral-200 dark:border-dark-border flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            (click)="activeTab.set('views')"
            class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
            [ngClass]="activeTab() === 'views' ? 'bg-white dark:bg-dark-card text-neutral-900 dark:text-white shadow-sm font-semibold' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'"
          >
            <app-icon name="eye" [size]="13"></app-icon>
            <span>Live Screen Tour ({{ project.views.length }})</span>
          </button>

          <button
            type="button"
            (click)="activeTab.set('architecture')"
            class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
            [ngClass]="activeTab() === 'architecture' ? 'bg-white dark:bg-dark-card text-neutral-900 dark:text-white shadow-sm font-semibold' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'"
          >
            <app-icon name="cpu" [size]="13"></app-icon>
            <span>Architecture Breakdown</span>
          </button>

          <button
            type="button"
            (click)="activeTab.set('solutions')"
            class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
            [ngClass]="activeTab() === 'solutions' ? 'bg-white dark:bg-dark-card text-neutral-900 dark:text-white shadow-sm font-semibold' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'"
          >
            <app-icon name="check-circle" [size]="13"></app-icon>
            <span>Engineering Solutions ({{ project.engineeringSolutions.length }})</span>
          </button>

          <button
            type="button"
            (click)="activeTab.set('tech')"
            class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
            [ngClass]="activeTab() === 'tech' ? 'bg-white dark:bg-dark-card text-neutral-900 dark:text-white shadow-sm font-semibold' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'"
          >
            <app-icon name="code" [size]="13"></app-icon>
            <span>Tech Stack &amp; Specs</span>
          </button>
        </div>

        <!-- Modal Body Content -->
        <div class="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          <!-- TAB 1: Live Screen Tour -->
          <div *ngIf="activeTab() === 'views'" class="space-y-4">
            <div *ngIf="project.views && project.views.length > 0">
              <app-fake-browser [views]="project.views"></app-fake-browser>
            </div>
            <div *ngIf="!project.views || project.views.length === 0" class="text-center py-12 text-sm text-neutral-500">
              No interactive previews configured.
            </div>
          </div>

          <!-- TAB 2: Architecture & Problem Statement -->
          <div *ngIf="activeTab() === 'architecture'" class="space-y-6">
            <!-- Problem Statement Callout -->
            <div class="p-4 sm:p-5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60">
              <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-1.5 flex items-center gap-1.5">
                <app-icon name="info" [size]="14"></app-icon>
                The Core Operational Challenge
              </h4>
              <p class="text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-relaxed">
                {{ project.problemStatement }}
              </p>
            </div>

            <!-- Summary Breakdown -->
            <div>
              <h4 class="text-sm font-bold text-neutral-900 dark:text-white mb-2">
                System Overview
              </h4>
              <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {{ project.summary }}
              </p>
            </div>

            <!-- Metrics Grid -->
            <div *ngIf="project.metrics && project.metrics.length > 0">
              <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                Key Verified Metrics
              </h4>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div
                  *ngFor="let metric of project.metrics"
                  class="p-3.5 rounded-xl bg-neutral-50 dark:bg-dark-surface border border-neutral-200 dark:border-dark-border"
                >
                  <div class="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mb-1">
                    {{ metric.label }}
                  </div>
                  <div class="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                    {{ metric.value }}
                  </div>
                  <div *ngIf="metric.subtext" class="text-[10px] text-neutral-400 mt-0.5 leading-tight">
                    {{ metric.subtext }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 3: Engineering Solutions -->
          <div *ngIf="activeTab() === 'solutions'" class="space-y-4">
            <h4 class="text-sm font-bold text-neutral-900 dark:text-white mb-2">
              Engineering Solutions &amp; Implementation Details
            </h4>
            <div class="space-y-3">
              <div
                *ngFor="let solution of project.engineeringSolutions; let i = index"
                class="p-4 rounded-xl bg-neutral-50 dark:bg-dark-surface border border-neutral-200 dark:border-dark-border flex items-start gap-3"
              >
                <span class="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {{ i + 1 }}
                </span>
                <p class="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {{ solution }}
                </p>
              </div>
            </div>
          </div>

          <!-- TAB 4: Tech Stack & Specs -->
          <div *ngIf="activeTab() === 'tech'" class="space-y-6">
            <div>
              <h4 class="text-sm font-bold text-neutral-900 dark:text-white mb-3">
                Technologies &amp; Frameworks
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  *ngFor="let tech of project.techStack"
                  class="px-3 py-1.5 rounded-lg text-xs font-mono font-medium border"
                  [ngClass]="{
                    'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900': tech.category === 'frontend',
                    'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-900': tech.category === 'backend',
                    'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900': tech.category === 'database',
                    'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900': tech.category === 'ai',
                    'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700': tech.category === 'devops'
                  }"
                >
                  {{ tech.name }}
                </span>
              </div>
            </div>

            <!-- Verified Features List -->
            <div>
              <h4 class="text-sm font-bold text-neutral-900 dark:text-white mb-3">
                Verified Capabilities &amp; System Features
              </h4>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                <li *ngFor="let feature of project.keyFeatures" class="flex items-start gap-2 p-2 rounded-lg bg-neutral-50 dark:bg-dark-surface border border-neutral-200 dark:border-dark-border">
                  <app-icon name="check-circle" [size]="14" className="text-emerald-500 shrink-0 mt-0.5"></app-icon>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Modal Footer Strip -->
        <div class="px-5 py-4 border-t border-neutral-200 dark:border-dark-border bg-neutral-50/80 dark:bg-dark-surface/60 flex items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <a
              *ngIf="project.githubUrl"
              [href]="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-medium hover:bg-white dark:hover:bg-dark-card transition-colors"
            >
              <app-icon name="github" [size]="14"></app-icon>
              <span>Repository</span>
            </a>
            <a
              *ngIf="project.liveUrl"
              [href]="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium hover:bg-neutral-800 dark:hover:bg-white transition-colors"
            >
              <app-icon name="external-link" [size]="14"></app-icon>
              <span>Live Deployment</span>
            </a>
          </div>

          <button
            type="button"
            (click)="close.emit()"
            class="px-4 py-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-medium hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scaleUp {
      from { opacity: 0; transform: scale(0.97) translateY(8px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
    .animate-scaleUp { animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  `]
})
export class ProjectModalComponent {
  @Input({ required: true }) project!: ProjectItem;
  @Output() close = new EventEmitter<void>();

  activeTab = signal<ModalTab>('views');

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('backdrop-blur-md')) {
      this.close.emit();
    }
  }
}
