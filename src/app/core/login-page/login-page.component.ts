import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from '../../resources/constants';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  form!: FormGroup;
  loading: boolean = false;
  loadingSpinner: boolean = false
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private app: AppService
  ) { }

  ngOnInit(): void {
    // Initialize the form with email and password fields
    this.form = this.fb.group({
      email: ['mymail@gmail.com', [Validators.required, Validators.email]], // Email field with validation
      password: ['1111', [Validators.required, Validators.minLength(4)]], // Password with minLength validation
    });
  }

  login() {
    this.loading = true;    
    setTimeout(() => {      
      this.loading = false;      
      this.router.navigate(['/app/dashboard']);
    }, 2000);
  }

  signin() {
    if (this.form.invalid) {
      this.errorMessage = 'Please enter a valid username or password'
      return;
    }
    this.loadingSpinner = true;
    this.errorMessage = '';
    this.app.coreService.SignIn(this.form.value.email, this.form.value.password)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.loadingSpinner = false;
          if (res['message'] == Constant.SUCCESS) {
            this.app.snackbar.open('Welcome Back', 'Close', { duration: 3000 });
            this.app.saveToStore(Constant.USER_INFO, res['data'])
            this.router.navigate(['/app/dashboard']);            
          } else {            
            this.errorMessage = res['data'];
          }
        },

        error: (error) => {
          this.loadingSpinner = false
          this.errorMessage = Constant.ERROR_MSG
        }
      });
  }

}
