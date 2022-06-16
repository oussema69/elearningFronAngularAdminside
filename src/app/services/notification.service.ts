import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Notification} from "../models/notification";
import {Observable} from "rxjs";
import {NotifDetails} from "../models/NotifDetails";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
 api="http://localhost:3000/notification/"
  constructor(private http:HttpClient) { }

  getNotifToken(id:string):Observable<Notification>{
    return this.http.get<Notification>(`${this.api}${id}`);
  }
  sendNotif(notif:any):Observable<any>{
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `key=AAAA6gXnK8w:APA91bFKoVDPxKQntVEilebiEMxiwXC6yNE6GkX8ZDkV2ayuNozjIghGjzwxRvaqJE89NPlfTYoXiuXAuymebw97RUXfPT4SgIYsquT6Pcfikg-losnt1mJrTzuG8pR45G4Mnc_2hPZp`)
    }
   return  this.http.post<any>('https://fcm.googleapis.com/fcm/send', notif,header)
  }
  createNotif(data:any):Observable<any>{
   return this.http.post<any>('http://localhost:3000/notif-details',data)
  }
}
