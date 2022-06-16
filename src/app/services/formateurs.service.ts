import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Apprenant} from "../models/apprenant";
import {Formateur, Formateurup} from "../models/formateur";

@Injectable({
  providedIn: 'root'
})
export class FormateursService {

  api=environment.Api+"formateurs";
  api1=environment.Api+"formateurs/up";

  constructor(private http:HttpClient) { }
  getall():Observable<Formateur[]>{
    return this.http.get<Formateur[]>(this.api);}

  addF(nFormateur: Formateurup) {
    return this.http.post<Formateur>(this.api,nFormateur);
  }


  getById( id : string):Observable<Apprenant>{
    return this.http.get<Apprenant>(`${this.api}/${id}`);
  }
  update (id:String , updated : any):Observable<Formateur>{
    return this.http.put<Formateur>(`${this.api}/${id}` , updated);
  }

  updateValidation(id:string){
    return this.http.patch(`${this.api}/${id}`,{});
  }
  affecterApp(idApp:string,idRoom:string){
    return this.http.put<Apprenant[]>(`${this.api1}/${idApp}/${idRoom}`,"")
  }
}
