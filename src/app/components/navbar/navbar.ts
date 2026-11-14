import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { BrushUnderline } from '../../shared/brush-underline/brush-underline';
import { observeActiveSections } from '../../shared/active-section';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BrushUnderline],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar implements OnInit, OnDestroy {
  readonly activeId = signal('inicio');
  private stopObserving: () => void = () => undefined;
  readonly links = [
    { id: 'inicio', label: 'Início' },
    { id: 'quem-e-o-9', label: 'Quem é 9' },
    { id: 'historia-do-9', label: 'História 9' },
  ];

  ngOnInit(): void {
    this.stopObserving = observeActiveSections(
      this.links.map(({ id }) => id),
      (id) => this.activeId.set(id),
    );
  }

  ngOnDestroy(): void {
    this.stopObserving();
  }
}
