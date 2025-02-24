import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service'; // Service to handle authentication
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup | undefined;
  
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.signinForm!.valid) {
      const formData = this.signinForm!.value;
      this.authService.signIn(formData).subscribe(response => {
        // Handle successful signin (e.g., navigate to dashboard)
        this.router.navigateByUrl('/home');
        console.log('Signin successful', response);
      }, error => {
        // Handle error (e.g., show error message)
        console.error('Signin failed', error);
      });
    }
  }
}
