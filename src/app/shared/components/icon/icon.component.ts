import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LucideIconName =
  | 'arrow-right'
  | 'external-link'
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'maximize'
  | 'x'
  | 'chevron-left'
  | 'chevron-right'
  | 'play'
  | 'pause'
  | 'smartphone'
  | 'monitor'
  | 'layers'
  | 'check-circle'
  | 'shield-check'
  | 'cpu'
  | 'database'
  | 'code'
  | 'sparkles'
  | 'eye'
  | 'file-text'
  | 'info'
  | 'sun'
  | 'moon'
  | 'terminal'
  | 'zap'
  | 'sliders'
  | 'git-branch'
  | 'server'
  | 'activity'
  | 'filter';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      [class]="className"
      aria-hidden="true"
      focusable="false"
      [ngSwitch]="name"
    >
      <!-- sun -->
      <g *ngSwitchCase="'sun'">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </g>

      <!-- moon -->
      <g *ngSwitchCase="'moon'">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </g>

      <!-- terminal -->
      <g *ngSwitchCase="'terminal'">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" x2="20" y1="19" y2="19"></line>
      </g>

      <!-- zap -->
      <g *ngSwitchCase="'zap'">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </g>

      <!-- sliders -->
      <g *ngSwitchCase="'sliders'">
        <line x1="4" x2="4" y1="21" y2="14"></line>
        <line x1="4" x2="4" y1="10" y2="3"></line>
        <line x1="12" x2="12" y1="21" y2="12"></line>
        <line x1="12" x2="12" y1="8" y2="3"></line>
        <line x1="20" x2="20" y1="21" y2="16"></line>
        <line x1="20" x2="20" y1="12" y2="3"></line>
        <line x1="1" x2="7" y1="14" y2="14"></line>
        <line x1="9" x2="15" y1="8" y2="8"></line>
        <line x1="17" x2="23" y1="16" y2="16"></line>
      </g>

      <!-- git-branch -->
      <g *ngSwitchCase="'git-branch'">
        <line x1="6" x2="6" y1="3" y2="15"></line>
        <circle cx="18" cy="6" r="3"></circle>
        <circle cx="6" cy="18" r="3"></circle>
        <path d="M18 9a9 9 0 0 1-9 9"></path>
      </g>

      <!-- server -->
      <g *ngSwitchCase="'server'">
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
        <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
        <line x1="6" x2="6.01" y1="6" y2="6"></line>
        <line x1="6" x2="6.01" y1="18" y2="18"></line>
      </g>

      <!-- activity -->
      <g *ngSwitchCase="'activity'">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </g>

      <!-- filter -->
      <g *ngSwitchCase="'filter'">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </g>

      <!-- arrow-right -->
      <g *ngSwitchCase="'arrow-right'">
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
      </g>

      <!-- external-link -->
      <g *ngSwitchCase="'external-link'">
        <path d="M15 3h6v6"></path>
        <path d="M10 14 21 3"></path>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      </g>

      <!-- github -->
      <g *ngSwitchCase="'github'">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
        <path d="M9 18c-4.51 2-5-2-7-2"></path>
      </g>

      <!-- linkedin -->
      <g *ngSwitchCase="'linkedin'">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect width="4" height="12" x="2" y="9"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </g>

      <!-- mail -->
      <g *ngSwitchCase="'mail'">
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </g>

      <!-- maximize -->
      <g *ngSwitchCase="'maximize'">
        <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
        <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
        <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
        <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
      </g>

      <!-- x -->
      <g *ngSwitchCase="'x'">
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </g>

      <!-- chevron-left -->
      <g *ngSwitchCase="'chevron-left'">
        <path d="m15 18-6-6 6-6"></path>
      </g>

      <!-- chevron-right -->
      <g *ngSwitchCase="'chevron-right'">
        <path d="m9 18 6-6-6-6"></path>
      </g>

      <!-- play -->
      <g *ngSwitchCase="'play'">
        <polygon points="6 3 20 12 6 21 6 3"></polygon>
      </g>

      <!-- pause -->
      <g *ngSwitchCase="'pause'">
        <rect width="4" height="16" x="6" y="4"></rect>
        <rect width="4" height="16" x="14" y="4"></rect>
      </g>

      <!-- smartphone -->
      <g *ngSwitchCase="'smartphone'">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
        <path d="M12 18h.01"></path>
      </g>

      <!-- monitor -->
      <g *ngSwitchCase="'monitor'">
        <rect width="20" height="14" x="2" y="3" rx="2"></rect>
        <line x1="8" x2="16" y1="21" y2="21"></line>
        <line x1="12" x2="12" y1="17" y2="21"></line>
      </g>

      <!-- layers -->
      <g *ngSwitchCase="'layers'">
        <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path>
        <path d="m22 12.5-9.17 4.16a2 2 0 0 1-1.66 0L2 12.5"></path>
        <path d="m22 17.5-9.17 4.16a2 2 0 0 1-1.66 0L2 17.5"></path>
      </g>

      <!-- check-circle -->
      <g *ngSwitchCase="'check-circle'">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <path d="m9 11 3 3L22 4"></path>
      </g>

      <!-- shield-check -->
      <g *ngSwitchCase="'shield-check'">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
        <path d="m9 12 2 2 4-4"></path>
      </g>

      <!-- cpu -->
      <g *ngSwitchCase="'cpu'">
        <rect width="16" height="16" x="4" y="4" rx="2"></rect>
        <rect width="6" height="6" x="9" y="9"></rect>
        <path d="M15 2v2"></path>
        <path d="M15 20v2"></path>
        <path d="M2 15h2"></path>
        <path d="M2 9h2"></path>
        <path d="M20 15h2"></path>
        <path d="M20 9h2"></path>
        <path d="M9 2v2"></path>
        <path d="M9 20v2"></path>
      </g>

      <!-- database -->
      <g *ngSwitchCase="'database'">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
      </g>

      <!-- code -->
      <g *ngSwitchCase="'code'">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </g>

      <!-- sparkles -->
      <g *ngSwitchCase="'sparkles'">
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"></path>
      </g>

      <!-- eye -->
      <g *ngSwitchCase="'eye'">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </g>

      <!-- file-text -->
      <g *ngSwitchCase="'file-text'">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
        <path d="M10 9H8"></path>
        <path d="M16 13H8"></path>
        <path d="M16 17H8"></path>
      </g>

      <!-- info -->
      <g *ngSwitchDefault>
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
      </g>
    </svg>
  `
})
export class IconComponent {
  @Input() name: LucideIconName = 'info';
  @Input() size: number = 20;
  @Input() strokeWidth: number = 2;
  @Input() className: string = 'inline-block align-middle';
}
