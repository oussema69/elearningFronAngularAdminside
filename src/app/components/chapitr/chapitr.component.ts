import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chapitre} from "../../models/chapitre";
import {ChapitreService} from "../../services/chapitre.service";

import {RessourceService} from "../../services/ressource.service";
import {Ressource} from "../../models/ressource";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

import Swal from "sweetalert2";
import {FileService} from "../../services/file.service";
import {Router, RouterLink} from "@angular/router";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-chapitr',
  templateUrl: './chapitr.component.html',
  styleUrls: ['./chapitr.component.css']
})
export class ChapitrComponent implements OnInit {
  fileUrl="http://localhost:3000/files/get/";
  @Input()
  chapitre!: Chapitre;
  @Input()
  index!: number;
  @Input()
  id!: string;
  verif: boolean = false;
  @Output()
  delCHE :EventEmitter<Chapitre> = new EventEmitter<Chapitre>();
  ress!:Ressource[];
  closeResult: string = '';
  modal: any;
  titre!: string;
  desc!:string;
  private ressourc!: Ressource[];
  modal1: any;
  titreup!: string;
  descup!: string;
  private ch!: Chapitre;
  file:any;

  constructor(private servicech: ChapitreService,
              private serviceR:RessourceService,
              private modalService: NgbModal,
              private fileservice:FileService,
              private route:Router,
              private toster: ToastrService
              ) {
  }

  ngOnInit(): void {

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





  getres(id: string) {
    this.verif = !this.verif;
      this.serviceR.getByCh(id).subscribe(
        async data=> {
          this.ress = data;


        })

  }
  onImageUpload(event: any) {
    this.file = event.target.files[0];

  }
  onSubmit() {

    let resAdd = new Ressource();
    resAdd.titre=this.titre;
    resAdd.desc=this.desc;
    resAdd.idch=this.chapitre._id;
    this.fileservice.upload(this.file).subscribe(res=>{

      resAdd.fic=res.filename;
      resAdd.type=res.mimetype;
    this.serviceR.addRes(resAdd).subscribe(
      (data)=>{
        this.toster.success("ressource ajouter avec succés")
        this.modalService.dismissAll();
        this.getres(this.chapitre._id);
      },error => Swal.fire({title:"categorie deja existe",icon:"error"})
    )
    })
  }
  hideres() {
    this.verif=true;
  }

  addRes() {

  }

  updateCh(id: string): void {
    this.ch=this.chapitre;
    this.ch.name=this.titreup;
    this.ch.desc=this.descup;
     this.servicech.update(this.chapitre._id,this.ch).subscribe(
      (res)=>{ Swal.fire({ title: '    succés', icon: 'success' });
        this.transform(); },
      (err)=>{ Swal.fire({ title: '    erreur', icon: 'error' }); } )

  }

  delete(id: string) {

    if (confirm("Es-tu sûr ! vous voulez supprimer cette offre ?")) {


        this.delCHE.emit();


    }
  }


  private transform() {

  }

  gopdf(fic: String) {
    this.route.navigate([`home/pdf/${fic}`])

  } govid(fic: String) {
    this.route.navigate([`home/video/${fic}`])
  } goimg(fic: String) {
    this.route.navigate([`home/img/${fic}`])

  }

  back() {


  }

  deleteRes(id: string) {
    if (confirm("Es-tu sûr ! vous voulez supprimer cette offre ?")) {

      this.serviceR.deleteRes(id).subscribe(
        res => {
          this.toster.success("ressource ajouter avec succés")
          this.getres(id)
        }
      )
    }
  }

  getbyfor(id :string){
    this.id = id;
    this.servicech.getCByForm(this.id).subscribe(
      async data => {
        this.ch = data;
      })
  }

  updateValidation(_id: string) {
    const idf=localStorage.getItem('idformation')
  this.servicech.updatev(_id).subscribe(res=>{
this.servicech.getchid(_id).subscribe((res:any)=>{
  this.chapitre=res
})
  })
  }
}
