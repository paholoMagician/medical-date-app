import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiURL = 'http://localhost:5000/';

  constructor(private http: HttpClient, public router: Router) { }

  // log() {
  //   return this.http.get( this.apiURL + 'api/UserLogin/GetUsuarios')
  //   //console.log('asdasjdkljasd')
  // }

  log(model) {
    return this.http.post( this.apiURL + 'api/UserLogin/login', model);
  }

  getUser(user) {
    return this.http.get( this.apiURL + 'api/UserLogin/getuser/' + user );
  }

  verificacionLog() {
    if(localStorage.getItem('Name_User:') == '' || localStorage.getItem('Name_User:') == null) {
      this.router.navigate(['/login']);
    }

    else {
      this.router.navigate(['/servicios']);
    }

  }



}
