import {
  Component,
  Input,
  signal,
  computed,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectView } from '../../../core/models/project.model';
import { LightboxComponent } from '../lightbox/lightbox.component';

@Component({
  selector: 'app-fake-browser',
  standalone: true,
  imports: [CommonModule, LightboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .page-enter { animation: pageEnter 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
    @keyframes pageEnter {
      from { opacity: 0; transform: translateY(6px) scale(0.995); }
      to   { opacity: 1; transform: translateY(0)   scale(1); }
    }
    .loading-bar { animation: loadBar 0.6s ease-out forwards; }
    @keyframes loadBar {
      from { width: 0%; opacity: 1; }
      60%  { width: 85%; opacity: 1; }
      to   { width: 100%; opacity: 0; }
    }
    .url-typing { animation: urlFade 0.25s ease-out; }
    @keyframes urlFade {
      from { opacity: 0.4; } to { opacity: 1; }
    }
    .tab-scroll::-webkit-scrollbar { display: none; }
    .tab-scroll { -ms-overflow-style: none; scrollbar-width: none; }
    .scroll-hint-fade {
      animation: hintShow 2.8s ease-out forwards;
    }
    @keyframes hintShow {
      0%   { opacity: 0; transform: translateX(-50%) translateY(4px); }
      15%  { opacity: 1; transform: translateX(-50%) translateY(0); }
      70%  { opacity: 1; }
      100% { opacity: 0; }
    }
  `],
  template: `
    <div class="w-full flex flex-col rounded-2xl overflow-hidden border border-neutral-200 dark:border-dark-border shadow-[0_8px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)] bg-white dark:bg-dark-card transition-colors">

      <!-- ─── Title bar ─── -->
      <div class="flex items-center gap-2 px-3 pt-3 pb-0 bg-[#f0eeec] dark:bg-[#12141c] select-none border-b border-neutral-200 dark:border-dark-border">
        <!-- Traffic lights -->
        <div class="flex items-center gap-1.5 flex-shrink-0 mr-1 pb-2">
          <div class="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] hover:brightness-90 cursor-default transition-all"></div>
          <div class="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d4a017] hover:brightness-90 cursor-default transition-all"></div>
          <div class="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] hover:brightness-90 cursor-default transition-all"></div>
        </div>

        <!-- Browser tabs strip -->
        <div class="flex items-end gap-0.5 flex-1 overflow-x-auto tab-scroll min-w-0">
          <button
            *ngFor="let view of views; let i = index"
            type="button"
            (click)="navigateTo(i)"
            class="group flex-none flex items-center gap-1.5 px-3 pt-2 pb-2 rounded-t-lg text-[11px] font-medium max-w-[130px] transition-all duration-150"
            [ngClass]="{
              'bg-white dark:bg-dark-card text-neutral-800 dark:text-neutral-100 shadow-[0_1px_0_0_white] dark:shadow-none z-10 border-t border-x border-neutral-200 dark:border-dark-border': activeIndex() === i,
              'bg-transparent text-neutral-500 dark:text-neutral-400 hover:bg-white/50 dark:hover:bg-dark-surface hover:text-neutral-700 dark:hover:text-neutral-200': activeIndex() !== i
            }"
          >
            <span class="w-3 h-3 rounded-sm flex-shrink-0 overflow-hidden">
              <img src="/favicon.ico" class="w-full h-full object-contain" alt="" (error)="onFaviconError($event)" />
            </span>
            <span class="truncate">{{ view.label }}</span>
          </button>
        </div>
      </div>

      <!-- ─── Toolbar / address bar ─── -->
      <div class="flex items-center gap-2 px-3 py-2 bg-[#f0eeec] dark:bg-[#12141c] border-b border-neutral-200 dark:border-dark-border select-none">
        <!-- Nav buttons -->
        <div class="flex items-center gap-0.5">
          <button
            type="button"
            (click)="navigateTo(activeIndex() - 1)"
            [disabled]="activeIndex() === 0"
            class="w-7 h-7 flex items-center justify-center rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200/70 dark:hover:bg-dark-surface disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Back"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            type="button"
            (click)="navigateTo(activeIndex() + 1)"
            [disabled]="activeIndex() === views.length - 1"
            class="w-7 h-7 flex items-center justify-center rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200/70 dark:hover:bg-dark-surface disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Forward"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button
            type="button"
            (click)="reload()"
            class="w-7 h-7 flex items-center justify-center rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200/70 dark:hover:bg-dark-surface transition-colors"
            [ngClass]="{ 'animate-spin': isLoading() }"
            aria-label="Reload"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          </button>
        </div>

        <!-- Address bar -->
        <div class="flex-1 flex items-center gap-1.5 bg-white dark:bg-dark-bg border border-neutral-200 dark:border-dark-border rounded-md px-2.5 py-1.5 min-w-0 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors">
          <!-- Lock icon -->
          <svg class="w-3 h-3 text-emerald-600 dark:text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span class="text-[12px] text-neutral-700 dark:text-neutral-300 truncate url-typing flex-1 font-mono">
            {{ currentUrl() }}
          </span>
          <!-- Verified badge inside bar -->
          <span class="flex-shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Verified
          </span>
        </div>

        <!-- Expand button -->
        <button
          type="button"
          (click)="openLightbox()"
          class="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200/70 dark:hover:bg-dark-surface transition-colors"
          aria-label="Expand full size"
          title="Expand full size"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
        </button>
      </div>

      <!-- ─── Loading bar ─── -->
      <div class="relative h-0.5 bg-transparent overflow-hidden">
        <div
          *ngIf="isLoading()"
          class="absolute top-0 left-0 h-full bg-emerald-500 loading-bar"
        ></div>
      </div>

      <!-- ─── Viewport: scrollable "webpage" ─── -->
      <div
        #viewport
        class="relative bg-neutral-100 dark:bg-dark-bg group"
        style="height: 500px; overflow-y: scroll; overflow-x: hidden; scroll-behavior: smooth;"
      >
        <!-- Skeleton while loading -->
        <div *ngIf="isLoading()" class="absolute inset-0 bg-neutral-50 dark:bg-dark-bg flex flex-col gap-3 p-6 animate-pulse" style="height:500px;">
          <div class="h-8 bg-neutral-200 dark:bg-dark-card rounded-lg w-2/3"></div>
          <div class="h-4 bg-neutral-100 dark:bg-dark-surface rounded w-full"></div>
          <div class="h-4 bg-neutral-100 dark:bg-dark-surface rounded w-5/6"></div>
          <div class="flex gap-3 mt-2">
            <div class="h-40 bg-neutral-200 dark:bg-dark-card rounded-xl flex-1"></div>
            <div class="h-40 bg-neutral-200 dark:bg-dark-card rounded-xl flex-1"></div>
            <div class="h-40 bg-neutral-200 dark:bg-dark-card rounded-xl flex-1"></div>
          </div>
          <div class="h-4 bg-neutral-100 dark:bg-dark-surface rounded w-3/4 mt-2"></div>
          <div class="h-4 bg-neutral-100 dark:bg-dark-surface rounded w-full"></div>
        </div>

        <!-- Full-height page image — scroll to explore -->
        <img
          *ngIf="!isLoading()"
          [src]="activeView().imagePath"
          [alt]="activeView().altText"
          class="w-full h-auto block page-enter"
          (error)="onImageError()"
          loading="lazy"
        />

        <!-- Scroll hint badge — shown briefly then fades -->
        <div
          *ngIf="!isLoading()"
          class="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/85 dark:bg-neutral-800/90 text-white text-[11px] font-medium backdrop-blur-sm shadow-lg scroll-hint-fade border border-white/10"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
          Scroll to explore
        </div>

        <!-- Expand on double-click overlay (so normal scroll still works) -->
        <button
          type="button"
          (dblclick)="openLightbox()"
          class="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/90 dark:bg-dark-card/90 border border-neutral-200 dark:border-dark-border text-neutral-700 dark:text-neutral-200 text-[11px] font-medium backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-dark-card hover:shadow-lg transition-all opacity-0 group-hover:opacity-100"
          title="Double-click to expand full size"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
          Expand
        </button>
      </div>

      <!-- ─── Status bar + caption ─── -->
      <div class="flex items-center justify-between gap-4 px-3 py-2 bg-[#f8f7f5] dark:bg-[#12141c] border-t border-neutral-200 dark:border-dark-border text-[11px] text-neutral-500 dark:text-neutral-400 select-none">
        <div class="flex items-center gap-1.5 min-w-0">
          <svg class="w-3 h-3 text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/></svg>
          <span class="truncate">{{ activeView().caption }}</span>
        </div>
        <span class="flex-shrink-0 font-mono text-neutral-400 dark:text-neutral-500">{{ activeIndex() + 1 }}/{{ views.length }}</span>
      </div>

      <!-- ─── Page nav dots ─── -->
      <div class="flex items-center justify-center gap-1.5 py-2.5 bg-[#f0eeec] dark:bg-[#0e1017] border-t border-neutral-200 dark:border-dark-border">
        <button
          *ngFor="let v of views; let i = index"
          type="button"
          (click)="navigateTo(i)"
          class="transition-all duration-200 rounded-full"
          [ngClass]="{
            'w-5 h-1.5 bg-neutral-800 dark:bg-emerald-400': activeIndex() === i,
            'w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-500': activeIndex() !== i
          }"
          [attr.aria-label]="'Go to ' + v.label"
        ></button>
      </div>
    </div>

    <!-- Lightbox -->
    <app-lightbox
      *ngIf="isLightboxOpen()"
      [views]="views"
      [initialIndex]="activeIndex()"
      (close)="closeLightbox()"
    ></app-lightbox>
  `
})
export class FakeBrowserComponent implements OnDestroy {
  @Input() views: ProjectView[] = [];

  @ViewChild('viewport') viewportRef!: ElementRef<HTMLElement>;

  activeIndex    = signal(0);
  isLoading      = signal(false);
  isLightboxOpen = signal(false);

  private loadingTimer: ReturnType<typeof setTimeout> | null = null;

  activeView = computed(() => this.views[this.activeIndex()] ?? this.views[0]);

  currentUrl = computed(() => {
    const v = this.activeView();
    return v.browserUrl ? `https://${v.browserUrl}` : `https://petites.com`;
  });

  navigateTo(index: number): void {
    if (index < 0 || index >= this.views.length || index === this.activeIndex()) return;
    this.triggerLoad(index);
  }

  reload(): void {
    this.triggerLoad(this.activeIndex());
  }

  private triggerLoad(index: number): void {
    if (this.loadingTimer) clearTimeout(this.loadingTimer);
    this.isLoading.set(true);
    this.loadingTimer = setTimeout(() => {
      this.activeIndex.set(index);
      this.isLoading.set(false);
      if (this.viewportRef?.nativeElement) {
        this.viewportRef.nativeElement.scrollTop = 0;
      }
    }, 400);
  }

  onFaviconError(event: Event): void {
    const el = event.target as HTMLImageElement;
    el.style.display = 'none';
  }

  onImageError(): void {
    const current = this.activeView();
    if (current?.fallbackImagePath && current.imagePath !== current.fallbackImagePath) {
      current.imagePath = current.fallbackImagePath!;
    }
  }

  openLightbox(): void  { this.isLightboxOpen.set(true);  }
  closeLightbox(): void { this.isLightboxOpen.set(false); }

  ngOnDestroy(): void {
    if (this.loadingTimer) clearTimeout(this.loadingTimer);
  }
}
