import { TestBed } from '@angular/core/testing';
import { BrushUnderline } from './brush-underline';

describe('BrushUnderline', () => {
  it('renders decorative SVGs for red and yellow variants', async () => {
    await TestBed.configureTestingModule({ imports: [BrushUnderline] }).compileComponents();
    const red = TestBed.createComponent(BrushUnderline);
    red.detectChanges();
    expect(red.nativeElement.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
    expect(red.nativeElement.querySelector('path')?.getAttribute('fill')).toBe('#d92e29');
    const yellow = TestBed.createComponent(BrushUnderline);
    yellow.componentRef.setInput('variant', 'yellow');
    yellow.detectChanges();
    expect(yellow.nativeElement.querySelector('path')?.getAttribute('fill')).toBe('#f5bb08');
  });
});
