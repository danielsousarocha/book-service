import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  isloggedIn: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(data: any): void {
    console.log(data);
    this.isloggedIn = true;
  }
}
