import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
   file!: string;
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
