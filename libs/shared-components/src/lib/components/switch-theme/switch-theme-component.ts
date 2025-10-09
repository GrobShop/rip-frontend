import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'lib-switch-theme-component',
  imports: [
    NgIf
  ],
  templateUrl: './switch-theme-component.html',
  styleUrl: './switch-theme-component.css',
  standalone: true
})
export class SwitchThemeComponent {
  isDarkTheme = false;
  private subscription: Subscription | undefined;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.subscription = this.themeService.theme$.subscribe(theme => {
      this.isDarkTheme = theme === 'dark';
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  ngOnDestroy() {
    // @ts-ignore
    this.subscription.unsubscribe();
  }
}
