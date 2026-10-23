import {
  Component,
  Input,
  signal,
  OnDestroy,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectView } from '../../../core/models/project.model';
import { LightboxComponent } from '../lightbox/lightbox.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-screenshot-marquee',
  standalone: true,
  imports: [CommonModule, LightboxComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Outer wrapper -->
    <div class="relative w-full rounded-xl sm:rounded-2xl border border-warm-200/90 bg-white shadow-subtle overflow-hidden">

      <!-- Browser chrome header -->
      <div class="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-warm-100/70 border-b border-warm-200/80 select-none">
        <div class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-rose-400/80 inline-block"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block"></span>
          <span class="ml-2 text-xs font-mono text-neutral-500 font-medium hidden sm:inline-block">
            Live Product Tour &bull; {{ views.length }} Screens
          </span>
        </div>
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <app-icon name="shield-check" [size]="12"></app-icon>
            Verified Screens
          </span>
          <span class="text-[11px] font-mono text-neutral-400 hidden sm:inline">
            {{ isPaused() ? 'Paused' : 'Auto-scroll' }}
          </span>
        </div>
      </div>

      <!-- Left fade -->
      <div class="pointer-events-none absolute left-0 top-[44px] bottom-[36px] w-16 sm:w-24 z-10 bg-gradient-to-r from-white to-transparent"></div>
      <!-- Right fade -->
      <div class="pointer-events-none absolute right-0 top-[44px] bottom-[36px] w-16 sm:w-24 z-10 bg-gradient-to-l from-white to-transparent"></div>

      <!-- Viewport clip -->
      <div
        class="overflow-hidden"
        (mouseenter)="pause()"
        (mouseleave)="resume()"
      >
        <!-- Scrolling track -->
        <div
          class="flex items-stretch gap-4 sm:gap-6 py-5 sm:py-6 px-4"
          [style.transform]="'translateX(' + offset() + 'px)'"
          [style.width]="trackWidth + 'px'"
        >
          <ng-container *ngFor="let tile of doubledViews; let i = index">
            <div
              class="relative flex-none group cursor-pointer rounded-xl overflow-hidden border border-warm-200/70 shadow-subtle hover:shadow-card hover:border-neutral-300 transition-all duration-300"
              [style.width]="tileWidth + 'px'"
              [style.height]="tileHeight + 'px'"
              (click)="openLightbox(i % views.length)"
              [title]="tile.label"
            >
              <!-- Screenshot fills the card, cropped from top -->
              <img
                [src]="tile.imagePath"
                [alt]="tile.altText"
                class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.06]"
                loading="lazy"
              />

              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/35 transition-colors duration-300 flex items-center justify-center">
                <div class="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 flex flex-col items-center gap-1.5">
                  <div class="w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                    <app-icon name="maximize" [size]="16" className="text-neutral-800"></app-icon>
                  </div>
                  <span class="text-white text-[10px] font-semibold tracking-wide">Expand</span>
                </div>
              </div>

              <!-- Label badge pinned bottom -->
              <div class="absolute bottom-0 inset-x-0 px-3 py-2.5 bg-gradient-to-t from-neutral-900/90 via-neutral-900/50 to-transparent">
                <span class="text-white text-[11px] font-semibold tracking-wide truncate block leading-tight">{{ tile.label }}</span>
                <span *ngIf="tile.badge" class="text-white/60 text-[10px] font-mono truncate block mt-0.5">{{ tile.badge }}</span>
              </div>
            </div>
          </ng-container>
        </div>
      </div>

      <!-- Bottom hint strip -->
      <div class="flex items-center justify-center gap-2 py-2 border-t border-warm-200/60 bg-warm-50/60 text-[11px] text-neutral-500 select-none">
        <app-icon name="info" [size]="11" className="text-neutral-400"></app-icon>
        <span>Hover to pause &bull; Click any screen to expand full size</span>
      </div>
    </div>

    <!-- Lightbox -->
    <app-lightbox
      *ngIf="isLightboxOpen()"
      [views]="views"
      [initialIndex]="lightboxIndex()"
      (close)="closeLightbox()"
    ></app-lightbox>
  `
})
export class ScreenshotMarqueeComponent implements AfterViewInit, OnDestroy {
  @Input() views: ProjectView[] = [];

  readonly tileWidth  = 320;
  readonly tileHeight = 210;
  readonly gap        = 24;
  readonly speed      = 0.55; // px per frame

  offset         = signal(0);
  isPaused       = signal(false);
  isLightboxOpen = signal(false);
  lightboxIndex  = signal(0);

  private rafId: number | null = null;
  private singleSetWidth = 0;

  get doubledViews(): ProjectView[] {
    return [...this.views, ...this.views];
  }

  get trackWidth(): number {
    return (this.tileWidth + this.gap) * this.doubledViews.length + this.gap;
  }

  ngAfterViewInit(): void {
    this.singleSetWidth = (this.tileWidth + this.gap) * this.views.length;
    this.startScroll();
  }

  ngOnDestroy(): void {
    this.stopScroll();
  }

  private startScroll(): void {
    const step = () => {
      if (!this.isPaused()) {
        const next = this.offset() - this.speed;
        this.offset.set(next <= -this.singleSetWidth ? 0 : next);
      }
      this.rafId = requestAnimationFrame(step);
    };
    this.rafId = requestAnimationFrame(step);
  }

  private stopScroll(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  pause(): void  { this.isPaused.set(true);  }
  resume(): void { this.isPaused.set(false); }

  openLightbox(index: number): void {
    this.lightboxIndex.set(index);
    this.isLightboxOpen.set(true);
    this.pause();
  }

  closeLightbox(): void {
    this.isLightboxOpen.set(false);
    this.resume();
  }
}
