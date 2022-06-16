import { HttpEventType, HttpErrorResponse } from "@angular/common/http";
import { OnInit, ViewChild, ElementRef, Component } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { map, catchError, of } from "rxjs";
import { Apprenant } from "src/app/models/apprenant";
import { Categori } from "src/app/models/categori";
import { Formation } from "src/app/models/formation";
import { ApprenantsService } from "src/app/services/apprenants.service";
import { CategoriService } from "src/app/services/categori.service";
import { FileService } from "src/app/services/file.service";
import { FormationsService } from "src/app/services/formations.service";
import Swal from "sweetalert2";
import {ToastrService} from "ngx-toastr";


export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}
@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})


export class FormationsComponent implements OnInit {
  fileUrl="http://localhost:3000/files/get/";
categoris!:Categori[];
  closeResult: string = '';
  addC!: FormGroup;
  categ!: Categori;
  formation:Formation[]=[];
  modal: any;
  listImages : String[] = []
  nom !: string;
  Search!: string;
  file:any;
  formaId!:string;
  name: any;
  nomup!: string;



  constructor(private  fileService: FileService,
    private service: CategoriService,
              private modalService: NgbModal,
              private servicef:FormationsService,

              public formBuilder: FormBuilder,
              private route:Router ,
              private routes:ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    // formulaire li y3aby l categori
    this.addC = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
    });

    //lappel mt3 l fn get categori
    this.getAll();

  }

  // get categorie
  getAll(){
    this.service.getAll().subscribe(
      data=>{
        this.categoris=data;

      },error => console.log(error)

    )

  }
  onImageUpload(event: any) {
    this.file = event.target.files[0];

  }




  onSubmit() {
    //t3aby l categori
    this.categ=this.addC.value;
    if(this.categ.name==""||this.categ.logo==""){
      Swal.fire({title:"verifier votre champs",icon:"error"})
    }
    else {
      this.categ=this.addC.value;

      this.fileService.upload(this.file).subscribe(res => {
          this.categ.logo = res.filename;
          this.service.addC(this.categ).subscribe(
            (data) => {
              this.toastr.success("categorie ajouter avec succées")
              this.modalService.dismissAll();
              this.getAll();
            }, error => Swal.fire({title: "categorie deja existe", icon: "error"})
          )
        }
      )
    }

  }

  go(id: string) {

    this.route.navigate(['home/formc/'+id])

  }
  del(id: string) {
    if(confirm("Es-tu sûr ! vous voulez supprimer cette categorie ?")) {
      this.service.delC(id).subscribe(form=>{
        this.getAll();
      })


    }
  }

  updateCat(id: string) {
    this.fileService.upload(this.file).subscribe(res => {

      let Cat = new Categori();
      Cat.name = this.nomup;
      Cat.logo =res.filename;
      this.service.update(id, Cat).subscribe(
        (res) => {
          Swal.fire({title: '    succés', icon: 'success'});
          this.modalService.dismissAll();
          this.getAll();

        },
        (err) => {
          Swal.fire({title: '    erreur', icon: 'error'});
        })
    })



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
  //fin fonction pop
  //dlete categorie




}

