import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  template: '<p>Loading...</p>',
})
export class CallbackComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.handleAuthCallback();
  }
}