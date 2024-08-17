import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../spotify.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-top-tracks',
  standalone: true,
  imports: [CommonModule],  // Assurez-vous que CommonModule est importé ici
  templateUrl: './top-tracks.component.html',
  styleUrls: ['./top-tracks.component.css']
})
export class TopTracksComponent implements OnInit {

  topTracks: any[] = [];
  timeRange: string = 'long_term'; // Par défaut, "All Time"

  constructor(private spotifyService: SpotifyService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadTopTracks();
  }

  setTimeRange(range: string) {
    this.timeRange = range;
    this.loadTopTracks();
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

  logout(): void {
    this.authService.logout();
  }
}