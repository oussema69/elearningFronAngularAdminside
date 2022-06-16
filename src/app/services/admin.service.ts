import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Apprenant} from "../models/apprenant";
import {HttpClient} from "@angular/common/http";
import {Admin} from "../models/admin";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  api=environment.Api+"users";

  constructor(private http:HttpClient) {

  }
  updateAdmin (id:String , updated : any):Observable<Admin>{
    return this.http.put<Admin>(`${this.api}/${id}` , updated);
  }
}
