import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer: Renderer2;
  private themeSubject = new BehaviorSubject<string>('light');
  theme$ = this.themeSubject.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.applyTheme(localStorage.getItem('theme') || 'light');
  }

  toggleTheme() {
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
  }

  private applyTheme(theme: string) {
    this.themeSubject.next(theme);
    if (theme === 'dark') {
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
    }
    localStorage.setItem('theme', theme);
  }
}
