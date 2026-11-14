import { TestBed } from '@angular/core/testing';
import { Hero } from './hero';

describe('Hero', () => {
  it('renders the requested heading, copy, CTA, and descriptive image', async () => {
    await TestBed.configureTestingModule({ imports: [Hero] }).compileComponents();
    const fixture = TestBed.createComponent(Hero);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent?.trim()).toBe('9000');
    expect(root.querySelector('p.max-w-\\[46ch\\]')?.textContent).toContain('Victor Kovalski transforma ideias em projetos');
    expect(root.querySelector('a[href="#quem-e-o-9"]')?.textContent).toContain('Quem é o 9');
    expect(root.querySelector('img')?.getAttribute('alt')).toContain('Victor Kovalski');
  });
});
