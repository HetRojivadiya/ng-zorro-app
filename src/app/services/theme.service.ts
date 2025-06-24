import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Theme {
  name: string;
  displayName: string;
  primaryColor: string;
  isDark?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<string>('default');
  public currentTheme$ = this.currentThemeSubject.asObservable();

  private themes: Theme[] = [
    { name: 'default', displayName: 'Default Blue', primaryColor: '#1890ff' },
    { name: 'dark', displayName: 'Dark Theme', primaryColor: '#177ddc', isDark: true },
    { name: 'purple', displayName: 'Purple Theme', primaryColor: '#722ed1' },
    { name: 'green', displayName: 'Green Theme', primaryColor: '#52c41a' }
  ];

  constructor() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    this.setTheme(savedTheme);
  }

  getThemes(): Theme[] {
    return this.themes;
  }

  getCurrentTheme(): string {
    return this.currentThemeSubject.value;
  }

  setTheme(themeName: string): void {
    document.documentElement.removeAttribute('data-theme');
    document.body.classList.remove('theme-default', 'theme-dark', 'theme-purple', 'theme-green');

    document.documentElement.setAttribute('data-theme', themeName);
    document.body.classList.add(`theme-${themeName}`);

    localStorage.setItem('selectedTheme', themeName);
    this.currentThemeSubject.next(themeName);
  }

  toggleDarkMode(): void {
    const currentTheme = this.getCurrentTheme();
    this.setTheme(currentTheme === 'dark' ? 'default' : 'dark');
  }
}
