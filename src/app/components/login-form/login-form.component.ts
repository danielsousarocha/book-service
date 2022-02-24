import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  isloggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit(data: any): void {
    console.log(data);
    this.isloggedIn = true;
    this.router.navigate(['/home']);
  }
}
