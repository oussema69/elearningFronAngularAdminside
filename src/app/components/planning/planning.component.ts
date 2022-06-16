import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {VisioconferenceService} from "../../services/visioconference.service";
import {FormateursService} from "../../services/formateurs.service";
import {ApprenantsService} from "../../services/apprenants.service";
import Swal from "sweetalert2";
import {Room, RoomIn} from "../../models/room";
import {concat} from "rxjs";
import {Apprenant} from "../../models/apprenant";
import {Formateur} from "../../models/formateur";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NotificationService} from "../../services/notification.service";
import {NotifDetails} from "../../models/NotifDetails";
import {AffectVisio} from "../../models/affectVisio";
import {getDate} from "date-fns";

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  fileUrl="http://localhost:3000/files/get/";
  visio:AffectVisio=new AffectVisio()
  room:RoomIn=new RoomIn();
  roomA!:any;
  title = 'creer room';
  closeResult: string = '';
  addRoom!: FormGroup;
 romany: any;
   allRoom!: Room[];
  allF:Formateur[]=[]
  allApp:Apprenant[]=[]
  visioApp!:AffectVisio
 public App:Apprenant[]=[]
  appr!:Apprenant

notif!:any
  notifD:NotifDetails=new NotifDetails()
  SearchApp!: string;
  Search!: string;
  apprenant:Apprenant[]=[]
  affapp=true
  SearchF!: string;
  SearchAppaff!: string;
  constructor(private toastr:ToastrService,
              private service:VisioconferenceService,
              private modal: NgbModal,
              private  serviceF:FormateursService,
              private serviceA:ApprenantsService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private servicef: FormateursService,
              private serviceApp: ApprenantsService,
              private http:HttpClient,
              private notifS:NotificationService) { }

  ngOnInit(): void {
    this.addRoom = this.formBuilder.group({
      nom: new FormControl("", [Validators.required]),
      date:    ["", [Validators.required]],
      heure:    ["", [Validators.required]],
      desc: ["", [Validators.required]],
      duration: ["", [Validators.required]],

    });
    this.getAllRoom()
    this.getAllF()
    this.getAllApp()
  }
  getAllRoom(){
    this.service.getroom(this.romany).subscribe(
      res=>{
        this.allRoom=res.rooms

      },error => {
        Swal.fire({title: "erreur serveur ressayer plus tard", icon: "error"})
        this.getAllRoom()

      }
    )
  }
  createRoom(){
   this.room.nom=this.addRoom.value.nom
    this.room.desc=this.addRoom.value.desc
    let d=new Date(this.addRoom.value.date+" "+this.addRoom.value.heure+":00")

    d.setHours(d.getHours())
    let date=d.toISOString().substr(0,10)+" "+d.toISOString().substr(11,8)
    let hour=d.toISOString()
    let datetovis=d.toISOString().substr(0,10)
    this.room.date=date
    this.room.duration= this.addRoom.value.duration;

        this.service.createroom(this.room).subscribe(
          (data) => {
            this.toastr.success("vous avez creer une visioconférence")
            this.modalService.dismissAll();
            this.visio.idR=data.room.room_id;
            this.visio.name=data.room.name;
            this.visio.month=new Date(datetovis).getMonth()+1
           this.visio.date=new Date(datetovis)
            this.visio.year=new Date(datetovis).getFullYear()
           this.visio.dure=data.room.settings.duration
            this.service.sendIdRoom(this.visio).subscribe(res=>{
            })

            this.getAllRoom()

          }, error => Swal.fire({title: "champs non valide", icon: "error"})
        )


  }
  delete(room_id: string) {
    if(confirm("Es-tu sûr ! vous voulez supprimer cette room ?")) {
    this.service.deleteRoom(this.romany,room_id).subscribe(

      res=>{
        this.allRoom.filter(r=>r.room_id!=room_id)
        this.getAllRoom()
        window.location.reload();

      },error => {Swal.fire({title:'deja supprimer',icon:"error"})}

    )


    }
  }

  getAllF(){
    this.servicef.getall().subscribe(
      res=>{
        this.allF=res;
      }
    )
  }
  getAllApp(){
    this.serviceApp.getall().subscribe(
      res=>{

        this.allApp=res;
      }
    )
  }

filter(idRomm:string){
    this.getAllApp()
  this.service.getByidR(idRomm).subscribe(res=>{
    for(let i of res.idApp){

        this.allApp=this.allApp.filter(a=>a._id!=i)

    }
  })
}




  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openApp(content:any,idR:any) {
    this.filter(idR)

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  opena(content:any,idR:string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.service.getByidR(idR).subscribe(
      res=>{
       this.visioApp=res
        const app=this.visioApp.idApp
        this.apprenant=[]
        for (const i of app){
          this.service.getAppById(i).subscribe(
            res=>{
              this.appr=res
              this.apprenant.push(this.appr)

            }
          )

        }

      }
    )
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


  affecter(id: string,idRomm:string) {
    this.serviceApp.affecterApp(id,idRomm).subscribe(
      res=>{

//



        this.toastr.success("vous avez affecter cet apprenant a une room")
        this.modalService.dismissAll();
        this.service.sendIdApp(id,idRomm).subscribe(res=>{


        })
    this.service.getRoomById(idRomm,this.romany).subscribe(
      res=>{

        //send notification to android
        this.notifS.getNotifToken(id).subscribe(
          data=>{
            this.notif={notification:{title:'vous avez une nouvelle visiconférence', body:res.room.name}, to: data.token}
            this.pushNotif(this.notif)
          }
        )
        ////
        ////send notification to database
      this.notifD.name=res.room.name
      this.notifD.title="vous avez une nouvelle visioconférence"
        this.notifD.visible=true
        this.notifD.idApp=id;
      this.notifD.dateaff=new Date();
        this.createNotif(this.notifD)
      }
    )
    },error => {Swal.fire({title: "une erreur c'est produit ressayer plus tard", icon: "error"})

    })

  }
 pushNotif(data:any){

   this.notifS.sendNotif(this.notif).subscribe(res=>{
   },err=>{
   })
 }
 createNotif(data:any){
    this.notifS.createNotif(data).subscribe(res=>{
    },error => {
    })
 }
  affecterF(id: string, idRomm:string) {
    this.servicef.affecterApp(id,idRomm).subscribe(
      res=>{
        this.App=res
        this.toastr.success("vous avez affecter cet formateur a une room")
        this.modalService.dismissAll();
        ///

        this.service.getRoomById(idRomm,this.romany).subscribe(
          res=>{
            window.location.reload();
            ///affecter
     this.service.sendIdF(id,idRomm).subscribe(res=>{
     })
            ////
            ////send notification to database
            this.notifD.name=res.room.name
            this.notifD.title="vous avez une nouvelle visioconférence"
            this.notifD.visible=true
            this.notifD.idF=id;
            this.notifD.dateaff=new Date();

            this.createNotif(this.notifD)

          }
        )

        ////
      }, (error)=> {Swal.fire({title: 'room consiste un formateur', icon: "error"})

      })
  }


  desafecter(id: string, idR: string) {
    this.service.desaffecter(id,idR).subscribe(
      res=>{
        this.toastr.success("apprenant dessafecter avec succées")

      }
    )
  }

}
