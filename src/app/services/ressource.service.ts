import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Formation} from "../models/formation";
import {Chapitre} from "../models/chapitre";
import {Ressource} from "../models/ressource";

@Injectable({
  providedIn: 'root'
})
export class RessourceService {

  api = environment.Api + "ressources/";

  constructor(private http: HttpClient) {
  }

  getByCh(ch: string): Observable<any> {
    return this.http.get<Formation>(`${this.api}findch/${ch}`);
  }
  addRes(resAdd : Ressource):Observable<any>{
    return this.http.post(this.api,resAdd);
  }
  deleteRes(id:string){
    return this.http.delete(`${this.api}${id}`)
  }

}
