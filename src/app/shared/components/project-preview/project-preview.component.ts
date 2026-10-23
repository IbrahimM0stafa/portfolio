import {
  Component,
  Input,
  OnInit,
  HostListener,
  signal,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectView } from '../../../core/models/project.model';
import { IconComponent } from '../icon/icon.component';
import { LightboxComponent } from '../lightbox/lightbox.component';

@Component({
  selector: 'app-project-preview',
  standalone: true,
  imports: [CommonModule, IconComponent, LightboxComponent],
  template: `
    <div class="flex flex-col gap-3 w-full">
      <!-- Main Interactive Preview Frame -->
      <div
        class="group relative w-full rounded-xl sm:rounded-2xl border border-warm-200/90 bg-white shadow-subtle hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col"
        (mousemove)="onMouseMove($event)"
        (mouseleave)="onMouseLeave()"
        [style.transform]="tiltTransform()"
      >
        <!-- Browser / App Frame Header Bar -->
        <div class="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-warm-100/70 border-b border-warm-200/80 text-neutral-600 select-none">
          <!-- Window Controls -->
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-rose-400/80 inline-block"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block"></span>
            <span class="ml-2 text-xs font-mono text-neutral-500 font-medium hidden sm:inline-block">
              {{ activeView().deviceType === 'mobile' ? 'Mobile Viewport' : 'Production Preview' }}
            </span>
          </div>

          <!-- Current View Badge / Verified Pill -->
          <div class="flex items-center gap-2">
            <span
              *ngIf="activeView().isVerifiedAsset"
              class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
              title="Verified authentic application asset"
            >
              <app-icon name="shield-check" [size]="12"></app-icon>
              Verified Screen
            </span>

            <span
              *ngIf="!activeView().isVerifiedAsset"
              class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono text-neutral-500 bg-neutral-100 border border-neutral-200"
              title="Application Architecture Blueprint"
            >
              Architecture Spec
            </span>

            <!-- Lightbox trigger button -->
            <button
              type="button"
              (click)="openLightbox()"
              class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-neutral-700 hover:text-neutral-900 hover:bg-warm-200/70 focus-ring transition-colors"
              aria-label="Expand preview in full size lightbox"
            >
              <app-icon name="maximize" [size]="13"></app-icon>
              <span class="hidden sm:inline">Expand</span>
            </button>
          </div>
        </div>

        <!-- Stage Area: Image & Video Canvas -->
        <div
          class="relative w-full cursor-pointer overflow-hidden"
          [ngClass]="{
            'h-[340px] sm:h-[460px] lg:h-[520px]': activeView().deviceType !== 'mobile',
            'min-h-[400px] sm:min-h-[520px] bg-warm-50/50 flex items-center justify-center py-4 sm:py-6': activeView().deviceType === 'mobile'
          }"
          (click)="openLightbox()"
        >
          <!-- Video Mode -->
          <ng-container *ngIf="activeView().videoPath; else imageMode">
            <div class="relative w-full h-full flex items-center justify-center p-2 sm:p-4 bg-warm-50/50">
              <video
                #previewVideo
                [src]="activeView().videoPath"
                class="w-auto max-h-[460px] max-w-full rounded-xl object-contain shadow-card border border-neutral-200"
                playsinline
                muted
                autoplay
                loop
                [poster]="activeView().imagePath"
              ></video>

              <!-- Video overlay controls badge -->
              <div class="absolute bottom-4 right-4 z-10 px-2.5 py-1 rounded-full bg-neutral-900/80 text-white text-xs font-medium backdrop-blur-sm flex items-center gap-1.5 pointer-events-none">
                <app-icon name="play" [size]="11"></app-icon>
                <span>Live Device Recording</span>
              </div>
            </div>
          </ng-container>

          <!-- Image Mode -->
          <ng-template #imageMode>
            <!-- Desktop: fill the frame edge-to-edge, cropped from top like a real browser window -->
            <div
              *ngIf="activeView().deviceType !== 'mobile'; else mobileImageMode"
              class="relative w-full h-full overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            >
              <img
                [src]="activeView().imagePath"
                [alt]="activeView().altText || 'Application showcase view'"
                class="w-full h-full object-cover object-top transition-opacity duration-300"
                (error)="onImageError()"
                loading="lazy"
              />
              <!-- Subtle bottom fade so the crop feels intentional -->
              <div class="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white/30 to-transparent pointer-events-none"></div>
            </div>

            <!-- Mobile: centred contained image with phone-style presentation -->
            <ng-template #mobileImageMode>
              <div class="relative w-full h-full flex items-center justify-center p-2 sm:p-4 transition-transform duration-300 ease-out group-hover:scale-[1.01]">
                <img
                  [src]="activeView().imagePath"
                  [alt]="activeView().altText || 'Application showcase view'"
                  class="max-h-[480px] sm:max-h-[520px] max-w-[280px] sm:max-w-[320px] w-auto object-contain rounded-2xl shadow-elevated border border-neutral-200/80 transition-opacity duration-300"
                  (error)="onImageError()"
                  loading="lazy"
                />
              </div>
            </ng-template>

            <!-- Optional Layered Overlapping Mobile Preview (if configured) -->
            <div
              *ngIf="enableLayeredPreview && mobileOverlayView() && activeView().deviceType !== 'mobile'"
              class="hidden md:block absolute -bottom-2 -right-2 z-10 max-w-[170px] lg:max-w-[190px] rounded-2xl shadow-2xl border-2 border-white bg-white p-1 transition-transform duration-300 hover:scale-105"
              (click)="$event.stopPropagation(); selectViewById(mobileOverlayView()!.id)"
              title="Click to inspect Mobile Experience"
            >
              <img
                [src]="mobileOverlayView()?.imagePath"
                [alt]="mobileOverlayView()?.altText"
                class="w-full rounded-xl object-cover"
              />
              <div class="px-2 py-1 text-[10px] font-semibold text-center text-neutral-700 bg-warm-100 rounded-b-lg">
                Mobile Companion &rarr;
              </div>
            </div>
          </ng-template>

          <!-- Hover Hint Overlay -->
          <div
            class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors duration-200 pointer-events-none flex items-center justify-center"
          >
            <span
              class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-3 py-1.5 rounded-full bg-neutral-900/80 text-white text-xs font-medium backdrop-blur-sm shadow-md"
            >
              Click to inspect full size
            </span>
          </div>
        </div>

        <!-- Caption Strip -->
        <div *ngIf="activeView().caption" class="px-4 py-2 bg-warm-50/80 border-t border-warm-200/60 text-xs text-neutral-600 flex items-center justify-between">
          <p class="truncate flex items-center gap-1.5">
            <app-icon name="info" [size]="13" className="text-neutral-400"></app-icon>
            <span>{{ activeView().caption }}</span>
          </p>
          <span class="text-[11px] font-mono text-neutral-600 flex-shrink-0 ml-2">
            View {{ activeIndex() + 1 }} of {{ views.length }}
          </span>
        </div>
      </div>

      <!-- Clickable View Selector -->
      <nav
        class="flex items-center gap-1.5 sm:gap-2 flex-wrap"
        [attr.aria-label]="projectTitle + ' screenshot views selector'"
      >
        <button
          *ngFor="let view of views; let idx = index"
          type="button"
          (click)="selectIndex(idx)"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all focus-ring border"
          [ngClass]="{
            'bg-neutral-900 text-white border-neutral-900 shadow-sm font-semibold': activeIndex() === idx,
            'bg-white text-neutral-700 border-warm-200 hover:border-neutral-300 hover:bg-warm-100/60': activeIndex() !== idx
          }"
          [attr.aria-selected]="activeIndex() === idx"
          role="tab"
        >
          <!-- Device icon -->
          <app-icon
            [name]="view.videoPath ? 'play' : (view.deviceType === 'mobile' ? 'smartphone' : 'monitor')"
            [size]="13"
            [className]="activeIndex() === idx ? 'text-neutral-200' : 'text-neutral-400'"
          ></app-icon>
          <span>{{ view.label }}</span>
        </button>
      </nav>
    </div>

    <!-- Lightbox Modal Component -->
    <app-lightbox
      *ngIf="isLightboxOpen()"
      [views]="views"
      [initialIndex]="activeIndex()"
      (close)="closeLightbox()"
    ></app-lightbox>
  `
})
export class ProjectPreviewComponent implements OnInit {
  @Input() views: ProjectView[] = [];
  @Input() projectTitle: string = '';
  @Input() enableLayeredPreview: boolean = false;

