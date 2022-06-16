import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  file!:string;
  fileUrl="http://localhost:3000/files/get/";

  constructor(private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.file=this.route.snapshot.params["file"]
  }

  back() {
    const idf=localStorage.getItem('idformation')
    this.router.navigate(['home/ch/'+idf])
  }
}
