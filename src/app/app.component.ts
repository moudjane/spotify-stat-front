import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { ThemeService } from './theme.service'; // Importer ThemeService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AppComponent {
  title = 'spotify-stat-front';
  isLoginPage: boolean = false;

  constructor(private router: Router, private themeService: ThemeService) {
    // Écoute les changements de route pour déterminer si on est sur la page de login
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isLoginPage = event.url === '/login';
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme(); // Utilise le ThemeService pour changer le thème
  }

  ngOnInit() {
    // Appliquer le thème sauvegardé au démarrage de l'application
    const savedTheme = this.themeService.getTheme();
    if (savedTheme) {
      this.themeService.applyTheme(savedTheme);
    } else {
      this.themeService.applyTheme('light'); // Applique le thème clair par défaut
    }
  }
}