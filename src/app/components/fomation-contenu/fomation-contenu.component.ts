import { Component, OnInit } from '@angular/core';
import {Formation} from "../../models/formation";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {FileService} from "../../services/file.service";
import {CategoriService} from "../../services/categori.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormationsService} from "../../services/formations.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Categori} from "../../models/categori";
import { Apprenant } from 'src/app/models/apprenant';
import { ApprenantsService } from 'src/app/services/apprenants.service';
import {ToastrService} from "ngx-toastr";
import {NotificationService} from "../../services/notification.service";
import {NotifDetails} from "../../models/NotifDetails";

@Component({
  selector: 'app-fomation-contenu',
  templateUrl: './fomation-contenu.component.html',
  styleUrls: ['./fomation-contenu.component.css']
})
export class FomationContenuComponent implements OnInit {
  private id!: string;
  fileUrl="http://localhost:3000/files/get/";
  file:any;
  categoris:Categori[]=[];
  closeResult: string = '';
  addC!: FormGroup;
  categ!: Categori;
  formation:Formation[]=[];
  modal: any;
  index=5;
  categoriId!: Categori;
  addFor!: FormGroup;
  listImages : String[] = []
  nom !: string;
  nbrH!:number;
  dateFin !: Date;
  desc!: string;
  status:boolean = false;
  formaId!:string;
  SearchApp!: string;
  upForm!: Formation;
  Search!: string;

  public apprenant: Apprenant[]=[];
  private f!: Formation[];
  dateFinup: any;
  nomup!:string;
  nbrHup!:number;
  descup!: string;
a:any
  notif!:any
  notifD:NotifDetails=new NotifDetails()
  constructor(private route: ActivatedRoute,
              private fileService: FileService,
              private service: CategoriService,
              private modalService: NgbModal,
              private servicef:FormationsService,
              private apprenantService:ApprenantsService,
              public formBuilder: FormBuilder,
              public router:Router,
              private toastr: ToastrService,
              private notifS:NotificationService,

              ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    localStorage.setItem("idc",this.id)
    this.getCbyid()
    this.getbycat(this.id)
    this.apprenantService.getall().subscribe(res=>{
      this.a=res
    })
  }
  getCbyid(){
    this.service.getCById(this.id).subscribe(
      data=>{
        this.categoriId=data;

      }
    )
  }

  //ajout formation
  async addForm() {

      let f = new Formation();

      this.fileService.upload(this.file).subscribe(res => {
          f.cat = this.id;
          f.name = this.nom;
          f.nbrH = this.nbrH;
          f.desc = this.desc;
          f.month=new Date().getMonth()+1
          f.year=new Date().getFullYear()
          f.urlimg = res.filename;
          this.servicef.add(f).subscribe(res => {
            this.toastr.success("formation creer avec succés")
            this.modalService.dismissAll();
            this.getbycat(this.id);
          }, err => Swal.fire('champs non valide', 'error', "error"))

        }
        , err => console.log(err))

  }
  //image
  onImageUpload(event: any) {
    this.file = event.target.files[0];

  }

//tmchy l chapitre
  goToChap(id: string) {
    this.router.navigate(['home/ch/'+id])


  }

  //tjyb lformationet
  getbycat(cat : string){
    //te5dh id categori w tjib les formation mte3ou
    this.servicef.getByCat(cat).subscribe(
      async data=> {
        this.formation = data;



      })


  }

  //tfase5 formationet
  supprimer(id:string){
    if(confirm("Es-tu sûr ! vous voulez supprimer cette formation ?")) {
      this.servicef.supprimer(id).subscribe(form=>{
        this.getbycat(this.id)
   for(let i of this.a){
     ///
       this.servicef.daffect(i._id, id).subscribe(
         (res) => {})



     ////
   }

      })

    }

  }

  updateF(id :string) {
    this.fileService.upload(this.file).subscribe(res => {

      let form = new Formation();
      form.name = this.nomup;
      form.nbrH = this.nbrHup;
      form.desc = this.descup;
      form.urlimg =res.filename;
      this.servicef.update(id, form).subscribe(
        (res) => {
          Swal.fire({title: '    succés', icon: 'success'});
          this.modalService.dismissAll();
          this.getbycat(this.id)
        },

        (err) => {
          Swal.fire({title: '    erreur', icon: 'error'});
        })
    })

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
  //fin fonction pop



  openAffecter(content:any,id:string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.formaId=id;

      this.apprenantService.getallbyNotformation(this.formaId).subscribe(
        data=>{
          this.apprenant=data;

        },error => console.log(error)

      )

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
affecter(id: string):void{



  this.servicef.affect(id,this.formaId).subscribe(
    async (res)=>{  (await this.apprenantService.getById(id)).subscribe(

      (res)=>{

        this.apprenant=this.apprenant.filter(i=>i._id!==res._id);
        /////
        this.servicef.getById(this.formaId).subscribe(
          res=>{

            //send notification to android
            this.notifS.getNotifToken(id).subscribe(
              data=>{
                this.notif={notification:{title:'vous avez une nouvelle formation nommé', body:res.name}, to: data.token}
                this.pushNotif(this.notif)

              }
            )
            ////
            ////send notification to database
            this.notifD.name=res.name
            this.notifD.title="vous avez une nouvelle formation nommé"
            this.notifD.visible=true
            this.notifD.idApp=id;
            this.notifD.dateaff=new Date();

            this.createNotif(this.notifD)
          }
        )
        ////
      }

    )

      Swal.fire({ title: 'Affecter', icon: 'success' }
    );


  },
     (err)=>{ Swal.fire({ title: '    erreur', icon: 'error' }); } )



}

  back() {
    this.router.navigate(['home/formation'])
  }
}
