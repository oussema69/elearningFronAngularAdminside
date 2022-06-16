import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Formation} from "../models/formation";
import {Apprenant} from "../models/apprenant";
import {Chapitre} from "../models/chapitre";
import {Categori} from "../models/categori";


@Injectable({
  providedIn: 'root'
})
export class FormationsService {
  api = environment.Api + "formations/";
  api1 = environment.Api + "formations/affectation";
  api2 = environment.Api + "formations/daffectation";
  constructor(private http: HttpClient) {
  }

  getByCat(categ: string): Observable<any> {
    return this.http.get<Formation>(`${this.api}findCut/${categ}`);

  }
  getAll():Observable<any>{
    return this.http.get(this.api)
  }


  add(f: Formation) :Observable<any>{
    return this.http.post(this.api,f);
  }
  supprimer(id:string):Observable<any>{
    return this.http.delete<Formation>(`${this.api}${id}`)
  }
  getById( id : string):Observable<Formation>{
    return this.http.get<Formation>(`${this.api}${id}`);
  }

  updateChapters(_id: string, data: Chapitre[]) {
    let chapIds=[];
    for(let i =0;i<data.length;i++){
      chapIds[i]=data[i]._id;
    }

    return this.http.put(`${this.api}updateChapters/${_id}`,chapIds);
  }
  affect (idApp:string , idFor:string):Observable<any>{
    return this.http.put<any>(`${this.api1}/${idFor}/${idApp}` , "");
}
daffect (idApp:string , idFor:string):Observable<any>{
  return this.http.put<any>(`${this.api2}/${idFor}/${idApp}` , "");
}
  update (id:String , updated : any):Observable<Formation>{
    return this.http.put<Formation>(`${this.api}${id}` , updated);
  }
}

