import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="mb-20 sm:mb-28 scroll-mt-20">
      <div class="mb-8">
        <span class="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
          Career Timeline
        </span>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Professional Experience &amp; Education
        </h2>
      </div>

      <div class="space-y-6">
        <!-- 1. Workflex International B.V. -->
        <div class="p-6 rounded-2xl bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border shadow-card flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div class="space-y-2 max-w-3xl">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                Full-Stack Engineer (Spring Boot &amp; Angular) &bull; Workflex International B.V.
              </h3>
              <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                Remote / Germany
              </span>
            </div>
            <p class="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Aug 2025 – Aug 2026
            </p>
            <ul class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 space-y-1.5 list-disc pl-4 marker:text-emerald-500 leading-relaxed">
              <li>Developed and maintained full-stack features for workation and business travel platforms using Spring Boot, TypeScript, Angular, and PostgreSQL.</li>
              <li>Designed and implemented REST APIs, integrated frontend applications, and wrote unit and integration tests to improve application reliability.</li>
              <li>Optimized database queries and schema design to improve application performance.</li>
              <li>Collaborated with a remote Agile team to deliver end-to-end features and support continuous deployment workflows.</li>
            </ul>
          </div>
        </div>

        <!-- 2. DXC Technology -->
        <div class="p-6 rounded-2xl bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border shadow-card flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div class="space-y-2 max-w-3xl">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                Software Engineering Intern &bull; DXC Technology
              </h3>
              <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">
                Remote / Egypt
              </span>
            </div>
            <p class="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Mar 2025 – Aug 2025
            </p>
            <ul class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 space-y-1.5 list-disc pl-4 marker:text-indigo-500 leading-relaxed">
              <li>Built a Smart City monitoring platform using Angular, TypeScript, Spring Boot, Java 21, and MySQL.</li>
              <li>Developed REST APIs with JWT authentication, conducted API testing, and integrated monitoring dashboards.</li>
              <li>Optimized database queries and indexing to improve API response times and application performance.</li>
              <li>Deployed containerized applications using Docker and Docker Compose in an Agile environment.</li>
            </ul>
          </div>
        </div>

        <!-- 3. iSchool -->
        <div class="p-6 rounded-2xl bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border shadow-card flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div class="space-y-2 max-w-3xl">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                Demi Coding Instructor &bull; iSchool
              </h3>
              <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                Egypt
              </span>
            </div>
            <p class="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Jun 2024 – Aug 2025
            </p>
            <ul class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 space-y-1.5 list-disc pl-4 marker:text-amber-500 leading-relaxed">
              <li>Led 15+ coding workshops for 100+ students, teaching programming concepts through practical exercises.</li>
              <li>Developed interactive learning modules using Scratch and Python.</li>
              <li>Mentored students in developing functional applications.</li>
            </ul>
          </div>
        </div>

        <!-- 4. Arab International Bank -->
        <div class="p-6 rounded-2xl bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border shadow-card flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div class="space-y-2 max-w-3xl">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                IT Support Intern &bull; Arab International Bank
              </h3>
              <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-neutral-100 dark:bg-dark-surface text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-dark-border">
                Egypt
              </span>
            </div>
            <p class="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Aug 2023 – Sep 2023
            </p>
            <ul class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 space-y-1.5 list-disc pl-4 marker:text-neutral-500 leading-relaxed">
              <li>Resolved technical support issues and assisted with system maintenance and employee onboarding.</li>
            </ul>
          </div>
        </div>

        <!-- Education -->
        <div class="p-6 rounded-2xl bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border shadow-card flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div class="space-y-2 max-w-3xl">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                Bachelor of Science in Computer Engineering &bull; Arab Academy for Science and Technology
              </h3>
              <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-neutral-100 dark:bg-dark-surface text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-dark-border">
                Egypt
              </span>
            </div>
            <p class="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Sep 2020 – Jun 2025
            </p>
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Coursework and engineering foundations in distributed software systems, clean domain architecture, data structures, algorithm design, and relational database management.
            </p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ExperienceSectionComponent {}
