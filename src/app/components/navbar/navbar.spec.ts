import { TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';

describe('Navbar', () => {
  it('renders the three anchor destinations and an accessible logo', async () => {
    await TestBed.configureTestingModule({ imports: [Navbar] }).compileComponents();
    const fixture = TestBed.createComponent(Navbar);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect([...root.querySelectorAll('nav a')].map((link) => link.getAttribute('href'))).toEqual(['#inicio', '#quem-e-o-9', '#historia-do-9']);
    expect(root.querySelector('a[aria-label="9000 - voltar ao início"]')).toBeTruthy();
    expect(root.querySelectorAll('[aria-current="location"]').length).toBe(1);
  });
});
