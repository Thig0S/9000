import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, Hero],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
