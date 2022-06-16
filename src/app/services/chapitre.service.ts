import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categori} from "../models/categori";
import {Chapitre} from "../models/chapitre";
import {Formation} from "../models/formation";

@Injectable({
  providedIn: 'root'
})
export class ChapitreService {

  api=environment.Api+"chapiters/";

  constructor(private http:HttpClient) { }

  getCByForm(id:string):Observable<any>{
    return this.http.get<Chapitre>(`${this.api}findch/${id}`)
  }
  addCh(addCh : Chapitre){
    return this.http.post(this.api,addCh);
  }
  supprimer(id:string){
    return this.http.delete<Chapitre>(`${this.api}${id}`)
  }
  update(id:string,updated:any){
    return this.http.put<Chapitre>(`${this.api}${id}`,updated)
  }
  updatev(id:string){
    return this.http.patch(`${this.api}${id}`,{})
  }
  getchid(id:string){
    return this.http.get(`${this.api}${id}`)
}
}
