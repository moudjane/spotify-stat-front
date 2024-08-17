import { Routes } from '@angular/router';
import { TopTracksComponent } from './top-tracks/top-tracks.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthService } from './auth.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  {
    path: 'top-tracks',
    component: TopTracksComponent,
    canActivate: [AuthService], // Utilise le guard pour protéger la route
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirection par défaut vers login
];