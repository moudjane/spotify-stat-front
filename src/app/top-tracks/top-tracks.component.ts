import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-top-tracks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-tracks.component.html',
  styleUrls: ['./top-tracks.component.css']
})
export class TopTracksComponent implements OnInit {

  topTracks: any[] = [];
  timeRange: string = 'long_term'; // Par défaut, "All Time"

  constructor(
    private spotifyService: SpotifyService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Écoute des changements de paramètres de l'URL
    this.route.queryParams.subscribe((params: Params) => {
      this.timeRange = params['timeRange'] || 'long_term'; // Défaut à 'long_term' si non spécifié
      this.loadTopTracks();
    });
  }

  setTimeRange(range: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { timeRange: range },
      queryParamsHandling: 'merge', // garde les autres paramètres
    });
  }

  loadTopTracks(): void {
    this.spotifyService.getTopTracks(this.timeRange).subscribe(
      data => {
        this.topTracks = data.items;
        console.log('Top tracks loaded:', this.topTracks);
      },
      error => console.error('Error fetching top tracks', error)
    );
  }

  getTimeRangeLabel(): string {
    switch (this.timeRange) {
      case 'long_term': return 'All Time';
      case 'medium_term': return 'Last 6 Months';
      case 'short_term': return 'Last Month';
      default: return '';
    }
  }

  formatArtists(artists: any[]): string {
    return artists.map(artist => artist.name).join(', ');
  }

  logout(): void {
    this.authService.logout();
  }
}