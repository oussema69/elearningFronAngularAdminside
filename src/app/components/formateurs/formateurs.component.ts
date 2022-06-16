import { Component, OnInit } from '@angular/core';
import {ApprenantsService} from "../../services/apprenants.service";
import {FormateursService} from "../../services/formateurs.service";
import {Formateur, Formateurup} from "../../models/formateur";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Apprenant} from "../../models/apprenant";
import { Router } from '@angular/router';
import {FileService} from "../../services/file.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-formateurs',
  templateUrl: './formateurs.component.html',
  styleUrls: ['./formateurs.component.css']
})



export class FormateursComponent implements OnInit {
  selected!: Date | null;
  formateurs: Formateur[]=[];
  Search: string='';
  title = 'creer formateur';
   closeResult: string = '';
  formaddF! : FormGroup;
   nFormateur!: Formateurup;
  private file: any;


  constructor(private router:Router,
    private service:FormateursService,
    private modalService: NgbModal , public formBuilder: FormBuilder,
              private  fileservice:FileService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formaddF = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      lastname:    ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      tel: ["", [Validators.required]],
      password: ["", [Validators.required]],
      spec: ["", [Validators.required]],

      //  apprenant : new FormControl(formateur);
    });
    this.getAllApp();
  }
  onImageUpload(event: any) {
    this.file = event.target.files[0];

  }
  getAllApp(){
    this.service.getall().subscribe(
      data=>{
        this.formateurs=data;

      },error => console.log(error)

    )
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
    this.nFormateur=this.formaddF.value;
    if(this.nFormateur.name==""||this.nFormateur.lastname==""||this.nFormateur.tel.toString()==""||this.nFormateur.tel.toString().length!=8||this.nFormateur.logo==""||this.nFormateur.email==""||this.nFormateur.password=="") {
      Swal.fire({title:"verifier votre champs",icon:"error"})  }else {
      this.nFormateur=this.formaddF.value;

      this.fileservice.upload(this.file).subscribe(res => {
        this.nFormateur.logo = res.filename;
        this.nFormateur.mois=new Date().getMonth()+1
        this.nFormateur.year=new Date().getFullYear()

        this.service.addF(this.nFormateur).subscribe(
          (data) => {
            this.toastr.success("apprenant ajouter avec succée")

            this.modalService.dismissAll();
            this.getAllApp()
          }, error => Swal.fire({title: "formateur deja existe", icon: "error"})
        )
      })
    }
    }

  goto(id:any){
    this.router.navigate(['home/profile/'+id])
  }
  updateValidation(id:string){
    this.service.updateValidation(id).subscribe(res=>{
      this.getAllApp()
    })
  }

  get getformaddF(){
    return this.formaddF.controls;
  }
}