  activeIndex = signal<number>(0);
  isLightboxOpen = signal<boolean>(false);
  tiltTransform = signal<string>('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  private prefersReducedMotion = false;
  private isTouchDevice = false;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
  }

  activeView = computed(() => {
    return this.views[this.activeIndex()] || this.views[0];
  });

  mobileOverlayView = computed(() => {
    return this.views.find(v => v.deviceType === 'mobile' && v.isOverlayMobile);
  });

  selectIndex(index: number): void {
    if (index >= 0 && index < this.views.length) {
      this.activeIndex.set(index);
    }
  }

  selectViewById(id: string): void {
    const idx = this.views.findIndex(v => v.id === id);
    if (idx !== -1) {
      this.activeIndex.set(idx);
    }
  }

  openLightbox(): void {
    this.isLightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.isLightboxOpen.set(false);
  }

  onImageError(): void {
    const current = this.activeView();
    if (current && current.fallbackImagePath && current.imagePath !== current.fallbackImagePath) {
      current.imagePath = current.fallbackImagePath;
    }
  }

  onMouseMove(e: MouseEvent): void {
    if (this.prefersReducedMotion || this.isTouchDevice) return;

    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width - 0.5) * 2;
    const yPercent = (y / rect.height - 0.5) * 2;

    // Very restrained, subtle tilt (max 1.5 deg)
    const rotateY = xPercent * 1.5;
    const rotateX = -yPercent * 1.5;

    this.tiltTransform.set(`perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`);
  }

  onMouseLeave(): void {
    if (this.prefersReducedMotion || this.isTouchDevice) return;
    this.tiltTransform.set('perspective(1200px) rotateX(0deg) rotateY(0deg)');
  }
}
