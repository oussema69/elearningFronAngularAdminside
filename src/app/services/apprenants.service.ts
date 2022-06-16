import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Apprenant} from "../models/apprenant";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApprenantsService {
  api=environment.Api+"apprenants";
  api1=environment.Api+"apprenants/formations";
  api2=environment.Api+"apprenants/formationss";
  api3=environment.Api+"apprenants/up";
  constructor(private http:HttpClient) { }
  // get all apprenant
  getall():Observable<Apprenant[]>{
   return this.http.get<Apprenant[]>(this.api)
  }
  //ajouter apprenants
  addApp(app:Apprenant){
   return  this.http.post(this.api,app)

  }

   getById( id : string):Observable<Apprenant>{
    return  this.http.get<Apprenant>(`${this.api}/${id}`);
  }

  updateValidation(id:string){
    return this.http.patch(`${this.api}/${id}`,{});
  }

  update (id:String , updated : any):Observable<Apprenant>{
    return this.http.put<Apprenant>(`${this.api}/${id}` , updated);
  }
  getallbyNotformation(id:string):Observable<Apprenant[]>{
    return this.http.get<Apprenant[]>(`${this.api1}/${id}`);

   }
   getallbyformation(id:string):Observable<Apprenant[]>{
    return this.http.get<Apprenant[]>(`${this.api2}/${id}`);

   }
  affecterApp(idApp:string,idRoom:string){
    return this.http.put<Apprenant[]>(`${this.api3}/${idApp}/${idRoom}`,"")
  }
}
