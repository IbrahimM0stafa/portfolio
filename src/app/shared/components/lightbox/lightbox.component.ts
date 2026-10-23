import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectView } from '../../../core/models/project.model';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-neutral-950/85 backdrop-blur-md transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      [attr.aria-label]="activeView?.label || 'Project Screenshot Full Size Preview'"
      (click)="onBackdropClick($event)"
    >
      <!-- Modal Container -->
      <div
        #dialogContainer
        class="relative flex flex-col w-full max-w-6xl max-h-[92vh] bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl focus:outline-none"
        tabindex="-1"
        (click)="$event.stopPropagation()"
      >
        <!-- Modal Top Bar -->
        <header class="flex items-center justify-between px-5 py-3.5 border-b border-neutral-800 bg-neutral-900/90 text-neutral-200">
          <div class="flex items-center gap-3 min-w-0">
            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono uppercase tracking-wider bg-neutral-800 text-neutral-300 border border-neutral-700">
              {{ currentIndex + 1 }} / {{ views.length }}
            </span>
            <div class="truncate">
              <h3 class="text-sm sm:text-base font-semibold text-white truncate">
                {{ activeView?.label }}
              </h3>
              <p *ngIf="activeView?.caption" class="text-xs text-neutral-400 truncate">
                {{ activeView?.caption }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 flex-shrink-0">
            <span class="hidden sm:inline-block text-xs font-mono text-neutral-400 mr-2">
              ESC to exit &bull; &larr; &rarr; to navigate
            </span>
            <button
              #closeBtn
              type="button"
              (click)="close.emit()"
              class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 focus-ring transition-colors"
              aria-label="Close preview modal (Escape)"
            >
              <app-icon name="x" [size]="18"></app-icon>
            </button>
          </div>
        </header>

        <!-- Media Stage Area -->
        <main class="relative flex-1 flex items-center justify-center p-2 sm:p-6 bg-neutral-950/90 overflow-hidden min-h-[340px] max-h-[calc(92vh-120px)]">
          <!-- Previous Button -->
          <button
            *ngIf="views.length > 1"
            type="button"
            (click)="previousView()"
            class="absolute left-3 sm:left-6 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700/60 shadow-lg backdrop-blur-sm transition-transform hover:scale-105 focus-ring"
            aria-label="Previous screenshot (Left arrow)"
          >
            <app-icon name="chevron-left" [size]="20"></app-icon>
          </button>

          <!-- Media Display -->
          <div class="w-full h-full flex items-center justify-center p-1 sm:p-2">
            <!-- Video Walkthrough -->
            <ng-container *ngIf="activeView?.videoPath; else imageDisplay">
              <video
                [src]="activeView?.videoPath"
                class="max-w-full max-h-[calc(92vh-160px)] object-contain rounded-lg shadow-2xl border border-neutral-800"
                controls
                playsinline
                autoplay
                muted
                loop
                [poster]="activeView?.imagePath"
              ></video>
            </ng-container>

            <!-- Image View -->
            <ng-template #imageDisplay>
              <img
                [src]="activeView?.imagePath"
                [alt]="activeView?.altText || 'Application screenshot preview'"
                class="max-w-full max-h-[calc(92vh-160px)] object-contain rounded-lg shadow-2xl transition-opacity duration-200"
                [class.max-w-xs]="activeView?.deviceType === 'mobile'"
                (error)="onImageError()"
                loading="eager"
              />
            </ng-template>
          </div>

          <!-- Next Button -->
          <button
            *ngIf="views.length > 1"
            type="button"
            (click)="nextView()"
            class="absolute right-3 sm:right-6 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700/60 shadow-lg backdrop-blur-sm transition-transform hover:scale-105 focus-ring"
            aria-label="Next screenshot (Right arrow)"
          >
            <app-icon name="chevron-right" [size]="20"></app-icon>
          </button>
        </main>

        <!-- Bottom View Indicator Carousel Tabs -->
        <footer class="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-900 border-t border-neutral-800 overflow-x-auto">
          <button
            *ngFor="let view of views; let i = index"
            type="button"
            (click)="selectIndex(i)"
            class="group relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all focus-ring"
            [ngClass]="{
              'bg-neutral-100 text-neutral-900 shadow-sm font-semibold': currentIndex === i,
              'bg-neutral-800/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800': currentIndex !== i
            }"
            [attr.aria-current]="currentIndex === i ? 'true' : null"
            [attr.aria-label]="'Switch to ' + view.label"
          >
            <span
              class="w-1.5 h-1.5 rounded-full"
              [ngClass]="{
                'bg-neutral-950': currentIndex === i,
                'bg-neutral-500 group-hover:bg-neutral-300': currentIndex !== i
              }"
            ></span>
            <span class="truncate max-w-[140px] sm:max-w-[200px]">{{ view.label }}</span>
          </button>
        </footer>
      </div>
    </div>
  `
})
export class LightboxComponent implements AfterViewInit, OnDestroy {
  @Input() views: ProjectView[] = [];
  @Input() initialIndex: number = 0;
  @Output() close = new EventEmitter<void>();

  @ViewChild('dialogContainer') dialogContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('closeBtn') closeBtn?: ElementRef<HTMLButtonElement>;

  currentIndex: number = 0;

  ngOnInit(): void {
    this.currentIndex = this.initialIndex || 0;
    // Lock body scroll
    document.body.style.overflow = 'hidden';
  }

  ngAfterViewInit(): void {
    // Focus close button for accessibility
    setTimeout(() => {
      this.closeBtn?.nativeElement.focus();
    }, 50);
  }

  ngOnDestroy(): void {
    // Unlock body scroll
    document.body.style.overflow = '';
  }

  get activeView(): ProjectView | undefined {
    return this.views[this.currentIndex] || this.views[0];
  }

  nextView(): void {
    if (this.views.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.views.length;
  }

  previousView(): void {
    if (this.views.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.views.length) % this.views.length;
  }

  selectIndex(i: number): void {
    this.currentIndex = i;
  }

  onBackdropClick(event: MouseEvent): void {
    this.close.emit();
  }

  onImageError(): void {
    if (this.activeView && this.activeView.fallbackImagePath) {
      this.activeView.imagePath = this.activeView.fallbackImagePath;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close.emit();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextView();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previousView();
    }
  }
}
