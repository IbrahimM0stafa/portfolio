import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectPreviewComponent } from './project-preview.component';
import { ProjectView } from '../../../core/models/project.model';

describe('ProjectPreviewComponent', () => {
  let component: ProjectPreviewComponent;
  let fixture: ComponentFixture<ProjectPreviewComponent>;

  const mockViews: ProjectView[] = [
    {
      id: 'storefront',
      label: 'Storefront',
      imagePath: '/images/projects/petites/storefront.svg',
      fallbackImagePath: '/images/projects/petites/storefront-hero.png',
      altText: 'Petites Storefront',
      caption: 'Main storefront',
      deviceType: 'desktop'
    },
    {
      id: 'checkout',
      label: 'Checkout',
      imagePath: '/images/projects/petites/checkout.svg',
      altText: 'Petites Checkout',
      deviceType: 'desktop'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPreviewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectPreviewComponent);
    component = fixture.componentInstance;
    component.views = mockViews;
    component.projectTitle = 'Petites';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should default to first view', () => {
    expect(component.activeIndex()).toBe(0);
    expect(component.activeView().id).toBe('storefront');
  });

  it('should change active view when selectIndex is called', () => {
    component.selectIndex(1);
    expect(component.activeIndex()).toBe(1);
    expect(component.activeView().id).toBe('checkout');
  });

  it('should toggle lightbox state', () => {
    expect(component.isLightboxOpen()).toBeFalse();
    component.openLightbox();
    expect(component.isLightboxOpen()).toBeTrue();
    component.closeLightbox();
    expect(component.isLightboxOpen()).toBeFalse();
  });

  it('should fall back to fallbackImagePath on image error if present', () => {
    component.selectIndex(0);
    component.onImageError();
    expect(component.activeView().imagePath).toBe('/images/projects/petites/storefront-hero.png');
  });
});
