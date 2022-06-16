import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categori} from "../models/categori";
import {Formation} from "../models/formation";
import {Apprenant} from "../models/apprenant";

@Injectable({
  providedIn: 'root'
})
export class CategoriService {
  api=environment.Api+"categoris";
  constructor(private http:HttpClient) { }

  getAll():Observable<Categori[]>{
    return this.http.get<Categori[]>(this.api);
}
  addC(addC : Categori){
    return this.http.post(this.api,addC);
}
  getCById(id:string):Observable<any>{
    return this.http.get<Categori>(`${this.api}/${id}`)
 }

 delC(id:string):Observable<any>{

     return this.http.delete<Categori>(`${this.api}/${id}`)
 }
  update (id:String , updated : any):Observable<Categori>{
    return this.http.put<Categori>(`${this.api}/${id}` , updated);
  }

}
