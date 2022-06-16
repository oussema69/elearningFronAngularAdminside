import { Injectable } from '@angular/core';
 import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
 
@Injectable({
  providedIn: 'root'
})
export class FileService {
api = environment.Api+'files' ;
  constructor(private  http:HttpClient) {

  }

  upload(file : File   ):Observable<any>{
    const formData = new FormData();
    formData.append('file' , file); 

    return this.http.post( 'http://localhost:3000/files/upload',formData);
  }

 
   

  loadImage(id : string) {
    const api = "http://localhost:3000/files/get/"
   
    const url = `${api}${id}`
    return this.http.get(url) 
  }

 
}
