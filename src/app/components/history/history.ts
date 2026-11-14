import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrushUnderline } from '../../shared/brush-underline/brush-underline';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [BrushUnderline],
  templateUrl: './history.html',
  styleUrl: './history.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class History {}
