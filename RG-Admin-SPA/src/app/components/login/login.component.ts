import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../_services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() isLoggedIn = new EventEmitter<any>();
  @Output() componentName: EventEmitter<any> = new EventEmitter();

  model: any = {};
  loginForm: FormGroup;
  errorMessage: any;
  userLoggedIn: any;

  constructor(
    private fb: FormBuilder, 
    private alertify: AlertifyService, 
    private authService: AuthService, 
    private router: Router, 
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.init();
    this.userLoggedIn = this.tokenService.GetToken();
  }

  init () {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  @HostListener('click')
  loginUser () {
    this.authService.loginUser(this.loginForm.value).subscribe(
      data => {
        this.tokenService.SetToken(data.token);
        this.loginForm.reset();
        this.isLoggedIn.emit(true);
        this.authService.toggle();
        this.alertify.success('Login Successful..!!')
        this.router.navigate(['dashboard']);
      },
      err => {
        console.log(err);
        this.isLoggedIn.emit(false);
        setTimeout(() => {
          if (err.error.error) {
            this.alertify.error(err.error.error);
          }

          if (err.error.msg[0].message) {
            this.alertify.warning(err.error.msg[0].message);
          }
        }, 500);
      }
    );
  }

  clearErrorMessage () {
    this.errorMessage = '';
  }

  forgotPassword () {
    this.router.navigate(['forgot-password']);
  }
}
