import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css'],
})
export class CreatePageComponent implements OnInit {
  registerForm!: FormGroup;
  submitted: boolean = false;
  message: string = '';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      year: ['', [Validators.required, Validators.pattern('[0-9]{4}')]],
      authors: ['', [Validators.required, Validators.pattern('[a-zA-Z ,]*')]],
      summary: ['', Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.message = '';
    this.submitted = true;

    if (this.registerForm.invalid) return;

    let formData = this.registerForm.value;
    formData.authors = formData.authors.trim().split(',');

    this.http.post('/api/v1/books/', this.registerForm.value).subscribe(
      (data) => {
        this.registerForm.reset();
        this.submitted = false;
        this.message = 'Book created';
      },
      (error) => {
        console.warn(error);
        this.submitted = false;
        this.message =
          'There was an error in the application, please try again later.';
      }
    );
  }
}
