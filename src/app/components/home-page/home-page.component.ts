import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  books: any = [];

  constructor(private router: Router, private http: HttpClient) {}
  message: string = '';

  ngOnInit(): void {
    this.http.get('/api/v1/books/').subscribe((data) => {
      this.books = data;
    });
  }

  onBookSearch(booksFound: any): void {
    this.books = booksFound;
  }

  editBook(bookId: number): void {
    console.log(bookId);
    this.router.navigate(['/edit', bookId]);
  }

  deleteBook(bookId: number): void {
    this.message = '';

    this.http.delete(`/api/v1/books/${bookId}`).subscribe(
      (data: any) => {
        if (data.result) {
          this.removeBookFromList(bookId);
          this.message = `Book #${bookId} deleted`;
        } else {
          this.message = `The book could not be deleted`;
        }
      },
      (error) => {
        console.warn(error);
        this.message = `The book could not be deleted`;
      }
    );
  }

  private removeBookFromList(key: number) {
    this.books.forEach((value: any, index: number) => {
      if (value.id == key) this.books.splice(index, 1);
    });
  }
}
