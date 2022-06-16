import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AffectVisio} from "../models/affectVisio";
import {Apprenant} from "../models/apprenant";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VisioconferenceService {

  api='http://localhost:3000/formateurs/room'
  Api=environment.Api+'formateurs/roomsup'


  constructor(private http:HttpClient) { }
  createroom(data:any):Observable<any>{
    return  this.http.post(this.api,data)
  }
  getroom(res:any):Observable<any>{
    return  this.http.post('http://localhost:3000/formateurs/rooms',res)
  }
  deleteRoom(data:any,id:string):Observable<any>{
    return  this.http.post(`${'http://localhost:3000/formateurs/d'}/${id}`,data)

  }
  getRoomById(idR: string,data: any):Observable<any>{
    return this.http.post(`${'http://localhost:3000/formateurs/rooms'}/${idR}`,data);

  }
sendIdRoom(data:any) {
 return this.http.post('http://localhost:3000/visio',data)
}
sendIdF(idf:string,idR:string){
    return this.http.patch(`${'http://localhost:3000/visio'}/${idf}/${idR}`,{})
}
sendIdApp(idApp:string,idR:string){
    return this.http.put(`${'http://localhost:3000/visio/app'}/${idApp}/${idR}`,{})
}
getByidR(idR:string):Observable<AffectVisio>{
    return this.http.get<AffectVisio>(`${'http://localhost:3000/visio/room'}/${idR}`)
}
getAppById(idApp:string):Observable<Apprenant>{
    return this.http.get<Apprenant>(`${'http://localhost:3000/apprenants'}/${idApp}`)
}
desaffecter(idA:string,idR:string){
   return this.http.patch(`${'http://localhost:3000/visio/desaffecter'}/${idA}/${idR}`,{})
}
  desaffecterF(idF:string,idR:string){
    return this.http.patch(`${'http://localhost:3000/visio/desaffecterForm'}/${idF}/${idR}`,{})
  }
  updatevis(id:string,data:any):Observable<any>{
    return this.http.post(`${this.Api}/${id}`,data)
  }
}

