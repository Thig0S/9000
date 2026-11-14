import { pickActiveSection } from './active-section';

describe('pickActiveSection', () => {
  it('selects the section crossing the reading line', () => {
    expect(pickActiveSection([
      { id: 'inicio', top: -500, bottom: 100 },
      { id: 'about', top: 100, bottom: 900 },
    ], 'inicio', 800)).toBe('about');
  });

  it('keeps the last valid section if no destination is present or intersecting', () => {
    expect(pickActiveSection([], 'inicio', 800)).toBe('inicio');
    expect(pickActiveSection([{ id: 'history', top: 900, bottom: 1200 }], 'inicio', 800)).toBe('inicio');
  });
});
