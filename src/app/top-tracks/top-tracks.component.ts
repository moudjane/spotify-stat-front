import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SpotifyService } from '../spotify.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-tracks',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './top-tracks.component.html',
  styleUrls: ['./top-tracks.component.css']
})
export class TopTracksComponent implements OnInit {

  topTracks: any[] = [];

  constructor(private spotifyService: SpotifyService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.authService.login();
      } else {
        this.spotifyService.getTopTracks().subscribe(
          data => {
            this.topTracks = data.items;
            console.log('Top tracks loaded:', this.topTracks);
          },
          error => console.error('Error fetching top tracks', error)
        );
      }
    });
  }

  logout(): void {
    this.authService.logout(); // Appelle la méthode logout du service AuthService
  }
}