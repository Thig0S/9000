import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  it('renders the page shell with navbar, hero, and one 9000 heading', async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('app-navbar')).toBeTruthy();
    expect(root.querySelector('app-hero')).toBeTruthy();
    expect(root.querySelectorAll('h1').length).toBe(1);
    expect(root.querySelector('h1')?.textContent?.trim()).toBe('9000');
    expect(root.textContent).not.toContain('Congratulations!');
  });
});
