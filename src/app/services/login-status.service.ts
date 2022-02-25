import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginStatusService {
  private loggedIn: boolean = false;

  constructor() {}

  setStatus(value: boolean): void {
    this.loggedIn = value;
  }

  getStatus(): boolean {
    return this.loggedIn;
  }
}
