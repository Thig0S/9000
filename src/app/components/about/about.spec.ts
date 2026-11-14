import { TestBed } from '@angular/core/testing';
import { About } from './about';

describe('About', () => {
  it('renders its labelled section, title, and official biography', async () => {
    await TestBed.configureTestingModule({ imports: [About] }).compileComponents();
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const section = root.querySelector('section#quem-e-o-9');
    const title = root.querySelector('h2#about-title');
    const image = root.querySelector('img.about-banner');
    const paragraphs = [...root.querySelectorAll('p')].map((paragraph) =>
      paragraph.textContent?.trim(),
    );

    expect(section?.getAttribute('aria-labelledby')).toBe('about-title');
    expect(title?.textContent?.trim()).toBe('QUEM É O 9?');
    expect(section?.querySelectorAll('h1, h2, h3, h4, h5, h6').length).toBe(1);
    expect(image?.getAttribute('src')).toBe('imgs/imagemParaQuemÉo9.png');
    expect(image?.getAttribute('alt')).toContain('Victor Kovalski');
    expect(image?.getAttribute('loading')).toBe('lazy');
    expect(image?.getAttribute('decoding')).toBe('async');
    expect(image?.getAttribute('width')).toBe('720');
    expect(image?.getAttribute('height')).toBe('658');
    expect(paragraphs).toEqual([
      '9000, ou simplesmente 9, para os intímos, nascido no dia 14/11/2006 ao invés de 09/09/9999. Estudante de Agronomia no CAV , completou 20 anos ao invés de 9, desapontando seus fãs.',
    ]);
  });
});
