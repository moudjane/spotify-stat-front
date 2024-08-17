import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'auth_token';
  private clientId = 'a42db6a5835c4061a8deb0a847c91ec6';
  private redirectUri = 'http://localhost:4200/callback';
  private scope = 'user-read-private user-top-read';
  private authEndpoint = 'https://accounts.spotify.com/authorize';

  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private router: Router) {}

  // La méthode login qui redirige l'utilisateur vers Spotify pour l'authentification
  login() {
    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: 'token',
      redirect_uri: this.redirectUri,
      scope: this.scope,
      show_dialog: 'true'
    });
  
    window.location.href = `${this.authEndpoint}?${params.toString()}`;
  }

  // La méthode handleAuthCallback qui gère le retour après authentification
  handleAuthCallback() {
    const hash = window.location.hash;
    console.log('Hash from URL:', hash);
  
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get('access_token');
      console.log('Extracted token:', token);
  
      if (token) {
        this.storeToken(token);
        this.authStatus.next(true);
        console.log('Token stored, navigating to /top-tracks');
        this.router.navigate(['/top-tracks']);
      } else {
        console.error('No token found in callback');
        this.router.navigate(['/login']);
      }
    } else {
      console.error('No hash found in callback URL');
      this.router.navigate(['/login']);
    }
  }

  // Vérifie si un token est stocké
  private hasToken(): boolean {
    return !!this.getToken();
  }

  // Stocke le token dans le localStorage
  private storeToken(token: string) {
    localStorage.setItem(this.authTokenKey, token);
  }

  // Récupère le token stocké
  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  // Observable pour vérifier l'état de connexion
  isLoggedIn(): BehaviorSubject<boolean> {
    return this.authStatus;
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
  
    sessionStorage.clear();
    
    this.authStatus.next(false);
    
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  // Guard pour protéger les routes
  canActivate(): boolean {
    if (this.hasToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}