import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { UserInterface } from 'src/app/models/user';
import { DataApiService } from 'src/app/servicios/data-api.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private servicio: DataApiService) { }
  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    roles: {}
  };

  public providerId: string = 'null';
  ngOnInit() {
    this.authService.showSpinner();
    this.authService.isAuth().subscribe(user => {
      user.getIdTokenResult().then(result =>{
        console.log(result.claims.admin);
      }).catch(error => {console.log(error)});
      this.authService.hideSpinner();
      if (user) {

        this.servicio.getUser(user.uid).subscribe(
          result => {console.log(result),
          error => {console.log(error)}}
        )

        this.user.id = user.uid;
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId;

        console.log(this.user);
      }
    })
  }

}