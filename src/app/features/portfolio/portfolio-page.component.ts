import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItem } from '../../core/models/project.model';
import { PROJECTS_DATA } from '../../core/data/projects.data';
import { PortfolioHeaderComponent } from './components/portfolio-header.component';
import { HeroSectionComponent } from './components/hero-section.component';
import { ArchitectureExplorerComponent } from '../../shared/components/architecture-explorer/architecture-explorer.component';
import { ApiSandboxComponent } from '../../shared/components/api-sandbox/api-sandbox.component';
import { ProjectsSectionComponent } from './components/projects-section.component';
import { PetitesCaseStudyComponent } from '../case-study/petites-case-study.component';
import { ExperienceSectionComponent } from './components/experience-section.component';
import { SkillsSectionComponent } from './components/skills-section.component';
import { PortfolioFooterComponent } from './components/portfolio-footer.component';
import { ProjectModalComponent } from '../../shared/components/project-modal/project-modal.component';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
    CommonModule,
    PortfolioHeaderComponent,
    HeroSectionComponent,
    ArchitectureExplorerComponent,
    ApiSandboxComponent,
    ProjectsSectionComponent,
    PetitesCaseStudyComponent,
    ExperienceSectionComponent,
    SkillsSectionComponent,
    PortfolioFooterComponent,
    ProjectModalComponent
  ],
  template: `
    <div class="min-h-screen flex flex-col bg-warm-50 dark:bg-dark-bg text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 dark:selection:bg-emerald-500 selection:text-white dark:selection:text-neutral-950 transition-colors duration-200">
      <app-portfolio-header></app-portfolio-header>

      <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        <app-hero-section></app-hero-section>

        <!-- Interactive Architecture Explorer Section -->
        <section id="architecture-visualizer" class="mb-20 sm:mb-28 scroll-mt-20">
          <app-architecture-explorer></app-architecture-explorer>
        </section>

        <!-- Live REST API Sandbox Section -->
        <section id="api-sandbox" class="mb-20 sm:mb-28 scroll-mt-20">
          <app-api-sandbox></app-api-sandbox>
        </section>

        <!-- Featured Projects Showcase Section -->
        <app-projects-section
          [projects]="projects"
          (projectSelect)="openProjectModal($event)"
        ></app-projects-section>

        <!-- Petites Full Architecture Case Study -->
        <section class="mb-20 sm:mb-28 scroll-mt-20">
          <app-petites-case-study></app-petites-case-study>
        </section>

        <!-- Experience & Education Timeline -->
        <app-experience-section></app-experience-section>

        <!-- Technical Skills Taxonomy -->
        <app-skills-section></app-skills-section>
      </main>

      <app-portfolio-footer></app-portfolio-footer>

      <!-- Deep Dive Project Modal -->
      <app-project-modal
        *ngIf="selectedProject()"
        [project]="selectedProject()!"
        (close)="closeProjectModal()"
      ></app-project-modal>
    </div>
  `
})
export class PortfolioPageComponent {
  projects: ProjectItem[] = PROJECTS_DATA;
  selectedProject = signal<ProjectItem | null>(null);

  openProjectModal(project: ProjectItem): void {
    this.selectedProject.set(project);
  }

  closeProjectModal(): void {
    this.selectedProject.set(null);
  }
}
