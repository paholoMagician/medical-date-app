import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { MedicalServicesService } from '../services/medical-services.service';
import { SocialcontrolService } from '../services/socialcontrol.service';

@Component({
  selector: 'app-dashusernor',
  templateUrl: './dashusernor.component.html',
  styleUrls: ['./dashusernor.component.styl']
})

export class DashusernorComponent implements OnInit {

  public catSelect: string;
  public _services: string;
  public _boolServices: boolean = false;
  public _catID: string;
  public arrSaveCats: any = [];
  public serviCats: any = [];

  constructor( public mServices: MedicalServicesService,
               public catServs: CategoriaService,
               public socialcontrolService:SocialcontrolService ) { }

  ngOnInit() {
    this.getcatGen();
    this.getsocgen();
    //this.getCatID('Fisioterapia')
  }

  getcatGen() {
    this.catServs.getCatGen().subscribe( y => {
      this.arrSaveCats = y;
      this.getCatID(this.arrSaveCats[0].categoria);
      this.catSelect = this.arrSaveCats[0].categoria;
      localStorage.setItem('categoria', this.arrSaveCats[0].categoria);
      // console.log(this.arrSaveCats[0].categoria);
    })
  }

  getcat(servicio) {

    this.catSelect = localStorage.getItem('categoria');
    this._boolServices = true;

    this.mServices.getServicesbcat(this.catSelect, servicio).subscribe( y => {
      this.arrSaveCats = y;
      console.log(this.arrSaveCats);
    })

  }

  getCatID(categoria) {
    this.catServs.getCatId(categoria).subscribe( b => {
      this.arrSaveCats = b;
      localStorage.setItem('categoria', categoria);
      console.log(b);
    })
  }

  public arrsoc: any = [];
  getsocgen() {
    this.socialcontrolService.getSsocialRed('_void_', sessionStorage.getItem('Name_User:')).subscribe( wuser => {
      this.arrsoc = wuser;
      console.log(this.arrsoc);
    })
  }

}
