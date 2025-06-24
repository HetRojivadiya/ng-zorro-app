import { Component, OnInit } from '@angular/core';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.less'],
  standalone: false
})
export class ThemeSwitcherComponent implements OnInit {
  themes: Theme[] = [];
  currentTheme = 'default';
  isDarkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themes = this.themeService.getThemes();

    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
      this.isDarkMode = theme === 'dark';
    });
  }

  selectTheme(themeName: string): void {
    this.themeService.setTheme(themeName);
  }

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }
}
