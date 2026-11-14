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
    expect(image?.getAttribute('src')).toBe('/imgs/imagemParaHistoriaDo9.png');
    expect(image?.getAttribute('alt')).toContain('Victor Kovalski');
    expect(image?.getAttribute('loading')).toBe('lazy');
    expect(image?.getAttribute('decoding')).toBe('async');
    expect(image?.getAttribute('width')).toBe('321');
    expect(image?.getAttribute('height')).toBe('340');
    expect(image?.closest('figure')?.classList.contains('photo-frame')).toBe(true);
    expect(paragraphs).toEqual([
      'O nome 9000 (ou simplesmente Nove) surgiu de forma natural, entre amigos, e rapidamente se tornou parte da sua identidade. Tudo começou com uma brincadeira em um grupo, quando, em meio a várias ideias de apelido, alguém soltou “nove mil”. A piada pegou, e o que era apenas um comentário descontraído logo virou o seu vulgo.',
      'Desde então, o 9000 acompanha Victor Kovalski em projetos, estudos e na sua jornada na área de tecnologia, representando mais do que um apelido: é uma marca da sua história, das amizades que construiu e de tudo que vem desenvolvendo ao longo do caminho.',
    ]);
  });
});
