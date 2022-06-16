import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChapitreService} from "../../services/chapitre.service";
import {Chapitre} from "../../models/chapitre";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormationsService} from "../../services/formations.service";
import {Formation} from "../../models/formation";
import Swal from "sweetalert2";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import { ApprenantsService } from 'src/app/services/apprenants.service';
import { Apprenant } from 'src/app/models/apprenant';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-chapitre',
  templateUrl: './chapitre.component.html',
  styleUrls: ['./chapitre.component.css']
})
export class ChapitreComponent implements OnInit {
  closeResult: string = '';
  Search!: string;
  id: any;
  ch!: Chapitre[];
  name!: string;
  desc!: string;
  form!: string;
  format!: Formation;
  formations!:Formation;
  public apprenant: Apprenant[]=[];
  constructor(private route: ActivatedRoute,
              private servicef: FormationsService,
              private apprenantService:ApprenantsService,
              private servicech: ChapitreService,
              private modalService: NgbModal,
              private toster : ToastrService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    localStorage.setItem('idformation',this.id)
    this.getbyfor(this.id)
    this.getFormation(this.id)

  }



  //lllll
  open(content: any) {
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
      return `with: ${reason}`;
    }
  }




  getbyfor(id :string){
    this.id = id;
    this.servicech.getCByForm(this.id).subscribe(
      async data => {
        this.ch = data;
      })
  }


  getFormation(id: string) {
    this.id = id;
    this.servicef.getById(this.id).subscribe(data => {
      this.format = data;

    })

  }
  addCh() {
    let ch = new Chapitre();
        ch.name=this.name;
        ch.desc=this.desc;
        ch.formation=this.id;
        this.servicech.addCh(ch).subscribe(res=>{
          this.toster.success("chapitre creer avec succés")
          this.getbyfor(this.id);
          this.modalService.dismissAll();

        },err=>Swal.fire('verifier les champs','succes' , "error"))

      }


  drop(event: CdkDragDrop<Chapitre[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateChapters(event.container.data);
    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


  delete(ch:Chapitre) {

       this.servicech.supprimer(ch._id).subscribe(data => {
        this.getbyfor(this.id);

      })
    }


  private updateChapters(data: Chapitre[]) {
    this.servicef.updateChapters(this.format._id,data).subscribe(res=>{

    });
  }
  openListeApp(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.apprenantService.getallbyformation(this.id).subscribe(
      data=>{
        this.apprenant=data;
      },error => console.log(error)

    )


  }
  daffecter(ida: string):void{
    this.servicef.daffect(ida,this.id).subscribe(
      (res)=>{ this.toster.success("effacer")
    },
       (err)=>{ Swal.fire({ title: '    erreur', icon: 'error' }); } )



  }

  back() {
 const idc=localStorage.getItem("idc")
    this.router.navigate(['/home/formc/'+idc])
  }
}
