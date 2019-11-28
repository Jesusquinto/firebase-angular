import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService, private spinner: NgxSpinnerService) { }
  public email: string = '';
  public password: string = '';
  ngOnInit() {
  }

   onLogin(): void {
     this.spinner.show();
    this.authService.loginEmailUser(this.email, this.password)
      .then((res) => {
        this.spinner.hide();
        this.onLoginRedirect();
      }).catch(err => {console.log('err', err.message); this.authService.hideSpinner();});
  } 

  onLoginGoogle(): void {
    this.spinner.show();
    this.authService.loginGoogleUser()
      .then((res) => {
        this.spinner.hide();
        this.onLoginRedirect();
      }).catch(err => {console.log('err', err.message); this.authService.hideSpinner();});
  }
  onLoginFacebook(): void {

    this.authService.loginFacebookUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }

  onLogout() {
    this.authService.logoutUser();
  }
  onLoginRedirect(): void {
    this.router.navigate(['/home']);
  }
}