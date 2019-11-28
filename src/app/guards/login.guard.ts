import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { take, map, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { isNullOrUndefined } from 'util';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  constructor(private afsAuth: AngularFireAuth, private router: Router){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.afsAuth.authState.pipe(map(auth => {

        if(isNullOrUndefined(auth)){         
         return true;
        }else{
         this.router.navigate(['/home']);
          return false;
          } 
       }))

  }
  
}
