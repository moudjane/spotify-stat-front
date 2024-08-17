import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeKey = 'theme';

  constructor() {
    const savedTheme = this.getTheme();
    if (savedTheme) {
      this.applyTheme(savedTheme);
    } else {
      this.applyTheme('light');
    }
  }

  toggleTheme(): void {
    const currentTheme = this.getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }

  applyTheme(theme: string): void {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem(this.themeKey, theme);
  }

  getTheme(): string | null {
    return localStorage.getItem(this.themeKey);
  }
}