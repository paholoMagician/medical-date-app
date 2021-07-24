import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocialcontrolService {

  private apiURL = 'http://localhost:5000/';

  constructor(private http: HttpClient, public router: Router) { }

  getSsocialRed(opt, username) {
    return this.http.get( this.apiURL + 'api/SocialControl/getSocialControl/' + opt + '/' + username )
  }



}
