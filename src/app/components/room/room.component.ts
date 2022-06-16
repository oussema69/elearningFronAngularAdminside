import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import { Formateur } from 'src/app/models/formateur';
import { FormateursService } from 'src/app/services/formateurs.service';
import { VisioconferenceService } from 'src/app/services/visioconference.service';
import {ToastrService} from "ngx-toastr";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RoomIn, Roomup} from "../../models/room";
import Swal from "sweetalert2";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
@Input()
rooma:any
formateur:any
  fileUrl: any;
  apprenant: any;
  allF: any;
  SearchApp: any;
  allApp: any;
  @Output()
  deleteEvent=new EventEmitter()
  @Output()
 openEvent=new EventEmitter()
  @Output()
  openaEvent=new EventEmitter()

@Output()
openAppEvent=new EventEmitter()
  room:Roomup=new Roomup();

  closeResult: string = '';
  modal: any;

  durationup: any;
  descup: any;
  heureup: any;
  dateup: any;
  nomup: any;
  constructor(private service:VisioconferenceService,
              private servicef:FormateursService,
              private toastr:ToastrService,private modalService: NgbModal,) { }

  ngOnInit(): void {
this.getformateur()
    this.nomup=this.rooma.name
    this.descup=this.rooma.settings.description
    this.dateup=this.rooma.date
    this.durationup=this.rooma.settings.duration
  }

getformateur(){
  this.service.getByidR(this.rooma.room_id).subscribe(
    res=>{
      this.servicef.getById(res.idF).subscribe(
        res=>{
          this.formateur=res

        }
      )
    }
  )
}
  delete() {
    this.deleteEvent.emit()
  }

  opena() {
    this.openaEvent.emit()
  }

  open() {
    this.openEvent.emit()
  }
  openApp(){
    this.openAppEvent.emit(this.rooma.room_id)

  }


  desafecter(id: string, idR:string) {
    this.service.desaffecterF(id,idR).subscribe(
      res=>{
        window.location.reload();

        this.toastr.success("vous avez désaffecter ce formateur")      }
    )
  }


  openup(content:any) {
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

  update(room_id: any) {

    let d=new Date(this.dateup+" "+this.heureup+":00")

    d.setHours(d.getHours())
    let date=d.toISOString().substr(0,10)+" "+d.toISOString().substr(11,8)
    let hour=d.toISOString()
    let datetovis=d.toISOString().substr(0,10)

    const data={
  nom:this.nomup,
      desc:this.descup,
      date:date,
      duration:this.durationup
    }
    if(!this.nomup||!this.descup||d<new Date(Date.now())||!this.dateup||!this.heureup||this.durationup.number<30||this.durationup.number>60||!this.durationup){
      Swal.fire({title: "champs non valide", icon: "error"})
      return
    }else {
      this.service.updatevis(room_id, data).subscribe(
        (data) => {
          this.toastr.success("vous avez creer une visioconférence")
          window.location.reload();



        }, error => Swal.fire({title: "champs non valide", icon: "error"})
      )
    }
  }
}
