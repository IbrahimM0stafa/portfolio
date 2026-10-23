import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/portfolio/portfolio-page.component').then(
        (m) => m.PortfolioPageComponent
      ),
    title: 'Ibrahim Talaat — Fullstack Software Engineer (Spring Boot & Angular)'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
