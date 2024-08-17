import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-top-artists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.css']
})
export class TopArtistsComponent implements OnInit {

  topArtists: any[] = [];
  timeRange: string = 'long_term';

  constructor(
    private spotifyService: SpotifyService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.timeRange = params['timeRange'] || 'long_term';
      this.loadTopArtists();
    });
  }

  setTimeRange(range: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { timeRange: range },
      queryParamsHandling: 'merge',
    });
  }

  loadTopArtists(): void {
    this.spotifyService.getTopArtists(this.timeRange).subscribe(
      data => {
        this.topArtists = data.items;
        console.log('Top artists loaded:', this.topArtists);
      },
      error => console.error('Error fetching top artists', error)
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