import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LightboxComponent } from './lightbox.component';
import { ProjectView } from '../../../core/models/project.model';

describe('LightboxComponent', () => {
  let component: LightboxComponent;
  let fixture: ComponentFixture<LightboxComponent>;

  const mockViews: ProjectView[] = [
    {
      id: 'view-1',
      label: 'View 1',
      imagePath: '/images/1.png',
      altText: 'Alt 1'
    },
    {
      id: 'view-2',
      label: 'View 2',
      imagePath: '/images/2.png',
      altText: 'Alt 2'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightboxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LightboxComponent);
    component = fixture.componentInstance;
    component.views = mockViews;
    component.initialIndex = 0;
    fixture.detectChanges();
  });

  it('should create the lightbox', () => {
    expect(component).toBeTruthy();
  });

  it('should advance to next view and loop', () => {
    expect(component.currentIndex).toBe(0);
    component.nextView();
    expect(component.currentIndex).toBe(1);
    component.nextView();
    expect(component.currentIndex).toBe(0);
  });

  it('should go to previous view and loop', () => {
    expect(component.currentIndex).toBe(0);
    component.previousView();
    expect(component.currentIndex).toBe(1);
    component.previousView();
    expect(component.currentIndex).toBe(0);
  });

  it('should emit close on Escape key', () => {
    spyOn(component.close, 'emit');
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    component.onKeyDown(escapeEvent);
    expect(component.close.emit).toHaveBeenCalled();
  });
});
