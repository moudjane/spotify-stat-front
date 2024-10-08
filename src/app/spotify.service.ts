import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrlTracks = 'https://api.spotify.com/v1/me/top/tracks';
  private apiUrlArtists = 'https://api.spotify.com/v1/me/top/artists';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getTopTracks(timeRange: string = 'long_term'): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const params = {
      time_range: timeRange,
      limit: '50'
    };

    return this.http.get<any>(this.apiUrlTracks, { headers, params });
  }

  getTopArtists(timeRange: string = 'long_term'): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const params = {
      time_range: timeRange,
      limit: '50'
    };

    return this.http.get<any>(this.apiUrlArtists, { headers, params });
  }
}