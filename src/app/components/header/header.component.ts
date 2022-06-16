import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import {Admin} from "../../models/admin";
import {FormGroup} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Categori} from "../../models/categori";
import {Formation} from "../../models/formation";
import {AdminService} from "../../services/admin.service";
import Swal from "sweetalert2";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

admin!:any;
adminup!:Admin[];
  closeResult: string = '';
  modal: any;
  password!: string;
  name!:string;
  email!:string;


  constructor(private modalService: NgbModal,
              private service: AdminService,
             private authService: LoginService,
  ) { }


  ngOnInit(): void {
    const token = localStorage.getItem('mhatlioussema');

    if(token) {
     let decoded = jwt_decode(token);

     this.admin=decoded;
    }
  }

  updateAdmin() {
    this.adminup=this.admin.data;

    this.service.updateAdmin(this.admin.data._id,this.adminup).subscribe(
      (res)=>{ Swal.fire({ title: '    succés', icon: 'success' });},
      (err)=>{ Swal.fire({ title: '    erreur', icon: 'error' }); } )
    localStorage.removeItem('mhatlioussema');
    this.modalService.dismissAll();
    this.authService.login(this.adminup).subscribe((res:any)=>{
      localStorage.setItem("mhatlioussema", res.token);})

  }












  //fonction pop
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
