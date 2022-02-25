import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css'],
})
export class CreatePageComponent implements OnInit {
  registerForm!: FormGroup;
  submitted: boolean = false;
  message: string = '';
  pageMode: string = 'create';
  bookId: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      year: ['', [Validators.required, Validators.pattern('[0-9]{4}')]],
      authors: ['', [Validators.required, Validators.pattern('[a-zA-Z ,]*')]],
      summary: ['', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('id');

      if (this.bookId) {
        this.http.get(`/api/v1/books/${this.bookId}`).subscribe(
          (data: any) => {
            this.registerForm.patchValue(data);
            this.pageMode = 'edit';
          },
          (error) => {
            console.warn(error);
          }
        );
      }
    });
  }

  // Helper for easier access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.message = '';
    this.submitted = true;

    if (this.registerForm.invalid) return;

    let formData = this.registerForm.value;

    if (typeof formData.authors === 'string') {
      formData.authors = formData.authors.split(',');
    }

    if (this.pageMode === 'create') {
      this.http.post(`/api/v1/books/`, this.registerForm.value).subscribe(
        (data: any) => {
          this.registerForm.reset();
          this.submitted = false;
          this.router.navigate(['/home']);
        },
        (error: any) => {
          console.warn(error);
          this.submitted = false;
          this.message =
            'There was an error in the application, please try again later.';
        }
      );
    } else {
      this.http
        .put(`/api/v1/books/${this.bookId}`, this.registerForm.value)
        .subscribe(
          (data: any) => {
            this.registerForm.reset();
            this.submitted = false;
            this.router.navigate(['/home']);
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
}
