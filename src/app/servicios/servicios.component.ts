import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { MedicalServicesService } from '../services/medical-services.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.styl']
})
export class ServiciosComponent implements OnInit {

  public _descCats;
  public _userCats;

  public iconoSoc: any;
  //#region
  public _nServ: string;
  public _dServ: string;
  public _fServ;
  public _pServ: number;
  public _cServ;
  public _cat;
  //#endregion

  public _bgColor: string;
  public boolColor: boolean = false;
  public _h;
  public fColor;
  public dateNow;

  public catsBool: boolean = false;
  public categoriasel: string = 'Categoría sin seleccionar';


  public codec_trabajdor;
  public picc_servicio;

  //------------------CONFIGURACION REDES SOCIALES INICIO--------------------------

  public _twitter: string;
  public _facebook: string;
  public _instagram: string;
  public _youtube: string;
  public _emails: string;

  //------------------CONFIGURACION REDES SOCIALES FIN--------------------------

  public _redsociallink: string;

  constructor( public mServices: MedicalServicesService, public catServs: CategoriaService,  public router: Router ) { }

  ngOnInit() {

    this.getNumbCat();

    this._userCats = sessionStorage.getItem('Name_User:');

    /* ----------------------------------------------------- */
    this.gsoc('_void_', sessionStorage.getItem('Name_User:'));
    /* ----------------------------------------------------- */

    this.dateNow = new Date();
    this._h = screen.height + 'px';
    // sessionStorage.setItem('Name_User:', 'Prueba User')
    // sessionStorage.setItem('Codec_User:', this.genCodigo());
    this.getcatGen();
    this.getServicesGn();
    this._bgColor = localStorage.getItem('color-bg');
    this.fColor = this._bgColor;

    //--------------------------------------------------------
    this._twitter   = sessionStorage.getItem('Facebook');
    this._facebook  = sessionStorage.getItem('Twitter');
    this._instagram = sessionStorage.getItem('Instagram');
    this._youtube   = sessionStorage.getItem('Youtube');
    this._emails    = sessionStorage.getItem('Email');
    //--------------------------------------------------------

   }

   changeColor(a) {
    localStorage.setItem('color-bg', a);
   }

   saveSocialMeds(a, b, c, d, e) {
     sessionStorage.setItem('Facebook', a);
     sessionStorage.setItem('Twitter', b);
     sessionStorage.setItem('Instagram', c);
     sessionStorage.setItem('Youtube', d);
     sessionStorage.setItem('Email', e);

     Swal.fire({
      icon:  'success',
      title: 'Bien!',
      text:  'Haz guardado tus URL, con éxito!'
    })

   }

  public socMedArr: any = [];
   gsoc(a, b) {
     this.catServs.getsoc(a, b).subscribe( soc => {
      this.socMedArr = soc;
      console.log(this.socMedArr);
     })
   }

   public utSoc: any = [];
   updatesoc(id, url) {

    this.utSoc = {
      username: sessionStorage.getItem('Name_User:'),
      social_med_account: url,
      icono: this.iconoSoc,
      id: id
    }

    this.catServs.updatesoc(id, this.utSoc).subscribe( upsoc => {
      this.socMedArr = upsoc;
    })

   }

   postsoc(url) {
     this.utSoc = {
      username: sessionStorage.getItem('Name_User:'),
      social_med_account: url,
      icono: this.iconoSoc,
     }

     console.log(this.utSoc);

     this.catServs.postsoc(this.utSoc).subscribe( postsoc => {
       this.socMedArr = postsoc;
       this.gsoc('_void_', sessionStorage.getItem('Name_User:'));
       Swal.fire(
        'Bien!',
        'Tu red social se ha guardado con éxito, tus clientes podrán revisarlas ahora.',
        'success'
      )
     }, err => {
      Swal.fire(
        'Oops!',
        'Tu red social no ha sido guardado con éxito.',
        'error'
      )
     })

   }

delsoc(id) {
  this.catServs.deltsoc(id, sessionStorage.getItem('Name_User:')).subscribe( del => {
    this.gsoc('_void_', sessionStorage.getItem('Name_User:'));
    Swal.fire(
      'Bien!',
      'Tu red social se ha eliminado con éxito, tus clientes ya no la podrán ver.',
      'success'
    )
  }, err => {
    Swal.fire(
      'error!',
      'Revisa tu conexiòn.',
      'error'
    )
  } )
}

   encodeImageFileAsURLA(idA, idB) {
    const filesSelected = document.getElementById(idA) as HTMLInputElement;
    const fileId = filesSelected.files;
    let base;
    if (fileId.length > 0) {
      const fileToLoad = filesSelected[0];
      const fileReader = new FileReader();

      // tslint:disable-next-line: only-arrow-functions
      fileReader.onload = () => {
        base = fileReader.result;
        localStorage.setItem('IMGA', base)
        document.getElementById(idB).style.backgroundImage = `url(${base})`;
      };

      fileReader.onloadend = () => {
        this.picc_servicio = fileReader.result;
        //console.log(this.picb_trabajador);
      };

      const a = fileReader.readAsDataURL(fileId[0]);

    }
  }

