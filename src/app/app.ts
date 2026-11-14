import { ChangeDetectionStrategy, Component } from '@angular/core';
import { About } from './components/about/about';
import { Footer } from './components/footer/footer';
import { Hero } from './components/hero/hero';
import { History } from './components/history/history';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, Hero, About, History, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
