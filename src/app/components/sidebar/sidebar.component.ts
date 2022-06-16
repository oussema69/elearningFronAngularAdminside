import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router:Router) { }
  logo:any = "assets/logoprojet.png";

  ngOnInit(): void {
  }

  logout() {
      localStorage.removeItem('mhatlioussema');
      this.router.navigate(['']);
  }
}
