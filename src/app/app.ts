import { ChangeDetectionStrategy, Component } from '@angular/core';
import { About } from './components/about/about';
import { Hero } from './components/hero/hero';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, Hero, About],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
