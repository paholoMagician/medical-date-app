import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MedicalServicesService {

  private apiURL = 'http://localhost:5000/';

  constructor(private http: HttpClient, public router: Router) { }

  getServicesGen  = () => this.http.get(this.apiURL + 'api/MedicalServices/getMedicalServices');
  getServicesbId  = (id) => this.http.get(this.apiURL + 'api/MedicalServices/getMedicalServicesById/' + id);
  getServicesbcat  = (categoria, servicio) => this.http.get(this.apiURL + 'api/MedicalServices/getMedicalServicesByCategorias/' + categoria + '/' + servicio);
  postServicesGen = (content) => this.http.post(this.apiURL + 'api/MedicalServices/PostMedicalServices', content);
  putServicesGen  = (id, content) => this.http.put(this.apiURL + 'api/MedicalServices/PutMedicalServices/' + id, content);
  delServicesGen  = (id) => this.http.get(this.apiURL + 'api/MedicalServices/DeleteMedicalServices/' + id);

}
