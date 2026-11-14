import { TestBed } from '@angular/core/testing';
import { History } from './history';

describe('History', () => {
  it('renders its labelled section, title, story, and framed photograph', async () => {
    await TestBed.configureTestingModule({ imports: [History] }).compileComponents();
    const fixture = TestBed.createComponent(History);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const section = root.querySelector('section#historia-do-9');
    const title = root.querySelector('h2#history-title');
    const image = root.querySelector('img.history-photo-image');
    const paragraphs = [...root.querySelectorAll('p')].map((paragraph) => paragraph.textContent?.trim());

    expect(section?.getAttribute('aria-labelledby')).toBe('history-title');
    expect(title?.textContent?.trim()).toBe('HISTÓRIA DO 9');
    expect(section?.querySelectorAll('h1, h2, h3, h4, h5, h6').length).toBe(1);
    expect(section?.querySelector('[role="separator"]')?.getAttribute('aria-label')).toBe(
      'Separação entre Quem é o 9 e História do 9',
    );
    expect(image?.getAttribute('src')).toBe('imgs/imagemParaHistoriaDo9.png');
    expect(image?.getAttribute('alt')).toContain('Victor Kovalski');
    expect(image?.getAttribute('loading')).toBe('lazy');
    expect(image?.getAttribute('decoding')).toBe('async');
    expect(image?.getAttribute('width')).toBe('321');
    expect(image?.getAttribute('height')).toBe('340');
    expect(image?.closest('figure')?.classList.contains('photo-frame')).toBe(true);
    expect(paragraphs).toEqual([
      'A foto ao lado representa 9000 e o criador do seu vulgo: Silvio Kovalski!',
      'A ORIGEM DE TUDO: Silvio Kovaslki estava em ligação com sua irmã, Daiane Kovalski. Silvo então relatou sobre o custo absurdo para o seu implante dentário "NOVE MILLLLLL REAIS".',
      'O até então conhecido como "Tchoga" escutou a fala de Silvio, ficou encantado com suas palavras e decidiu que compartilharia a todos!',
      'Após o incidente, criou seu Instagram privado, chamado de 9000, foi o estopim para todos os eventos que levaram aos dias de hoje.',
    ]);
  });
});
