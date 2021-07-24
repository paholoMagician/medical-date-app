import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiURL = 'http://localhost:5000/';

  constructor(private http: HttpClient, public router: Router) { }

  getCatGen = ()          => this.http.get(this.apiURL + 'api/Categoria/getCategoriasGen');
  getCatId  = (categoria) => this.http.get(this.apiURL + 'api/Categoria/getCategoriasByCategoria/' + categoria);
  postCat   = (content)   => this.http.post(this.apiURL + 'api/Categoria/PostCategoria', content);
  delCat    = (id)        => this.http.get(this.apiURL + 'api/Categoria/DeleteCategoria/' + id);
  getnumbserv = (cat, tus)=> this.http.get(this.apiURL + 'api/Categoria/getNumberServCat/' + cat + '/' + tus);


  //redes sociales control
  getsoc    = (opt, username)     => this.http.get(this.apiURL + 'api/SocialControl/getSocialControl/' + opt + '/' + username);
  updatesoc = (username, content) => this.http.put(this.apiURL + 'api/SocialControl/updateSocial/' + username, content)
  postsoc   = (content)           => this.http.post(this.apiURL + 'api/SocialControl/postsoc', content)
  deltsoc   = (id, username)      => this.http.get(this.apiURL + 'api/SocialControl/delsoc/' + id + '/' + username)

}
