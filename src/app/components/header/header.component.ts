import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatusService } from '../../services/login-status.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private loginStatus: LoginStatusService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  doLogout(): void {
    this.loginStatus.setStatus(false);
    this.router.navigate(['/login']);
  }
}
