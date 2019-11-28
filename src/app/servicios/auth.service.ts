import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { NgxSpinnerService } from "ngx-spinner";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore, private spinner: NgxSpinnerService, private functions: AngularFireFunctions) { }

  public addAdminRole = this.functions.httpsCallable('addRole');




  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData),          
            this.updateUserData(userData.user)
        }).catch(err => console.log(reject(err)))
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }

  loginFacebookUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(credential => this.updateUserData(credential.user))
  }

  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => {this.updateUserData(credential.user); 
      this.addAdminRole({email: credential.user.email, displayName: credential.user.displayName})
      .subscribe(result => {console.log(result)},error => {console.log(error)})});
  }

  logoutUser() {
    return this.afsAuth.auth.signOut();
  }
  

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  private updateUserData(user) {
    console.log("el usuario");
    console.log(user)
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: any = {
      id: user.uid,
      email: user.email,
      roles: {
        editor: true
      }
    }
    return userRef.set(data, { merge: true })
  }


  isUserAdmin() {
    return this.afsAuth.idTokenResult.pipe(
      map(result =>{
        console.log(result.claims)
        return result.claims.admin;
      })
    )
    return this.afs.doc<any>(`users/${"sfaa"}`).valueChanges();
  }

  showSpinner(){
    this.spinner.show();
  }

  hideSpinner(){
    this.spinner.hide();
  }


}