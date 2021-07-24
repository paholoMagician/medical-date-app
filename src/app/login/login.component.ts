import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})

export class LoginComponent implements OnInit {

  public user;
  public pass;

  constructor( public alog: LoginService, public router: Router ) { }

  ngOnInit() {

  }

  public arr: any = [];
  public codec_trabajdor;


  genCodigo() {
    var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
    var contrasenia = "";
    for (let i=0; i<9; i++) contrasenia +=caracteres.charAt(Math.floor(Math.random()*caracteres.length));
    this.codec_trabajdor = contrasenia;
    return this.codec_trabajdor;
  }

  uplog() {

    this.arr = {
      nombre_user: this.user,
      pass_user: this.pass
    }

    this.alog.log(this.arr).subscribe( x => {
      this.alog.getUser(this.user).subscribe( user => {
        console.log( user )
        sessionStorage.setItem( 'Name_User:', user[0].nombre_user );
        sessionStorage.setItem('Codec_User', user[0].token_user);
        Swal.fire({
          icon: 'success',
          title: 'Bien!',
          text: 'Ingreso exitoso!'
        })
        this.router.navigate(['/servicios']);
      })
    })

  }



}
