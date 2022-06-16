import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
 api=environment.Api
  constructor(private http:HttpClient) { }
  getByMonth(mois:number,year:number):Observable<number>{
  return this.http.get<number>(`${this.api}visio/count/${mois}/${year}`)
  }
  getformByMonth(mois:number,year:number):Observable<number>{
    return this.http.get<number>(`${this.api}formations/month/${mois}/${year}`)
  }
  getvisByformateur(mois:number,year:number,idF:string):Observable<number>{
   return this.http.get<number>(`${this.api}visio/countM/${mois}/${year}/${idF}`)
  }
  getvisfordate(db:any,df:any,idf:any):Observable<number>{
   return this.http.get<number>(`${this.api}visio/cou/${db}/${df}/${idf}`)
  }
  getnbrtotvisform(idf:string):Observable<number>{
   return this.http.get<number>(`${this.api}visio/getidf/${idf}`)
  }
  getnbrhvisform(idf:string):Observable<number>{
    return this.http.get<number>(`${this.api}visio/min/${idf}`)
  }
  getappstat(mois:number,year:number):Observable<number>{
   return this.http.get<number>(`${this.api}apprenants/count/${mois}/${year}`)
  }
  getformstat(mois:number,year:number):Observable<number>{
    return this.http.get<number>(`${this.api}formateurs/count/${mois}/${year}`)
  }
  getallvisDate(db:any,df:any):Observable<number>{
   return this.http.get<number>(`${this.api}visio/cou/${db}/${df}`)
  }
  getallformDate(db:any,df:any):Observable<number>{
    return this.http.get<number>(`${this.api}formations/cou/${db}/${df}`)
  }
  getvisappdate(db:any,df:any,idApp:any):Observable<number>{
    return this.http.get<number>(`${this.api}visio/countidApp/${db}/${df}/${idApp}`)
  }
  getformappdate(dbf:any,dff:any,idApp:any):Observable<number>{
    return this.http.get<number>(`${this.api}formations/countidApp/${dbf}/${dff}/${idApp}`)
  }
  getforapp(idApp:any):Observable<number>{
    return this.http.get<number>(`${this.api}formations/coufor/${idApp}`)
  }
  getforappheure(idApp:any):Observable<number>{
    return this.http.get<number>(`${this.api}formations/minapp/${idApp}`)
  }
  getvisioappheure(idApp:any):Observable<number>{
    return this.http.get<number>(`${this.api}visio/minapp/${idApp}`)
  }
  getvisioapp(idApp:any):Observable<number>{
    return this.http.get<number>(`${this.api}visio/getvisapp/${idApp}`)
  }
  getformbyappmonth(mois:number,year:number,idAPP:string):Observable<number>{
    return this.http.get<number>(`${this.api}formations/countMApp/${mois}/${year}/${idAPP}`)
  }
  getvisiobyappmonth(mois:number,year:number,idAPP:string):Observable<number>{
    return this.http.get<number>(`${this.api}visio/countMApp/${mois}/${year}/${idAPP}`)
  }

}
