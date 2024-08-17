import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]  // Importe CommonModule ici
})
export class AppComponent {
  title = 'spotify-stat-front';
  isLoginPage: boolean = false;

  constructor(private router: Router) {
    // Écoute les changements de route pour déterminer si on est sur la page de login
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isLoginPage = event.url === '/login';
    });
  }

  toggleTheme(): void {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
    const newTheme = currentTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';

    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);

    // Sauvegarder le thème sélectionné dans le localStorage
    localStorage.setItem('theme', newTheme);
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    document.body.classList.add(savedTheme);
  }
}