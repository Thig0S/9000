import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrushUnderline } from '../../shared/brush-underline/brush-underline';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [BrushUnderline],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {}
