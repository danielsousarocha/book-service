import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  books: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('/api/v1/books/').subscribe((data) => {
      this.books = data;
    });
  }
}
