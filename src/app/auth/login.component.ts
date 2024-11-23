import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { LoginRequest } from './login-request';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from './auth.service';
import { LoginResponse } from './login-response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, RouterLink, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {

  form!: UntypedFormGroup;
  loginRequest!: LoginRequest;
  loginResponse!: LoginResponse;

  constructor(private authService: AuthService){
    
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  onSubmit(): void {
    var loginRequest: LoginRequest = {
      userName: this.form.controls["userName"].value,
      password: this.form.controls["password"].value
    };
    this.authService.login(loginRequest).subscribe(
      {
        next: result => {
          this.loginResponse = result;
          console.log(this.loginResponse);
          if (result.success) {
            localStorage.setItem("comp584wk", result.token)
          }
        },
        error: e => console.error(e)
      }
    )
  }
}
