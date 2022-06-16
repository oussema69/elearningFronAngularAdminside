import { Component, OnInit } from '@angular/core';
import {ApprenantsService} from "../../services/apprenants.service";
import {Apprenant} from "../../models/apprenant";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {FileService} from "../../services/file.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-apprenants',
  templateUrl: './apprenants.component.html',
  styleUrls: ['./apprenants.component.css']
})
export class ApprenantsComponent implements OnInit {
  public apprenants: Apprenant[]=[];

  title = 'creer apprenant';
  nApprenant!:Apprenant;
  closeResult: string = '';


  formaddApp! : FormGroup;
  Search: string='';
  private file: any;


  constructor(private router : Router,
    private service:ApprenantsService,
    private modalService: NgbModal ,
    public formBuilder: FormBuilder,
              private fileservice:FileService,
              private toastr: ToastrService) { }

  ngOnInit(): void {

     this.formaddApp = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      lastname:    ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      tel: ["", [Validators.required]],
      password: ["", [Validators.required]],


      //  apprenant : new FormControl(apprenant);
    });
    this.getAllApp();

  }
getAllApp(){
    this.service.getall().subscribe(
      data=>{
        this.apprenants=data;
        this.apprenants.sort()
      },error => console.log(error)

    )
}
  onImageUpload(event: any) {
    this.file = event.target.files[0];

  }

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

  onSubmit(){
    this.nApprenant=this.formaddApp.value;
    if(this.nApprenant.name==""||this.nApprenant.lastname==""||this.nApprenant.tel.toString()==""||this.nApprenant.tel.toString().length!=8||this.nApprenant.logo==""||this.nApprenant.email==""||this.nApprenant.password=="") {
      Swal.fire({title:"verifier votre champs",icon:"error"})  }else{
    this.nApprenant=this.formaddApp.value;


      this.fileservice.upload(this.file).subscribe(res => {
        this.nApprenant.logo = res.filename;
        this.nApprenant.mois=new Date().getMonth()+1
        this.nApprenant.year=new Date().getFullYear()
        this.service.addApp(this.nApprenant).subscribe(
          (data) => {
            this.toastr.success("apprenant ajouter avec succée")
            this.modalService.dismissAll();
            this.getAllApp()

          }, error => Swal.fire({title: "apprenant deja existe", icon: "error"})
        )

      })
    }


  }
control(){

}

  updateValidation(id:string){
    this.service.updateValidation(id).subscribe(res=>{

      this.getAllApp()

    })
  }


  get getformaddApp(){
    return this.formaddApp.controls;
  }

  go(id:any) {
    this.router.navigate(['home/comptApp/'+id])
  }

}
