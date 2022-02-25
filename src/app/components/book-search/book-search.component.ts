import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
})
export class BookSearchComponent implements OnInit {
  @Output() bookSearch: EventEmitter<any> = new EventEmitter();

  searchForm!: FormGroup;
  submitted: boolean = false;
  message: string = '';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      name: ['', [Validators.pattern('[a-zA-Z ]*')]],
    });
  }

  // Helper for easier access to form fields
  get f() {
    return this.searchForm.controls;
  }

  onSearch(): void {
    this.message = '';
    this.submitted = true;

    if (this.searchForm.invalid) return;

    const bookName = this.searchForm.value.name;
    let queryParam = bookName ? `?name=${bookName}` : '';

    this.http.get(`/api/v1/books/${queryParam}`).subscribe(
      (data: any) => {
        this.searchForm.reset();
        this.submitted = false;
        this.bookSearch.emit(data);
      },
      (error: any) => {
        console.warn(error);
        this.submitted = false;
        this.message =
          'There was an error in the application, please try again later.';
      }
    );
  }
}