  encodeIconileAsURL(idA, idB) {
    const filesSelected = document.getElementById(idA) as HTMLInputElement;
    const fileId = filesSelected.files;
    let base;
    if (fileId.length > 0) {
      const fileToLoad = filesSelected[0];
      const fileReader = new FileReader();

      // tslint:disable-next-line: only-arrow-functions
      fileReader.onload = () => {
        base = fileReader.result;
        localStorage.setItem('icon-img', base)
        document.getElementById(idB).style.backgroundImage = `url(${base})`;
      };

      fileReader.onloadend = () => {
        this.iconoSoc = fileReader.result;
      };

      const a = fileReader.readAsDataURL(fileId[0]);

    }
  }

  public catsFor: any = [];
  public cants;
  getNumbCat() {
    this.catServs.getnumbserv(this.catsFor[0].categoria, sessionStorage.getItem('Codec_User')).subscribe( numcat => {
      this.cants = numcat[0].num_services;
      // console.log(this.cants);
    })
  }

  public catSave: any = [];
  public arrSaveCats: any = [];
  public arrCatsAndServs: any = [];

  getcatGen() {

    this.catServs.getCatGen().subscribe( y => {

      this.arrSaveCats = y;
      this.mServices.getServicesbcat('Fisioterapia', 'a').subscribe(
        f => {
          console.log(f)
      })

    })
  }

  saveCategoria() {
    this.catSave = {
      categoria: this._cat,
      descripcion: this._descCats,
      webuser: sessionStorage.getItem('Name_User:')
    }

    // console.log(this.catSave);

    this.catServs.postCat(this.catSave).subscribe( x =>{

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'se ha guardado exitosamente tu categoria'
      })

      this.getcatGen();
    }, (err) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: 'No hemos podido guardar  tu categoria, no tienes conexión'
      })
    })

  }

  delCategoria(categoria) {
    this.catServs.delCat(categoria).subscribe( DEL => {

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'se ha eliminado exitosamente tu categoria'
      })


      this.getcatGen();
      //alert('Tu categoria se ha eliminado con exito');
    }, (err) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: 'No hemos podido eliminar tu categoria, no tienes conexión'
      })
    })
  }

  getCat(a) {

    this.catsBool = true;
    sessionStorage.setItem('Categoria-seleccionada', a);
    return this.categoriasel = a;

  }

  genCodigo() {
    var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
    var contrasenia = "";
    for (let i=0; i<9; i++) contrasenia +=caracteres.charAt(Math.floor(Math.random()*caracteres.length));
    this.codec_trabajdor = contrasenia;
    return this.codec_trabajdor;
  }

  public arrServs: any = [];

  saveServices() {

    this.arrServs = {
      nombre_servicio: this._nServ,
      descripcion_servicio: this._dServ,
      foto_servicio: this.picc_servicio,
      user_log: sessionStorage.getItem('Name_User'),
      user_token: sessionStorage.getItem('Codec_User'),
      categoria: this.categoriasel,
      precio: this._pServ
    }

    if ( this._nServ == '' || this._dServ == '' ) {

      document.getElementById('ver').addEventListener('click', () => {
        alert('Estas dejando campos vacios');
      })

    }

    else {
        this.mServices.postServicesGen(this.arrServs).subscribe( ps => {
          //console.log(ps);
          //alert('Servicio creado correctamente')

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Servicio o producto, guardado correctamente'
          })

          this.getServicesGn();
        }, (err) => {
          //alert('Servicio no se ha podido crear');
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'error',
            title: 'No hemos podido guardar  tu servicio o producto, no tienes conexión'
          })
        })
    }

  }

  validateCats() {
    if( this.categoriasel == 'Categoría sin seleccionar' ){
      Swal.fire(
        'Opps!',
        'No has escogido una categoría, por eso no puedes visualizar este servicio!',
        'error'
      )
    }
  }

  public arrIdServs: any = [];
  getServicesID(id, idA) {

    this.validateCats();
    this.mServices.getServicesbId(id).subscribe( a => {
      this.arrIdServs = a;
      this._nServ         = this.arrIdServs[0].nombre_servicio ;
      this._dServ         = this.arrIdServs[0].descripcion_servicio;
      this.picc_servicio  = this.arrIdServs[0].foto_servicio;
      this._pServ         = this.arrIdServs[0].precio;
      document.getElementById(idA).style.backgroundImage = `url(${this.picc_servicio})`;

    })

  }

  updateService(id) {
    this.arrServs = {
      nombre_servicio: this._nServ,
      descripcion_servicio: this._dServ,
      foto_servicio: this.picc_servicio,
      precio: this._pServ,
      id: id
    }
    console.log('Esto es el update')
    console.log(this.arrServs);

    this.mServices.putServicesGen(id, this.arrServs).subscribe(  us => {
      this.getServicesGn();
      alert('Se actualizo con exito')
      // console.log(us)
    }, err => alert('No se pudo actualizar'))
  }

  public arrServsGet: any = [];
  getServicesGn() {
    this.mServices.getServicesGen().subscribe( gs => {
      this.arrServsGet = gs;
      console.log(this.arrServsGet);
    })
  }

  delServices = (id) => {
    this.mServices.delServicesGen(id).subscribe(d => console.log(d));
    this.getServicesGn();
  };

  closeSession() {
    sessionStorage.removeItem('Name_User:');
    sessionStorage.removeItem('Codec_User:');

    this.router.navigate(['\Login']);

    console.log('cerrando')

    // if( (sessionStorage.getItem('Name_User:') == '' || sessionStorage.getItem('Name_User:') == undefined)
    //      &&  (sessionStorage.getItem('Codec_User:') == '' || sessionStorage.getItem('Codec_User:') == undefined) ) {

    // }

  }

}
