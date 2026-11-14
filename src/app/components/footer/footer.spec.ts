import { TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer', () => {
  it('renders the footer credit', async () => {
    await TestBed.configureTestingModule({ imports: [Footer] }).compileComponents();
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('footer')).toBeTruthy();
    expect(root.querySelector('footer p')?.textContent?.trim()).toBe('Desenvolvido por 9 mil pessoas');
  });
});
