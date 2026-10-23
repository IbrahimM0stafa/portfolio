import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="skills" class="mb-20 sm:mb-28 scroll-mt-20">
      <div class="mb-8">
        <span class="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
          Core Competencies
        </span>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Technical Skills Taxonomy
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- 1. Languages & Frontend -->
        <div class="p-5 rounded-2xl bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border shadow-subtle hover:border-emerald-500/50 transition-all flex flex-col justify-between">
          <div>
            <div class="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mb-3">
              <app-icon name="code" [size]="16"></app-icon>
            </div>
            <h3 class="text-sm font-bold text-neutral-900 dark:text-white mb-2">
              Languages &amp; Frontend
            </h3>
            <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
              <strong class="text-neutral-900 dark:text-white">Languages:</strong> Java, TypeScript, JavaScript, Python, C, C++, Dart, PHP.
            </p>
            <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <strong class="text-neutral-900 dark:text-white">Frontend:</strong> Angular, HTML, CSS, Responsive Design.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-neutral-200 dark:border-dark-border text-[11px] font-mono text-neutral-400">
            Angular &bull; TypeScript &bull; Java
          </div>
        </div>

        <!-- 2. Backend & Databases -->
        <div class="p-5 rounded-2xl bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border shadow-subtle hover:border-emerald-500/50 transition-all flex flex-col justify-between">
          <div>
            <div class="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-950/60 text-green-600 dark:text-green-400 flex items-center justify-center mb-3">
              <app-icon name="cpu" [size]="16"></app-icon>
            </div>
            <h3 class="text-sm font-bold text-neutral-900 dark:text-white mb-2">
              Backend &amp; Databases
            </h3>
            <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
              <strong class="text-neutral-900 dark:text-white">Backend:</strong> Spring Boot, Node.js, Express, REST APIs, Microservices, WebSockets.
            </p>
            <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <strong class="text-neutral-900 dark:text-white">Databases:</strong> PostgreSQL, MySQL, MongoDB.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-neutral-200 dark:border-dark-border text-[11px] font-mono text-neutral-400">
            Spring Boot &bull; PostgreSQL &bull; MySQL
          </div>
        </div>

        <!-- 3. Testing, Tools & Concepts -->
        <div class="p-5 rounded-2xl bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border shadow-subtle hover:border-emerald-500/50 transition-all flex flex-col justify-between">
          <div>
            <div class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <app-icon name="database" [size]="16"></app-icon>
            </div>
            <h3 class="text-sm font-bold text-neutral-900 dark:text-white mb-2">
              Testing, Tools &amp; Concepts
            </h3>
            <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
              <strong class="text-neutral-900 dark:text-white">Testing &amp; Tools:</strong> JUnit, Jasmine, Postman, Docker, Git, Linux.
            </p>
            <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <strong class="text-neutral-900 dark:text-white">Concepts:</strong> REST APIs, Unit/Integration Testing, Microservices, CI/CD, Agile.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-neutral-200 dark:border-dark-border text-[11px] font-mono text-neutral-400">
            Docker &bull; CI/CD &bull; Agile &bull; JUnit
          </div>
        </div>
      </div>
    </section>
  `
})
export class SkillsSectionComponent {}
