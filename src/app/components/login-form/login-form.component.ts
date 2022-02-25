import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginStatusService } from '../../services/login-status.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  isLoggedIn!: boolean;
  registerForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private loginStatus: LoginStatusService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.loginStatus.getStatus();

    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
      return;
    }

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Helper for easier access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) return;

    this.loginStatus.setStatus(true);
    this.router.navigate(['/home']);
  }
}
