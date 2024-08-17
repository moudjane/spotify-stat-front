import { Routes } from '@angular/router';
import { TopTracksComponent } from './top-tracks/top-tracks.component';
import { TopArtistsComponent } from './top-artists/top-artists.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthService } from './auth.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'top-tracks', component: TopTracksComponent, canActivate: [AuthService] },
  { path: 'top-artists', component: TopArtistsComponent, canActivate: [AuthService] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];