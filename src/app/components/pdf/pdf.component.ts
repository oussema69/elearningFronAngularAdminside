import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
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
