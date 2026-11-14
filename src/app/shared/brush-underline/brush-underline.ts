import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-brush-underline',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg aria-hidden="true" focusable="false" preserveAspectRatio="none" viewBox="0 0 240 12" class="block h-[10px] w-full">
      <path [attr.fill]="variant() === 'yellow' ? '#f5bb08' : '#d92e29'" d="M2 7.5C45 2 111 2 238 5.3l-8 4C143 7 70 8 4 11Z" />
      <path [attr.fill]="variant() === 'yellow' ? '#f5bb08' : '#d92e29'" opacity=".48" d="M10 3.5C65 1 142 1 225 3l-17 2C129 4 68 5 10 7Z" />
    </svg>
  `,
})
export class BrushUnderline {
  readonly variant = input<'red' | 'yellow'>('red');
}
