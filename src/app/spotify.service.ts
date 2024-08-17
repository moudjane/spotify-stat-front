import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1/me/top/tracks';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTopTracks(): Observable<any> {
    const token = this.authService.getToken();
    console.log('Using token for API request:', token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }
}