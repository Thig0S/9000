import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrushUnderline } from '../../shared/brush-underline/brush-underline';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BrushUnderline],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {}
