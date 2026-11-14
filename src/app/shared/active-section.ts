export interface SectionRect {
  id: string;
  top: number;
  bottom: number;
}

export function pickActiveSection(
  sections: SectionRect[],
  lastValid = 'inicio',
  viewportHeight = 0,
): string {
  if (!sections.length) return lastValid;
  const anchor = viewportHeight * 0.4;
  const visible = sections.find(({ top, bottom }) => top <= anchor && bottom > anchor);
  if (visible) return visible.id;
  return sections.find(({ top, bottom }) => top < viewportHeight && bottom > 0)?.id ?? lastValid;
}

export function observeActiveSections(
  ids: string[],
  onChange: (id: string) => void,
): () => void {
  const targets = ids.map((id) => document.getElementById(id)).filter((item): item is HTMLElement => !!item);
  if (!targets.length || typeof IntersectionObserver === 'undefined') return () => undefined;
  const observer = new IntersectionObserver(() => {
    const sections = targets.map((element) => {
      const rect = element.getBoundingClientRect();
      return { id: element.id, top: rect.top, bottom: rect.bottom };
    });
    onChange(pickActiveSection(sections, sections[0]?.id ?? 'inicio', window.innerHeight));
  }, { rootMargin: '-40% 0px -55% 0px' });
  targets.forEach((target) => observer.observe(target));
  return () => observer.disconnect();
}
